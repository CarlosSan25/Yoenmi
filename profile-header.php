<?php

if(isset($_GET['user'])){
    $username = $_GET['user'];
} else{
    header("Location: index.php");
    die();
}

?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script src="jquery-3.6.4.min.js"></script>
    <link rel="icon" type="image/x-icon" href="media/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <!-- jQuery Modal -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-modal/0.9.1/jquery.modal.min.css" />
    <title>Red Social - Yoenmi</title>
</head>
<body>
    <div id="username" style="display: none;"><?php echo $username ?></div>
    <a href="#" class="scroll-top" title="Ir arriba">
        <img src="media/up.png" height="20px;"></img>
    </a>
    <div class="row">
        <div class="col-3 d-flex flex-column left-side" style="padding: 30px;">
            <div class="d-flex flex-column" style="gap: 20px; width: 22vw; position:fixed;">
                <div class="logo">
                    <a href="welcome.php" class="d-flex align-items-center">
                        <img src="media\Logo Aplicación Blanco.png" width="70px" alt="">
                        <span class="logo-text">Yoenmi</span>
                    </a>
                </div>
                <?php
                
                if(isset($_COOKIE["usuario"])){
                    if(!isset($_SESSION["usuario"])){
                        require('db_conn.php');
                        session_start();
                        $data = $conn->getUserData($_COOKIE["usuario"]);
                        $_SESSION['name'] = $data['Nombre'];
                        $_SESSION['image'] = $data['avatar'];
                        $_SESSION['id'] = $data['ID'];

                        echo '<a style="color:white;" href="profile.php?user='.$_COOKIE["usuario"].'"><div class="user"><div class="profile-pic" style="background-image:url('. $_SESSION['image'].')"></div><span class="name">'.$_SESSION["name"].'<span><span class="username"> @'. $_COOKIE["usuario"].'</span></div></a>';
                    }
                }
                
                ?>
                <div class="menu-left">
                    <div id="home" class="d-flex"><img class="ico" src="media\hogar.svg"><span>Home</span></div>
                    <div id="latest" class="d-flex"><img class="ico" src="media\calendario.svg"><span>Latest</span></div>
                    <div id="explore" class="d-flex"><img class="ico" src="media\globo.svg"><span>Explore</span></div>
                    <div id="news" class="d-flex"><img class="ico" src="media\hogar.svg"><span>News Feed</span></div>
                    <div id="market" class="d-flex"><img class="ico" src="media\hogar.svg"><span>Marketplace</span></div>
                </div>
            </div>
        </div>
        <div id="user_id" style="display: none;"><?php echo $_SESSION['id']; ?></div>
        <div class="col-9 d-flex flex-column">
            <div class="top p-4 row d-flex">
                <input class="col-5 search p-2" placeholder="Search..."></input>
                <div class="col-1"></div>
                <div class="col-2 d-flex top-right">
                    <div class="bell"><img class="ico" src="media\notificacion.png" alt=""></div>
                    <div class="not"><img class="ico" src="media\mensaje.png" alt=""></div>
                    <?php
                    if(isset($_COOKIE["usuario"])){
                        echo '<a href="profile.php?user='. $_COOKIE["usuario"].'"><div class="profile-pic profile" style="width:45px !important; height:45px !important;background-image: url('. $_SESSION['image'] .')"></div></a>';
                    }
                    ?>

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
                    <div class="dropdown-toggle" style="width:45px;cursor:pointer;">
                            <img class="ico" src="media\ajustes.png" alt="">
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                            <li><a class="dropdown-item" href="#">Another action</a></li>
                            <li><a class="dropdown-item" href="#">Something else here</a></li>
                            <li><a class="dropdown-item" href="session_close.php" style="color:red !important;">Cerrar Sesión</a></li>
                        </ul>
                    </div>
                </div>
            </div>