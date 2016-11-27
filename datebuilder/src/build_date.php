<?php
ini_set('display_errors', 1);
// adds a new date to the dates table and date elements to the date_elements table
// returns True - new date and associated elements added successfully
// returns False - error adding new date (parameters could not be validated or the date already exits in the table)
function build_date($business, $total_cost, $name, $total_time, $image_url) {
    ini_set('display_errors', 1);
    $db_servername = "localhost";
    $db_username = "root";
    $db_password = "pass";
    $table_name = "datebuilder_db.dates";
    $subtable_name = "datebuilder_db.date_elements";
    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {

    }

    // regex check input
    $total_cost_pattern = "/\d+(.\d+)?/";
    $name_pattern = "/[\w\s\-\d]+/";
    $total_time_pattern = "/\d+/";
    $image_url_pattern = "/\bhttps:\/\/s3-media\S*\/l.jpg\b/";

    $tc_match = preg_match($total_cost_pattern, $total_cost);
    $n_match = preg_match($name_pattern, $name);
    $tt_match = preg_match($total_time_pattern, $total_time);
    $iu_match = preg_match($image_url_pattern, $image_url);

    // if the input fields are all valid, the user is added to the users table
    if ($tc_match == 1 && $n_match == 1 && $tt_match == 1 && $iu_match == 1) {

        $user_id = $_SESSION["user_id"];
        $sql = "INSERT INTO {$table_name} (date_id, user_id, name, total_cost, total_time, image_url) VALUES (NULL,'$user_id', '$name', '$total_cost', '$total_time', '$image_url')";


        if ($conn->query($sql) === TRUE)
        {
            $date_id = $conn->insert_id;
            #$link = mysql_connect('localhost', 'root', 'pass');
            for($i = 0; $i < sizeof($business); $i++)
            {
                $business_pattern = "/[\w\-]+/";
                $this_business = $business[$i];
                $b_match = preg_match($business_pattern, $this_business);
                if($b_match == 1)
                {
                    $sql = "INSERT INTO {$subtable_name} (date_id, business_id) VALUES ('$date_id', '$this_business')";
                    if ($conn->query($sql) === TRUE) {
                        //success
                    }
                    else
                    {
                        echo("Error description: " . mysqli_error($conn));
                        return "error creating date";
                    }
                }
                else
                {
                    return "Error adding date to db, business_id did not match format. Error: " . $conn->error;
                }
            }
            $conn->close();
            return $date_id;
        } else {
            return "Error adding date to db: " . $conn->error;
        }

    }
    $conn->close();
    return "Invalid input.";
}
