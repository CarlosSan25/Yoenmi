<?php
session_start();
if(!empty($_SESSION["usuario"])){
    header("Location: welcome.php");
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="media\favicon.ico" />
    <link rel="stylesheet" href="styles.css" />
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <script src="main.js"></script>
    <title>Yoenmi</title>
</head>
<body>
    <section class="background">
        <div class='air air1'></div>
        <div class='air air2'></div>
        <div class='air air3'></div>
        <div class='air air4'></div>
        <div class="row">
            <div class="col-3"></div>
            <div class="col-9" style="position: relative;">
                <img src="media\cloud.png" class="cloud cloud1"></img>
                <img src="media\cloud2.png" class="cloud cloud2"></img>
                <img src="media\cloud3.png" class="cloud cloud3"></img>
                <div class="d-flex login-main">
                    <img src="media\Logo Aplicación Blanco.png"></img>
                    <h1>Yoenmi</h1>
                </div>
            </div>
        </div>
    </section>