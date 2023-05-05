<?php

require("../db_conn.php");

if($_GET['type'] == 'getData'){
    $username = $_POST['user'];

    $result = $conn->getUserData($username);
    
    echo json_encode($result);
} else if($_GET['type'] == 'updatePhoto' || $_GET['type'] == 'updateBanner'){
    $user_id = $_POST['user_id'];
    $input_image = $_FILES['image'];

    if($user_id != NULL && $input_image != NULL){

        // Obtain the extension of the image
        $new_name = explode(".",$input_image['name']);

        // Make the path to the Database & for storage
        $path = "../media/user-uploads/" . date('d.m.Y.H.i.s') . "." . end($new_name);
        $absolute_path = "http://localhost/yoenmi/media/user-uploads/" . date('d.m.Y.H.i.s') . "." . end($new_name);

        // Storage the image
        if(move_uploaded_file($input_image['tmp_name'], $path)){
            if($_GET['type'] == 'updatePhoto'){
                // Query to insert the user data
                $stmt = $conn->updatePhoto($user_id, $absolute_path);
                if($stmt){
                    echo 'success';
                }else{ echo 'error'; }
            } else if($_GET['type'] == 'updateBanner'){
                // Query to insert the user data
                $stmt = $conn->updateBanner($user_id, $absolute_path);
                if($stmt){
                    echo 'success';
                }else{ echo 'error'; }
            }
        }
    } else{ echo 'error'; }
}

?>