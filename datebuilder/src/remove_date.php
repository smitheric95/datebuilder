<?php

function delete_date($user_id, $date_id) {

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
        // $sql = "DELETE FROM {$table_name} WHERE date_id = '$date_id' AND user_id = '$user_id';
        //         DELETE FROM {$subtable_name} WHERE date_id = '$date_id'";
        $sql = "SELECT * FROM {$table_name} WHERE date_id = '$date_id' AND user_id = '$user_id'";

        if ($result = $conn->query($sql)) {
            if ($result->num_rows > 0 ) {
                $sql = "DELETE FROM {$subtable_name} WHERE date_id = '$date_id';
                        DELETE FROM {$table_name} WHERE date_id = '$date_id' AND user_id = '$user_id'";
                if ($conn->multi_query($sql)) {
                    return True;
                } else {
                    return "Error removing date: " . $conn->error . $conn->errno;
                }
            } else {
                return "Date does not exist.";
            }
        } else {
            return "Error finding date: " . $conn->error;
        }
    } else {
        return "Invalid input.";
    }
}
?>
