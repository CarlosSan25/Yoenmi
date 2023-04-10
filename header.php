<?php

if(!isset($_SESSION["usuario"])){
    require('db_conn.php');
    session_start();
    $data = $conn->getUserData($_COOKIE["usuario"]);
    $_SESSION['name'] = $data['Nombre'];
    $_SESSION['image'] = $data['image'];
    $_SESSION['id'] = $data['ID'];
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script src="jquery-3.6.4.min.js"></script>
    <script src="main.js"></script>
    <link rel="icon" type="image/x-icon" href="media/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Red Social - Yoenmi</title>
</head>
<body>
    <div class="row">
        <div class="col-3 d-flex flex-column left-side" style="padding: 30px;height: 100vh;z-index:9;">
            <div class="logo">
                <a href="welcome.php" class="d-flex align-items-center">
                    <img src="media\Logo Aplicación Blanco.png" width="70px" alt="">
                    <span class="logo-text">Yoenmi</span>
                </a>
            </div>
            <div class="user">
                <div class="profile-pic" style="background-image:url('<?php echo $_SESSION['image']; ?>')"></div>
                <span class="name"><?php echo $_SESSION['name']; ?></span><span class="username">@<?php echo $_COOKIE["usuario"]; ?></span>
            </div>
            <div class="menu-left">
                <div class="d-flex active"><img class="ico" src="media\hogar.svg"><span>Home</span></div>
                <div class="d-flex"><img class="ico" src="media\calendario.svg"><span>Latest</span></div>
                <div class="d-flex"><img class="ico" src="media\globo.svg"><span>Explore</span></div>
                <div class="d-flex"><img class="ico" src="media\hogar.svg"><span>News Feed</span></div>
                <div class="d-flex"><img class="ico" src="media\hogar.svg"><span>Marketplace</span></div>
            </div>
        </div>
        <div class="col-9 d-flex flex-column">
            <div class="top p-4 row d-flex">
                <input class="col-5 search p-2" placeholder="Search..."></input>
                <div class="col-1"></div>
                <div class="col-2 d-flex top-right">
                    <div class="bell"><img class="ico" src="media\notificacion.png" alt=""></div>
                    <div class="not"><img class="ico" src="media\mensaje.png" alt=""></div>
                    <div class="profile-pic profile" style="width:45px !important; height:45px !important;background-image: url('<?php echo $_SESSION['image']; ?>')"></div>
                </div>
                <div class="col-1"></div>
                <div class="col-1 d-flex" style="margin-top: 5px;">
                    <div class="daynight">
                        <label for="light_mode">
                        <input type="checkbox" name="light_mode" id="light_mode">
                        <div class="toggle">
                            <div class="cloud"></div>
                            <div class="star"></div>
                            <div class="sea"></div>
                            <div class="mountains"></div>
                        </div>
                        </label>
                    </div>
                </div>
                <div class="col-1"></div>
                <div class="col-1 top-right">
                    <div class="dropdown" style="width:45px;">
                        <a class="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false" style="width:45px; position:relative; cursor:pointer;">
                            <img class="ico" src="media\ajustes.png" alt="">
                        </a>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            <li><a class="dropdown-item" href="session_close.php" style="color:red !important;">Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </div>
            </div>