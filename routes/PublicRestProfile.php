<?php

//Rest profile: display profile
$app->get('/restprofile/[{rest_id}]', function($request, $response, $args){

          //get rest information
          $info = $this->db->prepare("SELECT name, email, address, category, city, state_post_code
                  FROM RestAccount
                  WHERE rest_id = :rest_id");
          $info->bindParam("rest_id", $args['rest_id']);
          $info->execute();
          $data = $info->fetchAll();

          //get favorite Dishes
          $sth = $this->db->prepare("SELECT name, description, score FROM Dishes WHERE rest_id = 1");
          $sth->execute();
          $list = $sth->fetchAll();
          $dish = array('Dishes' => $list);

          //combine both together
          $total = array_merge($data, $dish);

          return $this->response->withJson($total);

});

//up vote or down vote a dish
$app->post('/restProfile/[{rest_id}]', function($request, $response, $args){

      $body = $request->getBody();
      $body = json_decode($body, true);
      $id = $body['session_id'];

      //get session_id
      $info = $this->db->prepare("SELECT account_id, is_restaurant, session_id, time_expires FROM Sessions WHERE session_id = :id");
      $info->bindParam("id", $id);
      $info->execute();
      $data = $info->fetchAll();

      //if session_id exists
      if(!empty($data)){

          //if session_id exist but already expires
          $today = date('Y-m-d H:i:s');
          if($data[0][time_expires] < $today){
                $session_expire = $this->db->prepare("DELETE FROM Sessions WHERE session_id = :id");
                $session_expire->bindParam("id", $id);
                $session_expire->execute();
                $mess[] = array('valid' => 'false', 'session_id' => 0);
                return json_encode($mess);

          //if session exists and not expires, but isRestaurant (can't vote)
          } else if($data[0][is_restaurant] == 1){
            $mess[] = array('valid' => 'false', 'session_id' => $id);
            return json_encode($mess);

          //if session exists and not expires and not restaurant account
          } else {

               //get user_id, dish_id and vote(1 for up and -1 for down)
               $dish_id = $body['dish_id'];
               $user_id = $body['user_id'];
               $vote = $body['vote'];

               $query = $this->db->prepare("SELECT * FROM Vote WHERE dish_id='$dish_id'
                        AND user_id='$user_id'");
                $query->execute();
                $data = $query->fetchObject();

                //vote associated with this user already exist
                if(!empty($data)){

                    //if your vote choice is different the vote data in the table, neutral the vote
                    //and delete from the table
                    if($vote != $data->vote){
                      $q = $this->db->prepare("DELETE FROM Vote WHERE user_id='$user_id' AND dish_id = '$dish_id'");
                      $q->execute();
                      $mess[] = array('success' => 'true', 'session_id' => $id);
                      return $this->response->withJson($mess);

                    //if your vote is the same
                    } else {
                        $mess[] = array('success' => 'false', 'session_id' => $id);
                        return $this->response->withJson($mess);
                    }

                //vote not exist for this user , CREATE new vote data
                } else {
                    $new = $this->db->prepare("INSERT INTO Vote(user_id, dish_id, vote) VALUES('$user_id','$dish_id','$vote')");
                    $new->execute();
                    $mess[] = array('success' => 'true', 'session_id' => $id);
                    return $this->response->withJson($mess);
                }
        }

      //session_id no longer exist
      } else {
            $data[] = array('valid' => 'false', 'session_id' => 0);
            return json_encode($data);
      }
});
