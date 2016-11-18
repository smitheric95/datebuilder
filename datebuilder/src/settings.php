<?php
$c = new \Slim\Container();
$c['settings'] = [
    'displayErrorDetails' => true, // set to false in production
    'addContentLengthHeader' => false, // Allow the web server to send the content-length header

    // Renderer settings
    'renderer' => [
        'template_path' => __DIR__ . '/../templates/',
    ],

    // Monolog settings
    'logger' => [
        'name' => 'slim-app',
        'path' => __DIR__ . '/../logs/app.log',
        'level' => \Monolog\Logger::DEBUG,
    ],
];

$c['notFoundHandler'] = function($c) {
    return function ($request, $response) use ($c) {
        $view = new \Slim\Views\PhpRenderer(__DIR__.'/../templates/');
        return $view->render($response, './index.phtml');
    };
};
return $c;
