<?php

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
