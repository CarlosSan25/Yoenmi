<?php

require("db_conn.php");

// Get the input data from the login form
$input_username = $_POST["username"];
$input_password = $_POST["password"];

$query = $conn->query("SELECT username, password FROM users WHERE username='$input_username';");

if($input_username == $query["username"] && $input_password == $query["password"]){
    header("Location: welcome.php");
} else{
    
    $error="Usuario o contraseña no válidos.";
    header("Location: index.php?error='$error'");
}

?>