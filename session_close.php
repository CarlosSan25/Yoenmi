<?php
session_start();
if(!empty($_SESSION["usuario"])){
    session_destroy();
    header("Location: login.php");
}else{
    header("Location: login.php");
}

?>