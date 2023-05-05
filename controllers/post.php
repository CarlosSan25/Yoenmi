<?php 

require("../db_conn.php");

error_reporting(0);

if($_GET['type'] == 'post'){
    // Assign recieved data
    $input_content = $_POST["content"];
    $user_id = $_POST["id"];
    $input_image = $_FILES["image"];
    $map = $_POST['input-map'];
    $backPage = explode("?",$_SERVER['HTTP_REFERER'])[0];

    $error_codes = ['The uploaded file exceeds the upload_max_filesize directive in php.ini', 'The uploaded file exceeds the MAX_FILE_SIZE directive that was specified in the HTML form', 'The uploaded file was only partially uploaded', 'No file was uploaded', 'Missing a temporary folder', 'Failed to write file to disk', 'A PHP extension stopped the uploading process'];

    // If user didn't insert text, error
    if($input_content == NULL){
        $error = "Debes introducir algo de texto.";
        header("Location: ../welcome.php?error=$error");
    } else{
        $ap_images = ["", "", "",""];
        $p_images = ["", "", "",""];
        // If user inserted a image
        if(strlen($input_image['name'][0]) > 0){
            // Prove image uploads error
            $image_error = false;
            for($i=0;$i<count($input_image['error']);$i++){
                if($input_image['error'][$i] != 0){
                    switch ($input_image['error'][$i]){
                        case '1':
                            $error = "Ha habido un error al subir una imagen: ".$error_codes[0];
                            $image_error = true;
                            break;

                        case '2':
                            $error = "Ha habido un error al subir una imagen: ".$error_codes[1];
                            $image_error = true;
                            break;
                        
                        case '3':
                            $error = "Ha habido un error al subir una imagen: ".$error_codes[2];
                            $image_error = true;
                            break; 
                        case '4':
                            $error = "Ha habido un error al subir una imagen: ".$error_codes[3];
                            $image_error = true;
                            break;
                        case '5':
                            $error = "Ha habido un error al subir una imagen: ".$error_codes[4];
                            $image_error = true;
                            break;
                        case '6':
                            $error = "Ha habido un error al subir una imagen: ".$error_codes[5];
                            $image_error = true;
                            break;
                        case '6':
                            $error = "Ha habido un error al subir una imagen: ".$error_codes[6];
                            $image_error = true;
                            break;
                        case '7':
                            $error = "Ha habido un error al subir una imagen: ".$error_codes[7];
                            $image_error = true;
                            break;
                    }
                }
            }
            // Get image extension, to change the name and store it
            if($image_error == false){
                for($i=0; $i<count($input_image['name']) && $i<4; $i++){
                    $new_name = explode(".",$input_image['name'][$i]);
                    $p_images[$i] = "../media/user-uploads/" . date('d.m.Y.H.i.s') . "[" . $i . "]" . "." . end($new_name);
                    $ap_images[$i] = "http://localhost/yoenmi/media/user-uploads/" . date('d.m.Y.H.i.s') . "[" . $i . "]" . "." . end($new_name);
                    
                    // Store the image in the server
                    if(move_uploaded_file($input_image['tmp_name'][$i], $p_images[$i])){
                        $stmt = $conn->insertPost($user_id, $input_content, $ap_images[0], $ap_images[1], $ap_images[2], $ap_images[3], '');
                        if($stmt){
                            $success="Post publicado con foto.";
                            header("Location: ".$backPage."?success=$success");
                        }else{
                            $error="Ha habido un error, por favor, inténtelo de nuevo.";
                            header("Location: ".$backPage."?error=$error&content=$input_content");
                        }
                            // Store the post in the DB
                    } else {
                        $error = "Ha habido un error al subir la imagen. Por favor, inténtalo de nuevo.";
                    header("Location: ".$backPage."?error=$error");
                    }
                }
            } else{
                header("Location: ".$backPage."?error=$error");
            }
            
        } else{
            // Insert the post without images
            echo $user_id;
            echo $input_content;
            var_dump($ap_images);
            $stmt = $conn->insertPost($user_id, $input_content, '', '', '', '',$map);
            if($stmt){
                $success="Post publicado.";
                header("Location: ".$backPage."?success=$success");
            }else{
                $error="Ha habido un error, por favor, inténtelo de nuevo.";
                header("Location: ".$backPage."?error=$error&content=$input_content");
            }
        }
    }
    } else if($_GET['type'] == 'delete'){
        $post_id = $_POST['post_id'];
        $result = $conn->deletePost($post_id);
        echo $result;
    } else if($_GET['type'] == 'edit'){

        $data = json_decode($_POST['data']);
        $post_id = $data ->post_id;
        $content = $data->content;
        $eImages = json_decode($data->eimages);
        $images = $_FILES['images'];
        $images_size = count($images['name']);
        $ap_images = ['', '', '', ''];
        if(count($eImages)>0){
            for($i=0;$i<count($eImages);$i++){
                $ap_images[$i] = $eImages[$i];
            }
        }

        $max_images = 4-count($eImages);

        if(strlen($images['name'][0]) > 0){
            for($i=0; $i<$max_images;$i++){
                $new_name = explode(".",$images['name'][$i]);
                $p_images[$i] = "../media/user-uploads/" . date('d.m.Y.H.i.s') . "[" . $i . "]" . "." . end($new_name);
                $ap_images[count($eImages)+$i] = "http://localhost/yoenmi/media/user-uploads/" . date('d.m.Y.H.i.s') . "[" . $i . "]" . "." . end($new_name);
                // Store the image in the server
                if(move_uploaded_file($images['tmp_name'][$i], $p_images[$i])){
                    $stmt = $conn->editPost($post_id, $content, $ap_images[0], $ap_images[1], $ap_images[2], $ap_images[3]);
                    if($stmt){
                        $done[$i] = 'true';
                    }
                }
            }
            if(count($done) == $images_size){
                echo 'true';
            }
        }else{
            $stmt = $conn->editPost($post_id, $content, $ap_images[0], $ap_images[1], $ap_images[2], $ap_images[3]);
            if($stmt){
                echo "true";
            }else{
                echo "false";
            }
        }
    }
?>