<?php

require("class_password.php");

// Database Class

class DB{

    private $host;
    private $dbname;
    private $dbuser;
    private $dbpasswd;
    private $conn;

    public function __construct($h, $n, $u, $p){
        $this->host = $h;
        $this->dbname = $n;
        $this->dbuser = $u;
        $this->dbpasswd = $p;
    }

    public function dbconn(){
        if(isset($this->host) && isset($this->dbname) && isset($this->dbuser) && isset($this->dbpasswd)){
            try{
                $this->conn = new PDO("mysql:host=$this->host;dbname=$this->dbname","$this->dbuser","$this->dbpasswd");
            }catch(PDOException $e){
                echo "Error: $e";
            }
        }else{
            echo "Error Database connection";
        }
    }

    public function query($statement){
        $stmt = $this->conn->prepare($statement);
        $stmt->execute();
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getPass($username){
        $stmt = $this->conn->prepare("SELECT password FROM users WHERE username='$username';");
        $stmt->execute();
        $password = $stmt->fetch(PDO::FETCH_ASSOC);
        return $password;
    }

    public function insertUser($n, $u, $p, $i, $b, $pr){
        $phash = new Password;
        $password = $phash->hash($p);
        $stmt = $this->conn->prepare("INSERT INTO users (nombre, username, password, avatar, banner, private) VALUES ('$n','$u','$password', '$i', '$b', '$pr');");
        return $stmt->execute();
    }

    public function userExists($username){
        $query = "SELECT username FROM users WHERE username='$username';";
        $result = $this->query($query);
        if(empty($result)){return false;} else {return true;}
    }

    public function getUserData($username){
        $query = "SELECT * FROM users WHERE username='$username';";
        $result = $this->query($query);
        return $result;
    }

    public function insertPost($user_id, $content, $image1, $image2, $image3, $image4, $map){
        $query = "INSERT INTO posts (user_id, content, image, image2, image3, image4, map) VALUES ('$user_id', '$content', '$image1', '$image2', '$image3', '$image4', '$map');";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute();
    }

    public function getPosts($user_id){
        $query = "SELECT posts.*, users.Nombre, users.username, users.avatar FROM posts, users WHERE users.ID = '$user_id' AND users.ID = posts.user_id ORDER BY `date` DESC LIMIT 0, 5;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getPostsScroll($user_id, $offset_value){
        $query = "SELECT posts.*, users.Nombre, users.username, users.avatar FROM posts, users WHERE users.ID = '$user_id' AND users.ID = posts.user_id ORDER BY `date` DESC LIMIT $offset_value, 5;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getAllPosts(){
        $query = "SELECT posts.*, users.Nombre, users.username, users.avatar FROM posts, users WHERE users.ID = posts.user_id ORDER BY `date` DESC LIMIT 0, 5;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getAllPostsScroll($offset_value){
        $query = "SELECT posts.*, users.Nombre, users.username, users.avatar FROM posts, users WHERE users.ID = posts.user_id ORDER BY `date` DESC LIMIT $offset_value, 5;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function getUniquePost($post_id){
        $query = "SELECT * FROM posts WHERE ID = '$post_id' ORDER BY `date` DESC;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function deletePost($post_id){
        $query = "DELETE FROM posts WHERE ID = '$post_id';";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){return "true";} else {return "false";}
    }

    public function editPost($post_id, $content, $image, $image2, $image3, $image4){
        $query = "UPDATE posts SET content='$content', image='$image', image2='$image2', image3='$image3', image4='$image4', edited='1' WHERE ID = '$post_id';";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){return "true";} else {return "false";}
    }

    public function countLikes($post_id){
        $query = "SELECT COUNT(post_id) FROM likes WHERE post_id = $post_id";
        $result = $this->query($query);
        return $result;
    }

    public function insertLike($post_id, $user_id){
        $query = "INSERT INTO likes (user_id, post_id) VALUES ('$user_id', '$post_id');";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){return true;} else {return false;}
    }

    public function deleteLike($post_id, $user_id){
        $query = "DELETE FROM likes WHERE user_id = '$user_id' AND post_id = '$post_id';";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){return true;} else {return false;}
    }

    public function comprobarLike($post_id, $user_id){
        $query = "SELECT COUNT(post_id) FROM likes WHERE post_id = '$post_id' && user_id = '$user_id';";
        $result = $this->query($query);
        if($result['COUNT(post_id)']>0){return 1;} else {return 0;}
    }

    public function getLikes($post_id){
        $query = "SELECT likes.date, users.Nombre, users.username, users.avatar FROM users, likes WHERE likes.user_id = users.ID AND likes.post_id = '$post_id' ORDER BY likes.date DESC;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function countComments($post_id){
        $query = "SELECT COUNT(post_id) FROM comments WHERE post_id = $post_id";
        $result = $this->query($query);
        return $result;
    }

    public function getComments($post_id){
        $query = "SELECT comments.ID, comments.date, comments.content, comments.image, users.Nombre, users.username, users.avatar FROM users, comments WHERE comments.user_id = users.ID AND comments.post_id = '$post_id' ORDER BY comments.date ASC;";
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $result;
    }

    public function insertComment($post_id, $user_id, $content, $image){
        $query = "INSERT INTO comments (post_id, user_id, content, image) VALUES ('$post_id','$user_id', '$content', '$image');";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute();
    }

    public function deleteComment($comment_id){
        $query = "DELETE FROM comments WHERE ID = '$comment_id';";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){return 'true';} else {return 'false';}
    }

    public function updatePhoto($user_id,$url){
        $query = "UPDATE users SET avatar='$url' WHERE ID = '$user_id';";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){return "true";} else {return "false";}
    }

    public function updateBanner($user_id,$url){
        $query = "UPDATE users SET banner='$url' WHERE ID = '$user_id';";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){return "true";} else {return "false";}
    }

    public function addFriend($follower, $following, $formalised, $viewed){
        $query = "INSERT INTO friends (follower, following, formalised, viewed) VALUES ('$follower','$following', '$formalised', '$viewed');";
        $stmt = $this->conn->prepare($query);
        return $stmt->execute();
    }

    public function deleteFriend($follower, $following){
        $query = "DELETE FROM friends WHERE follower = '$follower' AND following = '$following';";
        $stmt = $this->conn->prepare($query);
        if($stmt->execute()){return true;} else {return false;}
    }

    public function checkPrivacy($username){
        $query = "SELECT private FROM users WHERE username = '$username';";
        $result = $this->query($query);
        return $result;
    }

    public function checkFollow($follower, $following){
        $query = "SELECT * FROM friends WHERE follower = '$follower' AND following = '$following';";
        $result = $this->query($query);
        return $result;
    }

    public function countFollowers($following){
        $query = "SELECT count(follower) FROM friends WHERE following = '$following' AND formalised = '1';";
        $result = $this->query($query);
        return $result;
    }

    public function countFollowing($follower){
        $query = "SELECT count(following) FROM friends WHERE follower = '$follower' AND formalised = '1';";
        $result = $this->query($query);
        return $result;
    }
}

?>