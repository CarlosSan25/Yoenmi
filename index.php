<?php

// Silence Is Golden.

if(isset($COOKIE["usuario"])){
    header("Location: welcome.php?user=".$COOKIE["user"]);
} else{
    header("Location: views\login\login.php");
}

?>