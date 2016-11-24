<?php

function get_date($date_id) {

    $db_servername = "localhost";
    $db_username = "root";
    $db_password = "pass";
    $table_name = "datebuilder_db.dates";
    $subtable_name = "datebuilder_db.date_elements";

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
        // die and log error
        return "Could not connect to db.";
    }

    // validate user id as int
    $date_id_pattern = "/^\d+$/";

    $date_id_match = preg_match($date_id_pattern, $date_id);

    if ($date_id_match == 1) {
        // query dates table for provided date id
        $stmt = "SELECT * FROM {$table_name} WHERE date_id = '$date_id'";

        if ($result = $conn->query($stmt)) {
            $date = array();

            if ($result->num_rows == 1) {
                $row = mysqli_fetch_assoc($result);
                $date["name"] = $row["name"];
                $date["total_cost"] = $row["total_cost"];
                $date["total_time"] = $row["total_time"];
                $date["image_url"] = $row["image_url"];

                $stmt = "SELECT * FROM {$subtable_name} WHERE date_id = '$date_id'";

                if ($date_elms = $conn->query($stmt)) {

                    $businesses = array();
                    $categories = array();

                    require_once("business_info.php");

                    while ($unique_date_elm = $date_elms->fetch_assoc()) {
                        array_push($businesses, $unique_date_elm["business_id"]);

                        // get info from yelp for business id
                        $data = json_decode(business_info($unique_date_elm["business_id"]), true);

                        // add categories for date to list of all categories
                        foreach($data["categories"] as $category) {
                            array_push($categories, $category);
                        }
                    }

                    // add data for date object to date array
                    $date["businesses"] = $businesses;
                    $date["categories"] = $categories;

                } else {
                    return "could not get date elements for date id: " . $date_id;
                }

            } else {
                return "No dates found with provided date ID.";
            }

            return json_encode($date);

        } else {
            return "Error locating date: " . $conn->error;
        }

    } else {
        return "Date id is not an integer";
    }

}

function update_date($date_id, $businesses, $total_cost, $name, $total_time, $image_url) {

    $db_servername = "localhost";
    $db_username = "root";
    $db_password = "pass";
    $table_name = "datebuilder_db.dates";
    $subtable_name = "datebuilder_db.date_elements";

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
        // die and log error
        return "Could not connect to db.";
    }

    // regex check inputs
    $date_id_pattern = "/^\d+$/";
    $business_pattern = "/^[\w-]+$/";
    $cost_pattern = "/^\d+(.\d+)?$/";
    $name_pattern = "/^[\w\s\d-]+$/";
    $time_pattern = "/^\d+$/";
    $image_url_pattern = "/^(http:\/\/|https:\/\/|http:\/\/www\.|https:\/\/www\.)[\w]+\.[\w]{3}(\/\w+)*(\/[\w]+\.[a-zA-Z]{3})?$/";

    $d_id_match = preg_match($date_id_pattern, $date_id);
    $c_match = preg_match($cost_pattern, $total_cost);
    $n_match = preg_match($name_pattern, $name);
    $t_match = preg_match($time_pattern, $total_time);
    $i_u_match = preg_match($image_url_pattern, $image_url);

    $b_match = 1;

    // check that all businesses satisfy the business regex pattern
    foreach ($businesses as $business) {
        if (!preg_match($business_pattern, $business) == 1) {
            $b_match = 0;
        }
    }

    if ($d_id_match == 1 && $c_match == 1 && $n_match == 1 && $t_match == 1 && $i_u_match == 1 && $b_match == 1) {
        // update name, total cost, total time, and image url in dates table where date_id matches

        
        // drop all date elements from date elements table where date id matches

        // add each new business to the date elements table with the provided date id

    }


}
