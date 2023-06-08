<?php

require("../db_conn.php");

// Get the input data from the login form

$input_name = $_POST["name"];
$input_mail = $_POST["correo"];
$input_username = $_POST["username"];
$input_password = $_POST["password"];
$input_image = $_FILES["image"];
$input_banner = $_FILES["banner"];

if(isset($_POST["private"])){
    $input_private = 1;
} else{
    $input_private = 0;
}

// Validate data
if($input_username == NULL || $input_password == NULL || $input_name == NULL || $input_image['name'] == NULL || $input_mail == NULL){
    $error="Debes rellenar todos los campos.";
    header("Location: ../views/login/register.php?error=$error&user=$input_username");
} else{
    // Test if the username already exists
    if(!$conn->userExists($input_username)){
        
        $input_images[0] = $input_image;

        if(!empty($input_banner)){
            $input_images[1] = $input_banner;
        };

        $error = '';
        $count = 0;
        foreach ($input_images as $input_image) {
            // Obtain the extension of the image
            $new_name = explode(".",$input_image['name']);

            // Make the path to the Database & for storage
            $path = "../media/user-uploads/" . date('d.m.Y.H.i.s') . "[". $count ."]" . "." . end($new_name);
            $absolute_path[$count] = "http://localhost/yoenmi/media/user-uploads/" . date('d.m.Y.H.i.s') . "[". $count ."]" . "." . end($new_name);

            // Storage the images
            if($error != true){
                if(move_uploaded_file($input_image['tmp_name'], $path)){
                    $error = false;
                } else{
                    $error = true;
                }
            }
            $count++;
        }
        

        if($error != true){
        
            // Query to insert the user data
            $stmt = $conn->insertUser($input_name, $input_username, $input_password, $absolute_path[0], $absolute_path[1], $input_private);
                if($stmt){
                    $success="Te has registrado.";
                    header("Location: ../views/login/login.php?success=$success");
                }else{
                    $error="Ha habido un error, por favor, inténtelo de nuevo.";
                    header("Location: ../views/login/register.php?error=$error&user=$input_username");
                }
        } else{
            $error="Ha habido un error al subir tu imagen o banner, inténtelo de nuevo.";
            header("Location: ../views/login/register.php?error=$error&user=$input_username");
        }
    } else{
        $error="El nombre de usuario ya está en uso. Por favor, escoge otro.";
        header("Location: ../views/login/register.php?error=$error");
    }
}

?>