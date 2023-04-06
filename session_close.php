<?php

if(isset($_COOKIE["usuario"])){
    setcookie("usuario","",time()-60, '/');
    session_destroy();
    header("Location: views\login\login.php");
}else{
    session_destroy();
    header("Location: views\login\login.php");
}

?>