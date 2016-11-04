<?php

function validate_login ($email, $password) {

    $db_servername = "localhost";
    $db_username = "app";
    $db_password = "app!db!password";
    $table_name = "datebuilder_db.users";

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
        // die and log error
        return False;
    }

    $email_pattern = "/^\w+@\w+\.\w{3}$/";

    $email_match = preg_match($email_pattern, $email);

    if ($email_match == 1) {
        $stmt = $conn->stmt_init();

        // select user by email from users table
        if (!$stmt->prepare("SELECT * FROM {$table_name} WHERE email = ?")) {
            // log error
            return "Could not prepare email query";
        }

        if (!$stmt->bind_param("s", $email)) {
            // log error
            return "Could not bind email to login query";
        }

        if (!$stmt->execute()) {
            // log error
            return "Error getting email from users table";
        }

        if ($stmt->num_rows == 0) {
            return "email not found in users table";
        }

        // take salt and hash password
        include "salty.php";
        $possible_user = $stmt->fetch_assoc();
        $password = salt_password($password, $possible_user["salt"]);

        // select user by email and password
        if (!$stmt->prepare("SELECT * FROM {$table_name} WHERE email = ? AND password = ?")) {
            return "Could not prepare email and password query";
        }

        if (!$stmt->bind_param("ss", $email, $password)) {
            return "Could not bind email and password to login query";
        }

        if (!$stmt->execute()) {
            return "User could not be found in the users table";
        }

        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            return True;
        }


        // if the email and password are valid add the user to an active user table?
    }

    return "Invalid email format";
}