<?php

function get_date($date_id, $user_id) {

    require_once("credentials.php");
    $db_servername = $cred_db_servername;
    $db_username = $cred_db_username;
    $db_password = $cred_db_password;
    $table_name = $dates_table_name;
    $subtable_name = $date_elms_table_name;

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
        $stmt = "SELECT * FROM {$table_name} WHERE date_id = '$date_id' AND user_id = '$user_id'";

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
                    $locations = array();

                    require_once("business_info.php");
                    require_once("yelp_api.php");
                    // require_once("search.php");

                    while ($unique_date_elm = $date_elms->fetch_assoc()) {
                        array_push($businesses, $unique_date_elm["business_id"]);

                        // get info from yelp for business id
                        $data = json_decode(get_business($unique_date_elm["business_id"]), true);
                        $location_data = $data["location"];
                        array_push($locations, $location_data["coordinate"]);
                        $data = parse_business($data);
                        // return var_dump($data);

                        // add categories for date to list of all categories
                        foreach($data["categories"] as $category) {
                            array_push($categories, $category);
                        }
                    }

                    // add data for date object to date array
                    $date["businesses"] = $businesses;
                    $date["categories"] = $categories;
                    $date["distances"] = calc_distances($locations);

                } else {
                    return "could not get date elements for date id: " . $date_id;
                }

            } else {
                return "Date ID provided not accessible or does not exist for this user.";
            }

            return json_encode($date);

        } else {
            return "Error locating date: " . $conn->error;
        }

    } else {
        return "Date id is not an integer";
    }

}

// uses the haversine formula to calculate the distances between gps coordinates
function calc_distances($coord_array) {
    $distances = array();

    for ($i = 0; $i < sizeof($coord_array) - 1; $i++) {
        $lat1 = $coord_array[$i]["latitude"];
        $lon1 = $coord_array[$i]["longitude"];
        $lat2 = $coord_array[$i + 1]["latitude"];
        $lon2 = $coord_array[$i + 1]["longitude"];

        $delLat = deg2rad($lat2-$lat1);
        $delLon = deg2rad($lon2-$lon1);
        $a = sin($delLat/2) * sin($delLat/2) + cos(deg2rad($lat1)) *
             cos(deg2rad($lat2)) * sin($delLon/2) * sin($delLon/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));
        array_push($distances, (3961*$c));
    }
    return $distances;
}

function update_date($user_id, $date_id, $businesses, $total_cost, $name, $total_time, $image_url) {

    require_once("credentials.php");
    $db_servername = $cred_db_servername;
    $db_username = $cred_db_username;
    $db_password = $cred_db_password;
    $table_name = $dates_table_name;
    $subtable_name = $date_elms_table_name;

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
        // die and log error
        return "Could not connect to db.";
    }

    // regex check inputs
    $date_id_pattern = "/^\d+$/";
    $business_pattern = "/^[\w\-]+$/";
    $cost_pattern = "/^\d+(\.\d+)?$/";
    $name_pattern = "/[\w\s' \-\d]+/";
    $time_pattern = "/^\d+$/";
    $image_url_pattern = "/^(http:\/\/|https:\/\/)[\.\w\-]+\.[\w\-]+(\/[\w\-]+)*(\/[\w\-]+\.[a-zA-Z]{3})?$/";

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
        $name = $conn->real_escape_string($name);
        $image_url = $conn->real_escape_string($image_url);
        // update name, total cost, total time, and image url in dates table where date_id matches
        $stmt = "UPDATE {$table_name} SET name = '$name', total_cost = '$total_cost', total_time = '$total_time', image_url = '$image_url' WHERE date_id = '$date_id' AND user_id = '$user_id'";

        if ($conn->query($stmt)) {
            // drop all date elements from date elements table where date id matches
            $stmt = "DELETE FROM {$subtable_name} WHERE date_id = '$date_id'";

            // add each new business to the date elements table with the provided date id
            foreach ($businesses as $business) {
                $stmt .= "; INSERT INTO {$subtable_name} (date_id, business_id) VALUES ('$date_id', '$business')";
            }

            // if the update was successful the date id is returned
            if ($conn->multi_query($stmt)) {
                return $date_id;

            } else {
                return "Could not update dates table: " . $conn->error;
            }

        } else {
            return "Could not update date: " . $conn->error;
        }

    } else {
        return "Input parameters are invalid";
    }
}
