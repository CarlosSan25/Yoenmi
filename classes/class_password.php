<?php

// Define class password to handle password encrypt

class Password {
    public static function hash($password) {
        return password_hash($password, PASSWORD_DEFAULT, ['cost' => 12]);
    }
    public static function verify($password, $hash) {
        return password_verify($password, $hash);
    }
}

?>