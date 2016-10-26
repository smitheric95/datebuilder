<?php
function add_user($name,$pssword,$email,$age,$allow_loc_services) {

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
    $sql = "INSERT INTO DATABASE $name VALUES(";
    if ($conn->query($sql) === TRUE) {
        echo "Database created successfully";
    } else {
        echo "Error creating database: " . $conn->error;
//        $logger->error('Error creating database: ', $conn->error);
    }

    $conn->close();
}