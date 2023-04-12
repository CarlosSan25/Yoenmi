<?php

require("../db_conn.php");

    if($_GET['type'] == "user"){
        $user_id = $_POST['user_id'];
        $result = $conn->getPosts($user_id);
        for($i=0;$i<count($result);$i++){
            $likes = $conn->countLikes($result[$i]['ID']);
            $result[$i]['likes'] = $likes['COUNT(post_id)'];
            $liked = $conn->comprobarLike($result[$i]['ID'], $_POST['user_id']);
            $result[$i]['liked'] = $liked;
        }
    }else if($_GET['type'] == "all"){
        $result = $conn->getAllPosts();
        for($i=0;$i<count($result);$i++){
            $likes = $conn->countLikes($result[$i]['ID']);
            $result[$i]['likes'] = $likes['COUNT(post_id)'];
            $liked = $conn->comprobarLike($result[$i]['ID'], $_POST['user_id']);
            $result[$i]['liked'] = $liked;
        }
    }

    echo json_encode($result);

?>