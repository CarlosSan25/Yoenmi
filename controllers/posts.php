<?php

require("../db_conn.php");
    
    $user_id = $_POST['user_id'];
    
    // Make the request of the posts depending on the type
    if($_GET['type'] == "user"){
        $result = $conn->getPosts($user_id);
    }else if($_GET['type'] == "all"){
        $result = $conn->getAllPosts();
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