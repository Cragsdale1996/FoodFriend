<?php

$app->get('/login/[{email}&{password}]', function ($request, $response, $args) {
        $sth = $this->db->prepare("SELECT user_id  FROM UserAccount WHERE email=:email AND password=:password");
        $sth->bindParam("email", $args['email']);
        $sth->bindParam("password", $args['password']);
        $sth->execute();
        $output = $sth->fetchAll();
        if(empty($output)){
                $sth2 = $this->db->prepare("SELECT rest_id FROM RestAccount WHERE email=:email AND password =:password");
                $sth2->bindParam("email", $args['email']);
                $sth2->bindParam("password", $args['password']);
                $sth2->execute();
                $output2 = $sth2->fetchAll();
                if(empty($output2)){
                        $data = json_decode($json, true);
                        $data[] = array('valid' => 'false', 'session_id' => '0');
                        $json = json_encode($data);
                        return $json;
                }else{
                        $sid = uniqid();
                        $val = $output2[0][rest_id];
                        $data = json_decode($json, true);
                        $data[] = array('valid' => 'true', 'session_id' => $sid);
                        $json = json_encode($data);
                        $sql = "INSERT INTO Sessions (account_id, is_restaurant,session_id,time_created,time_expires) VALUES ($val, 1, '$sid', now(), now() + interval 1 hour)";
                        $stm = $this->db->prepare($sql);
                        $stm->execute();
                        return $json;
                }
        }else{
                $sid = uniqid();
                $val = $output[0][user_id];
                $data = json_decode($json, true);
                $data[] = array('valid' => 'true', 'session_id' => $sid);
                $json = json_encode($data);
                $sql = "INSERT INTO Sessions (account_id, is_restaurant, session_id, time_created, time_expires) VALUES ($val, 0, '$sid', now(), now() + interval 1 hour)";
                $stm = $this->db->prepare($sql);
                $stm->execute();
                return $json;
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
                return json_encode($mess);
      	}
 
      	else {
        	//if session id does not exist, nothing to delete
            	$data[] = array('valid' => 'false', 'session_id' => 0);
            	return json_encode($data);
      	}
});
