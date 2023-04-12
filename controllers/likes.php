<?php

require("../db_conn.php");

if($_GET['type'] == 'like'){
    if(isset($_POST['user_id']) && isset($_POST['post_id'])){
        $result = $conn->insertLike($_POST['post_id'],$_POST['user_id']);
        print_r($result);
    }
} else if($_GET['type'] == 'unlike'){
    if(isset($_POST['user_id']) && isset($_POST['post_id'])){
        $result = $conn->deleteLike($_POST['post_id'],$_POST['user_id']);
        print_r($result);
    }
}


?>