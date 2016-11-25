<?php

function update_user($user_id, $name, $password, $email, $age, $loc_serv) {

    $db_servername = "localhost";
    $db_username = "root";
    $db_password = "pass";
    $table_name = "datebuilder_db.users";

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
//        echo "Connection failed: " . $conn->connect_error;
        return "Could not connect to database: " . $conn->connect_error;
    }

    // regex check input
    $name_pattern = "/^\w+$/";
    $email_pattern = "/^\w+@\w+\.\w{3}$/";
    $age_pattern = "/^\d{1,3}$/";
    $loc_serv_pattern = "/^(True|False)$/";

    $n_match = preg_match($name_pattern, $name);
    $e_match = preg_match($email_pattern, $email);
    $a_match = preg_match($age_pattern, $age);
    $l_match = preg_match($loc_serv_pattern, $loc_serv);

    if ($n_match == 1 && $e_match == 1 && $a_match == 1 && $l_match == 1) {
        // salt password
        include "salty.php";
        $salt = get_new_salt();
        $password = salt_password($password, $salt);
        if ($loc_serv == "True") {
            $loc_serv = 1;
        } else {
            $loc_serv = 0;
        }

        // prepare query
        $sql = "UPDATE {$table_name} SET
            name = '$name', email = '$email',
            age = '$age', allow_loc_services = '$loc_serv',
            password = '$password', salt = '$salt'
            WHERE user_id = '$user_id'";

        // execute query
        if ($conn->query($sql)) {
            // echo "User account successfully created";
            $conn->close();
            return TRUE;
        } else {
            $conn->close();
            return "Error updating user account: " . $conn->error;
        }

    } else {
        return "Invalid parameters";
    }
}