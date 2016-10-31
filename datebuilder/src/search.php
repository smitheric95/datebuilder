<?php
// runs the query on yelp without applying user preferences

function generic_query($query) {
    include "yelp_api.php";

    $yelp_data =  search($query, "Dallas, TX");
//    echo $yelp_data . "</br>";


//    $yelp_data = @file_get_contents($yelp_data);
//    echo $yelp_data . "</br>";
//    return $yelp_data;

    $yelp_data = json_decode($yelp_data, true);
    return var_dump($yelp_data);
//    return $yelp_data;

//    $total = $yelp_data["total"];

    $parsed_data = array();

//    return $yelp_data;


    foreach ($yelp_data["businesses"] as $business) {
//        $business = $yelp_data['businesses'][$i];
        array_push($parsed_data, array(
            "categories" => $business["categories"],
            "display_phone" => $business["display_phone"],
            "id" => $business["id"],
            "image_url" => $business["image_url"],
            "location" => array(),
            "name" => $business["name"],
            "rating" => $business["rating"],
            "url" => $business["url"],
            "snippet_text" => $business["snippet_text"]
        ));

//        foreach ($business["location"]["display_address"] as $address_line) {
//            array_push($parsed_data["location"], $address_line);
//        }
    }



    return $parsed_data;
}

