<?php

function get_user_info($user_id) {

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

    // validate user id as int
    $user_id_pattern = "/^\d+$/";

    $id_match = preg_match($user_id_pattern, $user_id);

    if ($id_match == 1) {
        $result = array();

        // get user specific info
        $sql = "SELECT * FROM datebuilder_db.users WHERE user_id = '$user_id'";

        // execute query
        if ($result = $conn->query($sql)) {
            // if a user was found with the provided user id
            if ($result->num_rows == 1) {

                $row = $result->fetch_assoc();
//                $row["allow_loc_services"] = $row["allow_loc_services"] ? True : False;
                $result['user'] = array(
                    "name" => $row["name"],
                    "email" => $row["email"],
                    "age" => $row["name"],
                    "allow_loc_services" => $row["allow_loc_services"]
                );

            } else {
                return "user id not found in users table";
            }

        } else {
            // log error
            return "Error getting user id from users table: " . $conn->error;
        }

        // get dates for user
        $sql = "SELECT * FROM datebuilder_db.dates WHERE user_id = '$user_id'";

        // execute query
        if ($result = $conn->query($sql)) {
            $dates = array();

            // if a user has dates saved, for each date id the date elements are found and the data is retrieved from yelp
            if ($result->num_rows > 0) {
                while ($row = mysqli_fetch_assoc($result)) {    // probably wont like mysqli_fetch_assoc
                    $date_to_add = array();

                    $date_to_add["name"] = $row["name"];
                    $date_to_add["total_cost"] = $row["total_cost"];
                    $date_to_add["total_time"] = $row["total_time"];
                    $date_to_add["image_url"] = $row["image_url"];

                    $date_id = $row['date_id'];

                    $sql = "SELECT * FROM datebuilder_db.date_elements WHERE date_id = '$date_id'";

                    if ($date_elms = $conn->query($sql)) {

                        $businesses = array();
                        $categories = array();

                        include "business_info.php";    // not yet included in src

                        while ($unique_date_elm = $date_elms->fetch_assoc()) {
                            array_push($businesses, $unique_date_elm["business_id"]);
                            // get info from yelp for business id
                            $data = json_decode(business_info($unique_date_elm["business_id"]));
                            array_push($categories, $data["business"]["categories"]);
                        }

                        // compress categories down

                        // add data for date object to dates array
                        $date_to_add["businesses"] = $businesses;
                        $date_to_add["categories"] = $categories;
                    } else {
                        return "could not get date elements for date: " . $date_id;
                    }
                    
                    array_push($dates, $date_to_add);
                }
            }

            $result["dates"] = $dates;

        } else {
            return "Error getting dates for user id: " . $conn->error;
        }

        // get info for businesses from yelp

        // calculate statistics for user

        // return json encoded result
    }

    return "user id provided not an integer";
}

