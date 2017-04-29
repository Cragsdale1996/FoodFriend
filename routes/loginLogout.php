<$php

$app->post('/login', function ($request, $response) {
        $input = $request->getParsedBody();
        foreach($input as $key => $param){
                if($key == "email"){
                        $email = $param;
                }
                if($key == "password"){
                        $password = $param;
                }
        }
        $sth = $this->db->prepare("SELECT user_id, password FROM UserAccount WHERE email=:email");
        $sth->bindParam("email", $email);
        $sth->execute();
        $output = $sth->fetchAll();
        if(empty($output)){
                $sth2 = $this->db->prepare("SELECT rest_id, password FROM RestAccount WHERE email=:email");
                $sth2->bindParam("email", $email);
                $sth2->execute();
                $output2 = $sth2->fetchAll();
                if(empty($output2)){
                        $data = json_decode($json, true);
                        $data[] = array('valid' => 'false', 'session_id' => '0');
                        $json = json_encode($data);
                        $this->response->getBody()->write($json);
                        return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
                }else{
                        $check = $this->db->prepare("SELECT session_id, time_expires FROM Sessions WHERE account_id=:account_id AND is_restaurant = 1");
                        $check->bindParam("account_id", $output2[0][rest_id]);
                        $check->execute();
                        $output3 = $check->fetchAll();
                        if(empty($output3)){
                                if(password_verify($password, $output2[0][password])){
                                        $sid = uniqid();
                                        $val = $output2[0][rest_id];
                                        $data = json_decode($json, true);
                                        $data[] = array('valid' => 'true', 'session_id' => $sid);
                                        $json = json_encode($data);
                                        $sql = "INSERT INTO Sessions (account_id, is_restaurant,session_id,time_created,time_expires) VALUES ($val, 1, '$sid', now(), now() + interval 1 hour)";
                                        $stm = $this->db->prepare($sql);
                                        $stm->execute();
                                        $this->response->getBody()->write($json);
                                        return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
                                }else{
                                        $data = json_decode($json, true);
                                        $data[] = array('valid' => 'false', 'session_id' => '0');
                                        $json = json_encode($data);
                                        $this->response->getBody()->write($json);
                                        return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
                                }
                        }else{
                                date_default_timezone_set('US/Central');
                                $today = date("Y-m-d H:i:s");
                                if($output3[0][time_expires] > $today){
                                        $data = json_decode($json, true);
                                        $data[] = array('valid' => 'true', 'session_id' => $output3[0][session_id]);
                                        $json = json_encode($data);
                                        $this->response->getBody()->write($json);
                                        return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
                                }else{
                                        $stm2 = $this->db->prepare("DELETE FROM Sessions WHERE account_id=:account_id AND is_restaurant = 1");
                                        $stm2->bindParam("account_id", $output3[0][account_id]);
                                        $stm2->execute();
                                        $data = json_decode($json, true);
                                        $data[] = array('valid' => 'false', 'session_id' => '0');
                                        $json = json_encode($data);
                                        $this->response->getBody()->write($json);
                                        return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');

                                }
                        }
                }
        }else{
                $check = $this->db->prepare("SELECT session_id, time_expires FROM Sessions WHERE account_id=:account_id AND is_restaurant = 0");
                $check->bindParam("account_id", $output[0][user_id]);
                $check->execute();
                $output3 = $check->fetchAll();
                if(empty($output3)){
                        if(password_verify($password, $output[0][password])){
                                $sid = uniqid();
                                $val = $output[0][user_id];
                                $data = json_decode($json, true);
                                $data[] = array('valid' => 'true', 'session_id' => $sid);
                                $json = json_encode($data);
                                $sql = "INSERT INTO Sessions (account_id, is_restaurant, session_id, time_created, time_expires) VALUES ($val, 0, '$sid', now(), now() + interval 1 hour)";
                                $stm = $this->db->prepare($sql);
                                $stm->execute();
                                $this->response->getBody()->write($json);
                                return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
                        }else{
                                 $data = json_decode($json, true);
                                 $data[] = array('valid' => 'false', 'session_id' => '0');
                                 $json = json_encode($data);
                                 $this->response->getBody()->write($json);
                                 return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
                        }
                }else{
                        date_default_timezone_set('US/Central');
                        $today = date("Y-m-d H:i:s");
                        if($output3[0][time_expires] > $today){
                                $data = json_decode($json, true);
                                $data[] = array('valid' => 'true', 'session_id' => $output3[0][session_id]);
                                $json = json_encode($data);
                                $this->response->getBody()->write($json);
                                return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
                        }else{
                                $stm2 = $this->db->prepare("DELETE FROM Sessions WHERE account_id=:account_id AND is_restaurant = 0");
                                $stm2->bindParam("account_id", $output3[0][account_id]);
                                $stm2->execute();
                                $data = json_decode($json, true);
                                $data[] = array('valid' => 'false', 'session_id' => '0');
                                $json = json_encode($data);
                                $this->response->getBody()->write($json);
                                return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
                        }
                }
        }
});

$app->delete('/logout', function($request, $response, $args){
      $body = $request->getBody();
      $body = json_decode($body, true);
      $id = $body['session_id'];

      $info = $this->db->prepare("SELECT account_id, session_id, time_expires FROM Sessions WHERE session_id = :id");
      $info->bindParam("id", $id);
      $info->execute();
      $data = $info->fetchAll();
      //check if session_id exists
      if(!empty($data)){
          //if session id exists delete it from sessions table
                $session_expire = $this->db->prepare("DELETE FROM Sessions WHERE session_id = :id");
                $session_expire->bindParam("id", $id);
                $session_expire->execute();
                $mess[] = array('valid' => 'true', 'session_id' => 0);
                
                $this->response->getBody()->write(json_encode($mess));
                return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
      
      } 
      else {
        //if session id does not exist, nothing to delete
            $data[] = array('valid' => 'false', 'session_id' => 0);
            
            $this->response->getBody()->write(json_encode($data));
            return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
      }
});
