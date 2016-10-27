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

// Request to create an account comes in the form of a JSON object that
// includes all releveant account data.
$app->post('/users', function (Request $request, Response $response) {
    $parsed_body = $request->getParsedBody();
    $name = $parsed_body['name'];
    $email = $parsed_body['email'];
    $password = $parsed_body['password'];
    $age = $parsed_body['age'];
    $loc_serv = $parsed_body['allow_loc_services'];

    include "add_user.php";

    $status = add_user($name, $password, $email, $age, $loc_serv);

    if ($status === TRUE) {
        $response->getBody()->write("New account created successfully.");
    } else {
        $response->getBody()->write("Error creating account: ". $status);
    }

    return $response;
});

// Returns a JSON object that contains the site logo, the user's account pic.
// The "businesses" key maps to a list of recomended businesses, ranked for the user.
$app->get('/search/load', function (Request $request, Response $response) {


});


// Search Page [/search/search/{query}]

//Endpoint for searching on the search page. Search query is sent in a URL
//parameter. The user's preferences are not applied to queries sent through this
//endpoint.

// Returns a JSON array of JSON objects, each object contains the relevant data
// for any single business.
$app->get('/search/search/{query}', function (Request $request, Response $response) {
    $query = $request->getAttribute('query');

    include "search.php";

    $search_return = generic_query($query);

    $response->getBody()->write($search_return);

    return $response;
});