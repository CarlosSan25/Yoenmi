<?php

require("../db_conn.php");

// Get the input data from the login form

$input_username = $_POST["username"];
$input_password = $_POST["password"];

// Validate data
if($input_username == NULL || $input_password == NULL){
    $error="Debes rellenar todos los campos.";
    header("Location: ../views/login/login.php?error=$error&user=$input_username");
} else{

    // Compare data with the database
    $pass = $conn->getPass($input_username);
    if($pass != NULL){
        $phash = new Password;
        if($phash->verify($input_password,$pass["password"])){
            setcookie("usuario", $input_username, time() + 2635200, '/');
            session_start();
            $data = $conn->getUserData($input_username);
            $_SESSION['name'] = $data['Nombre'];
            $_SESSION['image'] = $data['image'];
            $_SESSION['id'] = $data['id'];
            header("Location: ../welcome.php");
        } else{
            $error="Contraseña incorrecta.";
            header("Location: ../views/login/login.php?error=$error&user=$input_username");
        }
    }else{
        $error="Usuario o contraseña no válidos.";
        header("Location: ../views/login/login.php?error=$error&user=$input_username");
    }
}

?>