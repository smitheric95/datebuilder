<?php
// Routes

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

// require '../vendor/autoload.php';

$app = new \Slim\App;

$app->get('/[{name}]', function ($request, $response, $args) {
    // Sample log message
    $this->logger->info("Slim-Skeleton '/' route");

    // Render index view
    return $this->renderer->render($response, 'index.phtml', $args);
});

$app->get('/hello/{name}', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Hello, $name");

    return $response;
});

$app->post('/users', function (Request $request, Response $response) {
    // include
});

$app->get('/sys_create_database/', function (Request $request, Response $response) {
    include '_setup.php';
    try {
        create_database("datebuilder_db");
        $response->getBody()->write("database created");
    } catch (Exception $e) {
        $response->getBody()->write("error creating database:", $e->getMessage());
    }


    return $response;
});
