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
} else if($_GET['type'] == 'checkPrivacy'){
    $username = $_POST['username'];
    $stmt = $conn->checkPrivacy($username);
    echo json_encode($stmt);
}else if($_GET['type'] == 'checkFollow'){
    $follower = $_POST['follower'];
    $following = $_POST['following'];
    $stmt = $conn->checkFollow($follower,$following);
    echo json_encode($stmt);
}  else if($_GET['type'] == 'addFriend'){
    $follower = $_POST['follower'];
    $following = $_POST['following'];
    $privacy = $_POST['privacy'];

    if($privacy == 0){
        $stmt = $conn->addFriend($follower, $following, 1, 1);
        echo '1';
    } elseif($privacy == 1){
        $stmt = $conn->addFriend($follower, $following, 0, 0);
        echo '0';
    } else{
        echo 'Ha ocurrido un error';
    }
}  else if($_GET['type'] == 'deleteFriend'){
    if(isset($_POST['follower']) && isset($_POST['following'])){
        $follower = $_POST['follower'];
        $following = $_POST['following'];
    
        $stmt = $conn->deleteFriend($follower, $following);
        print_r($stmt);
    }
} else if($_GET['type'] == 'countFollowers'){
    if(isset($_POST['username'])){
        $username = $_POST['username'];

        $stmt = $conn->countFollowers($username);
        echo json_encode($stmt);
    }
} else if($_GET['type'] == 'countFollowing'){
    if(isset($_POST['username'])){
        $username = $_POST['username'];

        $stmt = $conn->countFollowing($username);
        echo json_encode($stmt);
    }
}

?>