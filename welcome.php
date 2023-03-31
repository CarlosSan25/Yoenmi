<?php
require("header.php");
if(isset($_GET["user"])){
    echo "<h1>Bienvenido ". $_GET["user"] ." !</h1>";
}else{
    header("Location: login.php");
}

?>