<?php

function get_user_info($user_id) {

    $db_servername = "localhost";
    $db_username = "root";
    $db_password = "pass";
    $table_name = "datebuilder_db.users";

    $conn = new mysqli($db_servername, $db_username, $db_password);

    // Check connection
    if ($conn->connect_error) {
        // die and log error
        return "Could not connect to db.";
    }

    // validate user id as int
    $user_id_pattern = "/^\d+$/";

    $id_match = preg_match($user_id_pattern, $user_id);

    if ($id_match == 1) {
        $results = array();

        // get user specific info
        $sql = "SELECT * FROM datebuilder_db.users WHERE user_id = '$user_id'";

        // execute query
        if ($result = $conn->query($sql)) {
            // if a user was found with the provided user id
            if ($result->num_rows == 1) {

                // add user date to results
                $row = $result->fetch_assoc();
                $results['user'] = array(
                    "name" => $row["name"],
                    "email" => $row["email"],
                    "age" => $row["age"],
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

            // if a user has dates saved, for each date id the date elements
            // are found and the data is retrieved from yelp
            if ($result->num_rows > 0) {
                while ($row = mysqli_fetch_assoc($result)) {
                    $date_to_add = array();

                    $date_to_add["name"] = $row["name"];
                    $date_to_add["total_cost"] = $row["total_cost"];
                    $date_to_add["total_time"] = $row["total_time"];
                    $date_to_add["image_url"] = $row["image_url"];
                    
                    $date_id = $row['date_id'];
                    $date_to_add["id"] = $date_id;

                    // prepare query
                    $sql = "SELECT * FROM datebuilder_db.date_elements WHERE date_id = '$date_id'";

                    if ($date_elms = $conn->query($sql)) {

                        $businesses = array();
                        $categories = array();
                        $locations = array();

                        require_once("business_info.php");
                        require_once("edit_date.php");
                        require_once("yelp_api.php");

                        while ($unique_date_elm = $date_elms->fetch_assoc()) {
                            array_push($businesses, $unique_date_elm["business_id"]);

                            // get info from yelp for business id
                            $data = json_decode(get_business($unique_date_elm["business_id"]), true);
                            $location_data = $data["location"];
                            array_push($locations, $location_data["coordinate"]);
                            $data = parse_business($data);

                            // add categories for date to list of all categories
                            foreach($data["categories"] as $category) {
                                array_push($categories, $category);
                            }
                        }

                        // add data for date object to dates array
                        $date_to_add["businesses"] = $businesses;
                        $date_to_add["categories"] = $categories;
                        $date_to_add["distances"] = calc_distances($locations);

                    } else {
                        return "could not get date elements for date: " . $date_id;
                    }

                    array_push($dates, $date_to_add);
                }
            }

            $results["dates"] = $dates;

            // add statistics for the users dates to the return data
            $results["stats"] = get_stats($dates);

            // json encode and return
            return json_encode($results);

        } else {
            return "Error getting dates for user id: " . $conn->error;
        }
    }

    return "user id provided not an integer";
}

// gets the count for each category, the overall time, the average time,
// and the average cost
function get_stats($dates) {
    $overall_time = 0;
    $overall_cost = 0;
    $category_count = array();

    // iterate over dates, incrementing total time and cost
    foreach($dates as $date) {
        $overall_time += $date["total_time"];
        $overall_cost += $date["total_cost"];

        // count the occurances of categories
        foreach($date["categories"] as $cat) {
            if (!array_key_exists($cat[0], $category_count)) {
                $category_count[$cat[0]] = 1;
            } else {
                $category_count[$cat[0]] = $category_count[$cat[0]] + 1;
            }
        }
    }

    // take average for time and cost
    if(sizeof($dates) > 0)
    {
        $average_time = $overall_time / sizeof($dates);
        $average_cost = $overall_cost / sizeof($dates);
    }
    else
    {
        $average_time = 0;
        $average_cost = 0;
    }
    // prepare stats array to return
    $stats = array(
        "categories" => $category_count,
        "total_time" => $overall_time,
        "average_time" => $average_time,
        "average_cost" => $average_cost
    );

    return $stats;
}
