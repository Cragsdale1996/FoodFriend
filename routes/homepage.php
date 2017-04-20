<?php

// Homepage: Display top 5 dishes
$app->get('/home', function ($request, $response, $args) {

    $sth = $this->db->prepare("SELECT RestAccount.name as Restaurant_name, dish.name as 'Dish_name', description, score
      FROM (SELECT rest_id, Dishes.name, description, score FROM Dishes ORDER BY score DESC LIMIT 5) AS dish
      JOIN RestAccount
      ON RestAccount.rest_id = dish.rest_id");

      $sth->execute();
      $list = $sth->fetchAll();
      return $this->response->withJson($list);
});

//User profile: display profile
// $app->get('/userprofile/[{username}]', function($request, $response, $args){
//
//   $sth = $this->db->prepare("SELECT convert(varbinary, name) from UserAccount");
//       $sth = $this->db->prepare("SELECT name as user_name, email, city, state_post_code
//         FROM UserAccount
//         WHERE :username = TRIM(name)");
//       $sth->bindParam("username", $args['username']);
//       $sth->execute();
//       $list = $sth->fetchAll();
//       return $this->response->withJson($list);
// });

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
