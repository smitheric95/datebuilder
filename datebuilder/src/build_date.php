<?php
// adds a new user to the users table
// returns True - new user was added successfully
// returns False - error adding new user (parameters could not be validated or the user already exits in the table)
function build_datebuild_date($business, $distances, $categories, $total_cost, $name, $total_time, $image_url) {
    return TRUE;
    $db_servername = "localhost";
    $db_username = "root";
    $db_password = "pass";
    $table_name = "datebuilder_db.dates";

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
//        echo "Connection failed: " . $conn->connect_error;
//        $logger->error('Connection to database failed: ', $conn->connect_error);
    }

    // regex check input

    for($i = 0; $i < sizeof($business); $i++)
    {
        $pattern = "/\w+/";
        $match = preg_match($pattern, $business[$i]);
        if ($match != 1)
        {
            $conn->close();
            return "Invalid 'business' input";
        }
    }
    for($i = 0; $i < sizeof($distances); $i++)
    {
        $pattern = "/\d+.\d*/";
        $match = preg_match($pattern, $distances[$i]);
        if ($match != 1)
        {
            $conn->close();
            return "Invalid 'distances' input";
        }
    }
    #for($i = 0; $i < sizeof($categories); $i++)
    #{
    #    $pattern = "/\d+.\d*/";
    #    $match = preg_match($pattern, $categories[$i]);
    #    if ($match != 1)
    #    {
    #        $conn->close();
    #        return "Invalid 'categories' input";
    #    }
    #}
    
    $total_cost_pattern = "/^\w+$/";
    $name_pattern = "/^\d{1,3}$/";
    $total_time_pattern = "/^\w+@\w+\.\w{3}$/";
    $image_url_pattern = "/^(True|False)$/";

    $tc_match = preg_match($total_cost_pattern, $total_cost);
    $n_match = preg_match($name_pattern, $name);
    $tt_match = preg_match($total_time_pattern, $total_time);
    $iu_match = preg_match($image_url_pattern, $image_url);

    string serialize ( mixed $value )
    // if the input fields are all valid, the user is added to the users table
    if (TRUE/*$n_match == 1 && $e_match == 1 && $a_match == 1 && $l_match == 1*/) {

//        $email = mysqli_real_escape_string()

        $sql = "INSERT INTO {$table_name} (date_id, user_id, name, total_cost, total_time, image_url) VALUES (NULL,1, '$name', '$total_cost', '$total_time', '$image_url')";

        if ($conn->query($sql) === TRUE) {
            echo "New user successfully created";
            $conn->close();
            return TRUE;
        } else {
            return "Error adding date to db: " . $conn->error;
        }

    }
    $conn->close();
    return "Invalid input.";
}


