<?php
// Routes

// Login Page

include 'pageFiles/login.php';

// Home Page

include 'pageFiles/home.php';

// Restaurant Page

include 'pageFiles/restaurant.php';

// Profile Page

include 'pageFiles/profile.php';

// Search Page

include 'pageFiles/search.php';

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
