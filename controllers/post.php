<?php 

require("../db_conn.php");
$input_content = $_POST["content"];
$user_id = $_POST["id"];
$input_image = $_FILES["image"];

if($input_content == NULL){
    $error = "Debes introducir algo de texto.";
    header("Location: ../welcome.php?error=$error");
} else{
    if($input_image['name'] != NULL){
        $new_name = explode(".",$input_image['name']);
        $path = "../media/user-uploads/" . date('d.m.Y.H.i.s') . "." . end($new_name);
        $absolute_path = "http://localhost/yoenmi/media/user-uploads/" . date('d.m.Y.H.i.s') . "." . end($new_name);
        if(move_uploaded_file($input_image['tmp_name'], $path)){
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