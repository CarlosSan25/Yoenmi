<?php 

require("../db_conn.php");

if($_GET['type'] == 'post'){
    // Assign recieved data
    $input_content = $_POST["content"];
    $user_id = $_POST["id"];
    $input_image[] = $_FILES["image"];

    // If user didn't insert text, error
    if($input_content == NULL){
        $error = "Debes introducir algo de texto.";
        header("Location: ../welcome.php?error=$error");
    } else{
        // If user inserted a image
        if(count($input_image[0]['name']) > 0){
            // Get image extension, to change the name and store it
            $ap_images = ["", "", "",""];
            $p_images = ["", "", "",""];
            
            for($i=0; $i<count($input_image[0]['name']) && $i<4; $i++){
                $new_name = explode(".",$input_image[0]['name'][$i]);
                $p_images[$i] = "../media/user-uploads/" . date('d.m.Y.H.i.s') . "[" . $i . "]" . "." . end($new_name);
                $ap_images[$i] = "http://localhost/yoenmi/media/user-uploads/" . date('d.m.Y.H.i.s') . "[" . $i . "]" . "." . end($new_name);
                
                // Store the image in the server
                if(move_uploaded_file($input_image[0]['tmp_name'][$i], $p_images[$i])){
                        $done = true;
                        // Store the post in the DB
                } else {
                        $done = false;
                        break;
                }
            }
            if($done == false){
                    $error = "Ha habido un error al subir la imagen. Por favor, inténtalo de nuevo.";
                    header("Location: ".$_SERVER['HTTP_REFERER']."?error=$error");
            } else if($done == true){
                $stmt = $conn->insertPost($user_id, $input_content, $ap_images[0], $ap_images[1], $ap_images[2], $ap_images[3]);
                if($stmt){
                    $success="Post publicado con foto.";
                    header("Location: ".$_SERVER['HTTP_REFERER']."?success=$success");
                }else{
                    $error="Ha habido un error, por favor, inténtelo de nuevo.";
                    header("Location: ".$_SERVER['HTTP_REFERER']."?error=$error&content=$input_content");
                }
            }
        } else{
            // Insert the post without images
            $stmt = $conn->insertPost($user_id, $input_content, $ap_images[0], $ap_images[1], $ap_images[2], $ap_images[3]);
            if($stmt){
                $success="Post publicado.";
                header("Location: ".$_SERVER['HTTP_REFERER']."?success=$success");
            }else{
                $error="Ha habido un error, por favor, inténtelo de nuevo.";
                header("Location: ".$_SERVER['HTTP_REFERER']."?error=$error&content=$input_content");
            }
        }
    }
    } else if($_GET['type'] == 'delete'){
        $post_id = $_POST['post_id'];
        $result = $conn->deletePost($post_id);
        echo $result;
    } else if($_GET['type'] == 'edit'){
        $post_id = $_POST['post_id'];
        $content = $_POST['content'];
        $result = $conn->editPost($post_id, $content);
        echo $result;
    }

?>