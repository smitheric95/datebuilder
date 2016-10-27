<?php
// salty.php holds functions for salting passwords

function get_new_salt () {
    $length = 16;
    $salt = mcrypt_create_iv($length, MCRYPT_DEV_URANDOM);
    return $salt;
}

function salt_password($password, $salt) {
    return crypt($password, $salt);
}