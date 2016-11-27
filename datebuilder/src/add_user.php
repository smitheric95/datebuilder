<?php
// adds a new user to the users table
// returns True - new user was added successfully
// returns False - error adding new user (parameters could not be validated or the user already exits in the table)
function add_user($name, $password, $email, $age, $allow_loc_services) {

    $db_servername = "localhost";
    $db_username = "app";
    $db_password = "app!db!password";
    $table_name = "datebuilder_db.users";

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
//        echo "Connection failed: " . $conn->connect_error;
//        $logger->error('Connection to database failed: ', $conn->connect_error);
    }

    // regex check input
    $name_pattern = "/^\w+$/";
    $email_pattern = "/^\w+@\w+\.\w{3}$/";
    $age_pattern = "/^\d{1,3}$/";
    $loc_serv_pattern = "/^(True|False)$/";

    $n_match = preg_match($name_pattern, $name);
    $e_match = preg_match($email_pattern, $email);
    $a_match = preg_match($age_pattern, $age);
    $l_match = preg_match($loc_serv_pattern, $allow_loc_services);

    // if the input fields are all valid, the user is added to the users table
    if ($n_match == 1 && $e_match == 1 && $a_match == 1 && $l_match == 1) {
        // salt password
        include "salty.php";
        $salt = get_new_salt();
        $password = salt_password($password, $salt);
        if ($allow_loc_services == "True") {
            $allow_loc_services = 1;
        } else {
            $allow_loc_services = 0;
        }

        // prepare query
        $sql = "INSERT INTO {$table_name} (name, email, age, allow_loc_services, password, salt) VALUES ('$name', '$email', '$age', '$allow_loc_services', '$password', '$salt')";

        // execute query
        if ($conn->query($sql) === TRUE) {
            echo "New user successfully created";
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
                        echo "successfully logged in";
                        return True;
                    }
                } else {
                    return "Error getting username and email from users table: " . $conn->error;
                }

            $conn->close();
            return TRUE;
        } else {
            $conn->close();
            return "Error adding new user: " . $conn->error;
        }
    }
    $conn->close();
    return "Invalid input.";
}