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

//up vote (down vote) a dish or add a dish to favorite list
$app->post('/restProfile/public', function($request, $response, $args){

    $body = $request->getBody();
    $body = json_decode($body, true);

    $dish_id = $body['dish_id'];
    $vote = $body['vote'];
    $id = $body['session_id'];

    //get session_id
    $info = $this->db->prepare("SELECT account_id, session_id, time_expires FROM Sessions WHERE session_id='$id'");
    $info->execute();
    $data = $info->fetchAll();

    //if session_id exists
    if(!empty($data)) {

        //if session_id exist but already expires
        $today = date('Y-m-d H:i:s');
        if ($data[0][time_expires] < $today) {
            $session_expire = $this->db->prepare("DELETE FROM Sessions WHERE session_id = :id");
            $session_expire->bindParam("id", $id);
            $session_expire->execute();
            $mess[] = array('valid' => 'false', 'session_id' => 0);
            return json_encode($mess);

        //if session exists and not expires, but isRestaurant (can't vote or add favorite dish)
        } else if ($data[0][is_restaurant] == 1) {
            $mess[] = array('valid' => 'false', 'session_id' => $id);
            return json_encode($mess);

        //if session exists and not expires and not restaurant account
        } else {

            //get user_id
            $user_id = $data[0][account_id];

            ///////////if vote is empty -> adding dish
            if (empty($vote)) {
                return addDish($this->db, $dish_id, $user_id, $id);

            ///////////if vote is not empty -> changing vote
            } else {
                return updateVote($this->db, $dish_id, $user_id, $id, $vote);
            }
        }

    //session_id no longer exist
    } else {
        $data[] = array('valid' => 'false', 'session_id' => 0);
        return json_encode($data);
    }

});

function addDish($db, $dish_id, $user_id, $id){
      if (empty($vote)) {
        $query = $db->prepare("SELECT * FROM Favorites WHERE dish_id='$dish_id'
                    AND user_id='$user_id'");
        $query->execute();
        $data = $query->fetchObject();

        //if dish is already in favorite list for this user
        if(!empty($data)){
            $mess[] = array('success' => 'false', 'session_id' => $id);
            return json_encode($mess);

            //dish not exist , CREATE new favorite
        } else {
            $new = $db->prepare("INSERT INTO Favorites(user_id, dish_id) VALUES('$user_id','$dish_id')");
            $new->execute();
            $mess[] = array('success' => 'true', 'session_id' => $id);
            return json_encode($mess);
        }
    }
}

function updateVote($db, $dish_id, $user_id, $id, $vote){
      $query = $db->prepare("SELECT * FROM Vote WHERE dish_id='$dish_id'
                  AND user_id='$user_id'");
      $query->execute();
      $data = $query->fetchObject();

      //vote associated with this user already exist
      if (!empty($data)) {

          //if your vote choice is different the vote data in the table, neutral the vote
          //and delete from the table
          if ($vote != $data->vote) {
              $q = $db->prepare("DELETE FROM Vote WHERE user_id='$user_id' AND dish_id = '$dish_id'");
              $q->execute();
              $mess[] = array('success' => 'true', 'session_id' => $id);
              return json_encode($mess);

          //if your vote is the same
          } else {
              $mess[] = array('success' => 'false', 'session_id' => $id);
              return json_encode($mess);
          }

      //vote not exist for this user , CREATE new vote data
      } else {
          $new = $db->prepare("INSERT INTO Vote(user_id, dish_id, vote) VALUES('$user_id','$dish_id','$vote')");
          $new->execute();
          $mess[] = array('success' => 'true', 'session_id' => $id);
          return json_encode($mess);
      }
}
