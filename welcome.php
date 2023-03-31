<?php
require("header.php");
if(!empty($_SESSION["usuario"])){
    echo "<h1>Bienvenido ". $_SESSION["usuario"]." !</h1>";
}else{
    session_destroy();
    header("Location: login.php");
}
?>
<form action="session_close.php"><button type="submit" class="btn btn-danger">Cerrar sesión</button>
</form>