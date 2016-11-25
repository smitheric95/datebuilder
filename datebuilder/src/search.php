<?php
// runs the query on yelp without applying user preferences

function generic_query($query) {
    include "yelp_api.php";

    // query yelp api
    $yelp_data = search($query, "Dallas, TX");

    // decode returned json, ignore everything but businesses
    $yelp_data = json_decode($yelp_data, true);
    $yelp_data = $yelp_data["businesses"];
    $yelp_data = filter_data($yelp_data);

    // encode as json and return
    return json_encode($yelp_data);
}

// returns the default search page for the user with user_id
function default_search($user_id) {
    include "yelp_api.php";

    $allow_loc_services = False;

    // queries database to see if user has allowed location services
    if ($user_id != 0) {
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

        $sql = "SELECT * FROM datebuilder_db.users WHERE user_id = '$user_id'";

        // execute query
        if ($result = $conn->query($sql)) {
            // if a user was found with the provided user id
            if ($result->num_rows == 1) {

                // update allow_loc_services
                $row = $result->fetch_assoc();
                $allow_loc_services = $row["allow_loc_services"];

            } else {
                return "user id not found in users table";
            }

        } else {
            // log error
            return "Error getting user id from users table: " . $conn->error;
        }
    }

    $zipcode = 0;
    // gets users city
    if ($allow_loc_services) {
        $location_data = json_decode(file_get_contents('http://freegeoip.net/json/' . $_SERVER['REMOTE_ADDR']), true);
        $zipcode = $location_data["zip_code"];
    }

    // path for yelp api call
    $url_params = array();
    $url_params['term'] = "food";
    $url_params['location'] = $zipcode?: "Dallas, TX";
    $url_params['limit'] = 20;
    $path = "/v2/search" . "?" . http_build_query($url_params);
    // $path = "/v2/search?sort=2&term=food&limit=20&location=" . (string)$zipcode;
    // $query = "sort=2&term=food&limit=20";

    // query yelp api
    // $yelp_data = json_decode(search($query, $zipcode), true);
    $yelp_data = json_decode(request("api.yelp.com", $path), true);

    // filter returned data
    $yelp_data = $yelp_data["businesses"];
    $yelp_data = filter_data($yelp_data);

    // json encode and return
    return json_encode($yelp_data);
}

function filter_data($data) {
    $desired_keys = array("categories", "display_phone", "id", "image_url", "location", "name", "rating", "url", "snippet_text");
    $parsed_data = array();

    // parse yelp_data by key
    foreach ($data as $business) {
        $saved_data = array();
        foreach ($business as $key => $val) {
            if (in_array($key, $desired_keys))
                $saved_data[$key] = $val;
        }
        $saved_data["location"] = $saved_data["location"]["display_address"];
        array_push($parsed_data, $saved_data);
    }
    return $parsed_data;
}
