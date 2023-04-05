<?php

require("../db_conn.php");

// Get the input data from the login form

$input_name = $_POST["name"];
$input_username = $_POST["username"];
$input_password = $_POST["password"];
$input_image = $_FILES["image"];

// Validate data
if($input_username == NULL || $input_password == NULL || $input_name == NULL || $input_image['name'] == NULL){
    $error="Debes rellenar todos los campos.";
    header("Location: ../register.php?error=$error&user=$input_username");
} else{

    // Compare data with the database
    $path = "../media/user-uploads/" . basename($input_image['name']);
    
    if(move_uploaded_file($input_image['tmp_name'], $path)) {

    $stmt = $conn->insertUser($input_name, $input_username, $input_password, $path);
        if($stmt){
            $success="Te has registrado.";
            header("Location: ../login.php?success=$success");
        }else{
            $error="Ha habido un error, por favor, inténtelo de nuevo.";
            header("Location: ../register.php?error=$error&user=$input_username");
        }
    } else{
        $error="Ha habido un error al subir tu imagen, inténtelo de nuevo.";
        header("Location: ../register.php?error=$error&user=$input_username");
    }
}

?>