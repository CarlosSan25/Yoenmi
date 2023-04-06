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
    header("Location: ../views/login/register.php?error=$error&user=$input_username");
} else{
    // Test if the username already exists
    if(!$conn->userExists($input_username)){
        
        // Path where store user image
        $path = "../media/user-uploads/" . basename($input_image['name']);
        $absolute_path = "http://localhost/yoenmi/media/user-uploads/" . basename($input_image['name']);
        
        // Store the image
        if(move_uploaded_file($input_image['tmp_name'], $path)) {
        
            // Query to insert the user data
            $stmt = $conn->insertUser($input_name, $input_username, $input_password, $absolute_path);
                if($stmt){
                    $success="Te has registrado.";
                    header("Location: ../views/login/login.php?success=$success");
                }else{
                    $error="Ha habido un error, por favor, inténtelo de nuevo.";
                    header("Location: ../views/login/register.php?error=$error&user=$input_username");
                }
        } else{
            $error="Ha habido un error al subir tu imagen, inténtelo de nuevo.";
            header("Location: ../views/login/register.php?error=$error&user=$input_username");
        }
    } else{
        $error="El nombre de usuario ya está en uso. Por favor, escoge otro.";
        header("Location: ../views/login/register.php?error=$error");
    }
}

?>