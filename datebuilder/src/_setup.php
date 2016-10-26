<?php
function create_database($name) {

    $servername = "localhost";
    $username = "datebuilder";
    $password = "password";

    $conn = new mysqli($servername, $username, $password);
//    $logger = $this->get('logger');

    // Check connection
    if ($conn->connect_error) {
//        echo "Connection failed: " . $conn->connect_error;
//        $logger->error('Connection to database failed: ', $conn->connect_error);
    }

    // Create database
    $sql = "CREATE DATABASE $name";
    if ($conn->query($sql) === TRUE) {
        echo "Database created successfully";
    } else {
        echo "Error creating database: " . $conn->error;
//        $logger->error('Error creating database: ', $conn->error);
    }

    $conn->close();
}

function create_tables() {

}