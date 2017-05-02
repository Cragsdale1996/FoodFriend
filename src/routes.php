<?php
// Routes

// Login Page

include 'pageFiles/loginLogout.php';

// Home Page

include 'pageFiles/homepage.php';

// Restaurant Page

include 'pageFiles/restaurants.php';

// Profile Page

include 'pageFiles/user.php';

// Search Page

include 'pageFiles/searchpage.php';

// Leftovers

$app->get('/foodfriend', function ($request, $response, $args) {
    $sth = $this->db->prepare("SHOW tables;");
    $sth->execute();
    $tables = $sth->fetchAll();
    return $this->response->withJson($tables);
});

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});
