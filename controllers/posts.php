<?php

require("../db_conn.php");


    
    // Make the request of the posts depending on the type
    if($_GET['type'] == "user"){
        $user_id = $_POST['user_id'];
        $result = $conn->getPosts($user_id);
    }else if($_GET['type'] == "all"){
        $user_id = $_POST['user_id'];
        $result = $conn->getAllPosts();
    } else if($_GET['type'] == 'unique'){
        $post_id = $_POST['post_id'];
        $result = $conn->getUniquePost($post_id);
        echo json_encode($result);
        exit();
    } else if($_GET['type'] == 'allScroll'){
        $user_id = $_POST['user_id'];
        $count = $_POST['offset_value'];
        $result = $conn->getAllPostsScroll($count);
    }  else if($_GET['type'] == 'userScroll'){
        $user_id = $_POST['user_id'];
        $count = $_POST['offset_value'];
        $result = $conn->getPostsScroll($user_id, $count);
    }

    // Add count of likes and if its liked by the current user to each post
    for($i=0;$i<count($result);$i++){
        $post_id = $result[$i]['ID'];
        $likes = $conn->countLikes($post_id);
        $result[$i]['likes'] = $likes['COUNT(post_id)'];
        $liked = $conn->comprobarLike($post_id, $user_id);
        $result[$i]['liked'] = $liked;
        $count_comments = $conn->countComments($post_id);
        $result[$i]['count-comm'] = $count_comments['COUNT(post_id)'];
        $comments = $conn->getComments($post_id);
        $result[$i]['comments'] = $comments;

    }

    echo json_encode($result);

?>