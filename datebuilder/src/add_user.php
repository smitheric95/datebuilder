<?php
// adds a new user to the users table
// returns True - new user was added successfully
// returns False - error adding new user (parameters could not be validated or the user already exits in the table)
function add_user($name, $password, $email, $age, $allow_loc_services) {

    $db_servername = "localhost";
    $db_username = "datebuilder";
    $db_password = "password";
    $table_name = "datebuilder_db.users";

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
//        echo "Connection failed: " . $conn->connect_error;
//        $logger->error('Connection to database failed: ', $conn->connect_error);
    }

    // regex check input
    $name_pattern = "/^\w./";
    $email_pattern = "/^\w.@\w\.\w{3}/";
    $age_pattern = "/^\d{1,3}/";
    $loc_serv_pattern = "/^(True|False)/";

    $n_match = preg_match($name_pattern, $name);
    $e_match = preg_match($email_pattern, $email);
    $a_match = preg_match($age_pattern, $age);
    $l_match = preg_match($loc_serv_pattern, $allow_loc_services);

    // if the input fields are all valid, the user is added to the users table
    if ($n_match == 1 && $e_match == 1 && $a_match == 1 && $l_match == 1) {

        // Create database
        $sql = "INSERT INTO " . $table_name . "VALUES (" . $name . $email . $age . $allow_loc_services . $password .")";
        if ($conn->query($sql) === TRUE) {
            echo "New user successfully created";
            $conn->close();
            return True;
        } else {
            echo "Error adding new user: " . $conn->error;
        }
    }
    $conn->close();
    return False;
}