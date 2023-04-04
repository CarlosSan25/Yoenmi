<?php

if(isset($_COOKIE["usuario"])){
    setcookie("usuario","",time()-60, '/');
    header("Location: login.php");
}else{
    header("Location: login.php");
}

?>