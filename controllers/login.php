<?php

require("../db_conn.php");

// Get the input data from the login form

$input_username = $_POST["username"];
$input_password = $_POST["password"];

// Validate data
if($input_username == NULL || $input_password == NULL){
    $error="Debes rellenar todos los campos.";
    header("Location: ../login.php?error=$error&user=$input_username");
} else{

    // Compare data with the database
    $pass = $conn->getPass($input_username);
    if($pass != NULL){
        $phash = new Password;
        if($phash->verify($input_password,$pass["password"])){
            header("Location: ../welcome.php?user=$input_username");
        } else{
            $error="Contraseña incorrecta.";
            header("Location: ../login.php?error=$error&user=$input_username");
        }
    }else{
        $error="Usuario o contraseña no válidos.";
        header("Location: ../login.php?error=$error&user=$input_username");
    }
}

?>