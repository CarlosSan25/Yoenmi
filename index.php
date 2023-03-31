<?php

if(isset($_GET["user"])){
    header("Location: welcome.php?user=".$_GET["user"]);
} else{
    header("Location: login.php");
}

?>