<?php

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
                $mssg = json_encode($mess);
                $this->response->getBody()->write($mssg);
                return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*')

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
                   $mssg = json_encode($mess);
                   $this->response->getBody()->write($mssg);
                   return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');

               //if dish id not exist, cannot delete
               } else {
                   $mess[] = array('success' => 'false', 'session_id' => $id);
                   $mesg = json_encode($mess);
                   $this->response->getBody()->write($mesg);
                   return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
  
               }
        }

      //session_id no longer exist
      } else {
            $data[] = array('valid' => 'false', 'session_id' => 0);
            $datas = json_encode($data);
            $this->response->getBody()->write($datas);
            return $this->response->withAddedHeader('Access-Control-Allow-Origin', '*');
      }
});
