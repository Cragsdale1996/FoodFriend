<?php

//User profile: display profile
$app->get('/restprofile/[{rest_id}]', function($request, $response, $args){


          //get user information
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
