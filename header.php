<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="media\favicon.ico" />
    <link rel="stylesheet" href="styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Yoenmi</title>
</head>
<body>
    <header>       
        <div class="p-2 bg-primary">
            <div class="items-cont gx-5 ms-2 row border-bottom border-white p-2">
                <div class="menu-item col-4" scope="col"><a href="login.php">Iniciar Sesión</a></div>
                <div class="menu-item col-4" scope="col"><a href="register.php">Registrarse</a></div>
                <div class="menu-item col-4" scope="col"><a href="welcome.php">Welcome</a></div>
                <?php
                session_start();
                if(!empty($_SESSION["usuario"])){
                    echo "<div class='ms-3 menu-item' scope='col'><a style='color:red;' href='session_close.php'>Cerrar Sesión</a></div>";
                }
                ?>
            </div>
    </header>