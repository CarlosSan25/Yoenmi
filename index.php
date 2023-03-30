<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="media\favicon.png" />
    <link rel="stylesheet" href="styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Yoenmi</title>
</head>
<body>
    <div class="d-flex flex-column mt-5 justify-content-center align-items-center container">
        <h1 class="mb-4">Inicio de sesión</h1>
        <form class="d-flex flex-column" method="POST" action="login.php">
            <label for="username">Nombre de usuario</label>
            <input name="username" id="username" type="text"></input>
            <label for="username" class="mt-3">Contraseña</label>
            <input name="password" id="password" type="password"></input>
            <?php
            if(isset($_GET["error"])){
                echo "<div class='alert alert-danger' role='alert'>". $_GET["error"]."</div>";
            }
            ?>
            <button id="submit" type="submit" class="btn btn-success mt-3">Enviar</button>
        </form>
    </div>
<?php

require("classes/class_DB.php");


?>


</body>
</html>