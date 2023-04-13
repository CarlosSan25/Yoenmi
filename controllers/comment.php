<?php 

require("../db_conn.php");

// Assign recieved data
$post_id = $_POST["post_id"];

//$input_image = $_FILES["image"];

if($_GET['type'] == 'insert'){

    $input_content = $_POST["content"];
    $user_id = $_POST["user_id"];

    // If user didn't insert text, error
    if($input_content == NULL){
        echo "false";
    } else{
        // If user inserted a image
        if(1 == 0){
        //if($input_image['name'] != NULL){
            // Get image extension, to change the name and store it
            $new_name = explode(".",$input_image['name']);
            $path = "../media/user-uploads/" . date('d.m.Y.H.i.s') . "." . end($new_name);
            $absolute_path = "http://localhost/yoenmi/media/user-uploads/" . date('d.m.Y.H.i.s') . "." . end($new_name);
            // Store the image in the server
            if(move_uploaded_file($input_image['tmp_name'], $path)){
                // Store the post in the DB
                $stmt = $conn->insertComment($post_id,$user_id, $input_content, $absolute_path);
                if($stmt){
                    header("Location: ".$_SERVER['HTTP_REFERER']."#form-".$post_id);
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
            $stmt = $conn->insertComment($post_id, $user_id, $input_content, "");
            if($stmt){
                echo "true";
            }else{
                echo "false";
            }
        }
    }
} else if($_GET['type'] == 'get'){
    $result = $conn->getComments($post_id);
    echo json_encode($result);
}

?>