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

$app->get('/getuser/', function (Request $request, Response $response) {
    // get user_id from session id
    $user_id = 1;

    include "user_info.php";

    $data_return = get_user_info($user_id);

    $response->getBody()->write($data_return);

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

$app->post('/users/login', function (Request $request, Response $response) {
    $parsed_body = $request->getParsedBody();
    $user_email = $parsed_body['email'];
    $password = $parsed_body['password'];

    include "login.php";

    $status = validate_login($user_email, $password);

    if ($status === TRUE) {
        $response->getBody()->write("Log in confirmed.");
    } else {
        $response->getBody()->write("Error logging in user: " . $status);
    }

    return $response;
});


// Returns a JSON object that contains top rated restaurants in the users area
// The "businesses" key maps to a list of recomended businesses, ranked for the user.
$app->get('/search/load', function (Request $request, Response $response) {
    include "search.php";
    $user_id = 1;

    $search_return = default_search($user_id);

    $response->getBody()->write($search_return);

    return $response;
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

$app->get('/search/business/{businessid}', function (Request $request, Response $response) {
    $businessid = $request->getAttribute('businessid');

    include "business_info.php";

    $business_return = business_info($businessid);

    $response->getBody()->write($business_return);

    return $response;
});



$app->post('/build/', function (Request $request, Response $response) {

    $parsed_body = $request->getParsedBody();
    var_dump($parsed_body);
    $business = $parsed_body['business'];
    $total_cost = $parsed_body['total_cost'];
    $name = $parsed_body['name'];
    $total_time = $parsed_body['total_time'];
    $image_url = $parsed_body['image_url'];
    include 'build_date.php';

    $status = build_date($business, $total_cost, $name, $total_time, $image_url);
    if (is_int($status)) {
        $response->getBody()->write($status);
    } else {
        $response->getBody()->write("Error building date: ". $status);
    }
    return $response;
});

$app->get('/editdate/{date_id}', function (Request $request, Response $response) {
    $date_id = $request->getAttribute('date_id');

    include "edit_date.php";

    $status = get_date($date_id);

    $response->getBody()->write($status);

    return $response;
});

$app->post('/updatedate', function (Request $request, Response $response){
    $parsed_body = $request->getParsedBody();

    $date_id = $parsed_body["date_id"];
    $date_data = $parsed_body["date"];

    include "edit_date.php";

    $status = update_date($date_id, $data_data);

    $response->getBody()->write($status);

    return $response;
});

$app->add(function ($request, $response, $next) use ($settings) {
    $response = $next($request, $response);

    if (404 === $response->getStatusCode()) {
        $response->getBody()->rewind();
        $handler = $settings['notFoundHandler'];
        return $handler($request, $response);
    }

    return $response;
});
