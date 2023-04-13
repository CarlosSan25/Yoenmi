<?php 

require("../db_conn.php");

// Assign recieved data
$input_content = $_POST["content"];
$user_id = $_POST["id"];
$input_image = $_FILES["image"];

// If user didn't insert text, error
if($input_content == NULL){
    $error = "Debes introducir algo de texto.";
    header("Location: ../welcome.php?error=$error");
} else{
    // If user inserted a image
    if($input_image['name'] != NULL){
        // Get image extension, to change the name and store it
        $new_name = explode(".",$input_image['name']);
        $path = "../media/user-uploads/" . date('d.m.Y.H.i.s') . "." . end($new_name);
        $absolute_path = "http://localhost/yoenmi/media/user-uploads/" . date('d.m.Y.H.i.s') . "." . end($new_name);
        // Store the image in the server
        if(move_uploaded_file($input_image['tmp_name'], $path)){
            // Store the post in the DB
            $stmt = $conn->insertPost($user_id, $input_content, $absolute_path);
            if($stmt){
                $success="Post publicado con foto.";
                header("Location: ".$_SERVER['HTTP_REFERER']."?success=$success");
            }else{
                $error="Ha habido un error, por favor, inténtelo de nuevo.";
                header("Location: ".$_SERVER['HTTP_REFERER']."?error=$error&content=$input_content");
            }
        } else {
            $error = "Ha habido un error al subir la imagen. Por favor, inténtalo de nuevo.";
            header("Location: ".$_SERVER['HTTP_REFERER']."?error=$error");
        }

    } else{
        // Insert the post without image
        $stmt = $conn->insertPost($user_id, $input_content, "");
        if($stmt){
            $success="Post publicado sin foto.";
            header("Location: ".$_SERVER['HTTP_REFERER']."?success=$success");
        }else{
            $error="Ha habido un error, por favor, inténtelo de nuevo.";
            header("Location: ".$_SERVER['HTTP_REFERER']."?error=$error&content=$input_content");
        }
    }
}
?>