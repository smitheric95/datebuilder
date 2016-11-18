<?php
// runs the query on yelp without applying user preferences
function generic_query($query) {
    include "yelp_api.php";
    var_dump($_SESSION);
    // query yelp api
    $yelp_data =  search($query, "Dallas, TX");

    // decode returned json, ignore everything but businesses
    $yelp_data = json_decode($yelp_data, true);
    $yelp_data = $yelp_data["businesses"];

    $desired_keys = array("categories", "display_phone", "id", "image_url", "location", "name", "rating", "url", "snippet_text");
    $parsed_data = array();

    // parse yelp_data by key
    foreach ($yelp_data as $business) {
        $saved_data = array();
        foreach ($business as $key => $val) {
            if (in_array($key, $desired_keys))
                $saved_data[$key] = $val;
        }
        $saved_data["location"] = $saved_data["location"]["display_address"];
        array_push($parsed_data, $saved_data);
    }

    // encode as json and return
    return json_encode($parsed_data);
}


