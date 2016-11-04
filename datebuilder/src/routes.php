<?php
// Routes
ini_set('display_errors', 1);

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require '../vendor/autoload.php';

$app = new \Slim\App;

$app->get('/[{name}]', function ($request, $response, $args) {
    // Render index view
    $view = new \Slim\Views\PhpRenderer(__DIR__.'/../templates/');
    return $view->render($response, './index.phtml', $args);
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


$app->post('/build/', function (Request $request, Response $response) {

    $parsed_body = $request->getParsedBody();
    var_dump($parsed_body); 
    $business = $parsed_body['business'];
    $distances = $parsed_body['distances'];
    $categories = $parsed_body['categories'];
    $total_cost = $parsed_body['total_cost'];
    $name = $parsed_body['name'];
    $total_time = $parsed_body['total_time'];
    $image_url = $parsed_body['image_url'];
    include 'build_date.php';

    $status = build_date($business, $distances, $categories, $total_cost, $name, $total_time, $image_url);
    if ($status === TRUE) {
        $response->getBody()->write("Date built!!!");
    } else {
        $response->getBody()->write("Error building date: ". $status);
    }
    return $response;
});


//$app->get('/sys_create_database/', function (Request $request, Response $response) {
//    include '_setup.php';
//    try {
//        create_database("datebuilder_db");
//        $response->getBody()->write("database created");
//    } catch (Exception $e) {
//        $response->getBody()->write("error creating database: " . $e->getMessage());
//    }
//
//    return $response;
//});
