<?php 

require("../db_conn.php");

$input_content = $_POST["content"];
$input_image = $_POST["image"];
$user_id = $_POST["id"];

if($input_content == NULL){
    $error = "Debes introducir algo de texto.";
    header("Location: ../welcome.php?error=$error");
} else{
    if($input_image['name'] != NULL){
        $path = "../media/user-uploads/" . basename($input_image['name']);
        $absolute_path = "http://localhost/yoenmi/media/user-uploads/" . basename($input_image['name']);
        if(move_uploaded_file($input_image['tmp_name'], $path)){
            $stmt = $conn->insertPost($user_id, $input_content, $absolute_path);
            if($stmt){
                $success="Post publicado.";
                header("Location: ../welcome.php?success=$success");
            }else{
                $error="Ha habido un error, por favor, inténtelo de nuevo.";
                header("Location: ../welcome.php?error=$error&content=$input_content");
            }
        } else {
            $error = "Ha habido un error al subir la imagen. Por favor, inténtalo de nuevo.";
            header("Location: ../welcome.php?error=$error");
        }

    } else{
        $stmt = $conn->insertPost($user_id, $input_content, "");
        if($stmt){
            $success="Post publicado.";
            header("Location: ../welcome.php?success=$success");
        }else{
            $error="Ha habido un error, por favor, inténtelo de nuevo.";
            header("Location: ../welcome.php?error=$error&content=$input_content");
        }
    }
}
?>