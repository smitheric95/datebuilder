<?php
// runs the query on yelp without applying user preferences

function generic_query($query) {
    include "yelp_api.php";

    return search($query, "Dallas, TX");
}

