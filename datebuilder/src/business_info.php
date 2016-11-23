<?php

function business_info($businessid) {
	require_once("yelp_api.php");

	$yelp_data = get_business($businessid);
  #echo $yelp_data;

	// decode returned json, ignore everything but businesses
  $yelp_data = json_decode($yelp_data, true);
  $desired_keys = array("categories", "display_phone", "id", "image_url", "location", "name", "rating", "url", "snippet_text");
  // parse yelp_data by key
  $saved_data = array();
  foreach ($yelp_data as $key => $val)
  {
  	if (in_array($key, $desired_keys))
  	{
      if($key == "location")
      {
        $saved_data[$key] = $val["display_address"];
      }
      else
      {
  		  $saved_data[$key] = $val;
      }
  	}
  }
  #$saved_data["location"] = $saved_data["location"]["display_address"];
  #array_push($parsed_data, $saved_data);

  return json_encode($saved_data);

}
