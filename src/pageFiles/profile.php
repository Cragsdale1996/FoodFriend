<?php

$app->post('/userprofile', function ($request, $response){
        $input = $request->getParsedBody();
        foreach($input as $key => $param){
                if($key == "session_id"){
                        $sid = $param;
                }
                if($key == "name"){
                        $name = $param;
                }
                if($key == "email"){
                        $email = $param;
                }
                if($key == "city"){
                        $city = $param;
                }
                if($key == "state_post_code"){
                        $state_post_code = $param;
                }
        }
        $sth = $this->db->prepare("SELECT account_id, time_expires FROM Sessions WHERE session_id=:session_id");
        $sth->bindParam("session_id", $sid);
        $sth->execute();
        $output = $sth->fetchAll();
        if(empty($output)){
                $data = json_decode($json, true);
                $data[] = array('valid' => 'false', 'session_id' => '0');
                $json = json_encode($data);
                return $json;
        }
        $today = date('Y-m-d H:i:s');
 	if($output[0][time_expires] < $today){
                $stm = $this->db->prepare("DELETE FROM Sessions WHERE account_id=:account_id");
                $stm->bindParam("account_id", $output[0][account_id]);
                $stm->execute();
                $data = json_decode($json, true);
                $data[] = array('valid' => 'false', 'session_id' => '0');
                $json = json_encode($data);
                return $json;
        }
        $sql = ("UPDATE UserAccount SET name=:name, email=:email, city=:city, state_post_code=:state_post_code WHERE user_id=:account_id");
        $sth2 =  $this->db->prepare($sql);
        $sth2->bindParam("name", $name);
        $sth2->bindParam("email", $email);
        $sth2->bindParam("city", $city);
        $sth2->bindParam("state_post_code", $state_post_code);
        $sth2->bindParam("account_id", $output[0][account_id]);
        $sth2->execute();
        $data = json_decode($json, true);
        $data[] = array('valid' => 'true', 'session_id' => $sid);
        $json = json_encode($data);
        return $json;
});

//User profile: display user profile
$app->get('/userprofile/[{session_id}]', function($request, $response, $args){
      //get session_id
      $info = $this->db->prepare("SELECT session_id, time_expires FROM Sessions WHERE session_id = :session_id");
      $info->bindParam("session_id", $args['session_id']);
      $info->execute();
      $q = $info->fetchObject();
      //check if session_id exists
      if(!empty($q)){
          //if session_id exist but already expires
          $today = date('Y-m-d H:i:s');
          if($q->time_expires < $today){
                $session_expire = $this->db->prepare("DELETE FROM Sessions WHERE session_id = :session_id");
                $session_expire->bindParam("session_id", $args['session_id']);
                $session_expire->execute();
                $data[] = array('valid' => 'false', 'session_id' => 0);
                return json_encode($data);
        //if session exists and not expires
        } else {
            //get user information
            $info = $this->db->prepare("SELECT user_id, name as user_name, email, city, state_post_code
              FROM UserAccount JOIN (
                SELECT account_id FROM Sessions WHERE session_id = :session_id
              ) as T
              ON T.account_id = UserAccount.user_id");
            $info->bindParam("session_id", $args['session_id']);
            $info->execute();
            $data = $info->fetchAll();
            //get favorite Dishes
            $userID = $data[0][user_id];
            $sth = $this->db->prepare("SELECT Dishes.name, description, score
                FROM Dishes NATURAL JOIN Favorites WHERE user_id = '$userID'");
            $sth->execute();
            $list = $sth->fetchAll();
            $dish = array('Dishes' => $list);
            //combine both together
            $total = array_merge($data, $dish);
            return $this->response->withJson($total);
        }
      //session_id no longer exist
      } else {
            $data[] = array('valid' => 'false', 'session_id' => 0);
            return json_encode($data);
      }
});

//User profile: delete one favorite dish from one specific user
$app->delete('/userprofile/del/[{dish_id}]', function($request, $response, $args){
      $body = $request->getBody();
      $body = json_decode($body, true);
      $id = $body['session_id'];
      //get session_id
      $info = $this->db->prepare("SELECT account_id, session_id, time_expires FROM Sessions WHERE session_id = :id");
      $info->bindParam("id", $id);
      $info->execute();
      $data = $info->fetchAll();
      //check if session_id exists
      if(!empty($data)){
          //if session_id exist but already expires
          $today = date('Y-m-d H:i:s');
          if($data[0][time_expires] < $today){
                $session_expire = $this->db->prepare("DELETE FROM Sessions WHERE session_id = :id");
                $session_expire->bindParam("id", $id);
                $session_expire->execute();
                $mess[] = array('valid' => 'false', 'session_id' => 0);
                return json_encode($mess);
        //if session exists and not expires
        } else {
               //get user id
               $userID = $data[0][account_id];
                //delete the selected dish
               $deleteDish = $this->db->prepare("DELETE FROM Favorites WHERE dish_id = :dish_id AND user_id = '$userID'");
               $deleteDish->bindParam("dish_id", $args['dish_id']);
               $deleteDish->execute();
               //if can delete dish
               if($deleteDish->rowCount() != 0){
                   $mess[] = array('success' => 'true', 'session_id' => $id);
                   return $this->response->withJson($mess);
               //if dish id not exist, cannot delete
               } else {
                   $mess[] = array('success' => 'false', 'session_id' => $id);
                   return $this->response->withJson($mess);
               }
        }
      //session_id no longer exist
      } else {
            $data[] = array('valid' => 'false', 'session_id' => 0);
            return json_encode($data);
      }
});

$app->post('/createUserAcct', function ($request, $response) {
        $allPostVariables = $request->getBody();
          $input = json_decode($allPostVariables, true);
          foreach($input as $key => $param)
          {
            $name = $input['name'];
            $email = $input['email'];
            $city= $input['city'];
            $state = $input['state'];
            $password = $input['password'];
          }

         //after have the information need to see if user exists
          $sql = "SELECT *  FROM UserAccount"; 
          $sth = $this->db->prepare($sql);
          $sth->execute();
          $out = $sth->fetchAll();
         foreach($out as $row){
                $e = $row['email'];
                 if($e === $email)
                {
                        $same = true;
                }
         }

          //if account already exixts then invalid
          if($same)
          {
            $data = json_decode($json, true);
            $data[] = array('valid' => 'false', 'session_id' => 0 );
            $json = json_encode($data);
            return $json;
          }
          else
          {

            //insert user data into database
              $sql = "INSERT INTO UserAccount(name,email,password,city,state_post_code) VALUES('$name','$email','$password','$city','$state')";  
              $sth = $this->db->prepare($sql);
              if($sth->execute())
               {
                 $sid = uniqid();
                $stm = $this->db->prepare("SELECT user_id FROM UserAccount WHERE name=:name");
                $stm->bindParam("name", $name);
                $stm->execute();
                $output= $stm->fetchAll();
                $val = $output[0][user_id];                 
                $data = json_decode($json, true);
                 $data[] = array('valid' => 'true', 'session_id' => $sid);
                 $json = json_encode($data);
                 $sql = "INSERT INTO Sessions(account_id, is_restaurant, session_id, time_created, time_expires) VALUES ('$val', 0, '$sid', NOW(), NOW() + INTERVAL 1 HOUR)";
                 $stm2 = $this->db->prepare($sql);
                 $stm2->execute();              
                 return $json;
               }
         }
       });
