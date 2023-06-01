<?php

include('db_conn.php');

if(isset($_COOKIE["usuario"])){
    setcookie("usuario","",time()-60, '/');
    $test = $conn->setUserOffline($_SESSION['id']);
    session_destroy();
    header("Location: views\login\login.php?error=$test");
}else{
    $test = $conn->setUserOffline($_SESSION['id']);
    session_destroy();
    header("Location: views\login\login.php?error=$test");
}

?>