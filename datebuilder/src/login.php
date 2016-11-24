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
//        $stmt = $conn->stmt_init();

        // select user by email from users table
        $sql = "SELECT * FROM {$table_name} WHERE email = '$email'";

        // execute query
        if ($result = $conn->query($sql)) {
            // if a user was found with the provided email
            if ($result->num_rows == 1) {

                $row = $result->fetch_assoc();
                // take salt and hash password
                include "salty.php";
                $password = salt_password($password, $row["salt"]);

                // select user by email and salted password
                $sql = "SELECT * FROM {$table_name} WHERE email = '$email' AND password = '$password'";

                if ($result = $conn->query($sql)) {
                    // if a user was found with that email and password the login is confirmed
                    if ($result->num_rows == 1) {
                        $row = $result->fetch_assoc();
                        $user_id = $row["user_id"];
                        #$user_id = 
                        $session_id = session_id();
                        $_SESSION['session'] = $session_id;
                        $_SESSION['user_id']= $user_id;  // Initializing Session with value of PHP Variable
                        $_SESSION['is_validated'] = True;
                        #echo $_SESSION['user_id'];
                        #echo $_SESSION['session'];
                        return True;
                    }
                } else {
                    return "Error getting username and email from users table: " . $conn->error;
                }
                
            } else {
                return "Email not found in users table";
            }

        } else {
            // log error
            return "Error getting email from users table: " . $conn->error;
        }
    }

    return "Invalid email format";
}