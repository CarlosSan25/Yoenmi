<?php
if(!isset($_COOKIE["usuario"])){
    setcookie("usuario", "", time()-1);
    header("Location: login.php");
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="styles.css">
    <script src="main.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    <title>Welcome</title>
</head>
<body>
    <div class="row">
        <div class="col-3 d-flex flex-column left-side" style="padding: 30px;">
            <div class="logo d-flex align-items-center">
                <img src="media\Logo Aplicación Blanco.png" width="70px" alt="">
                <span style="font-size: 40px; margin-left: 5px;">Yoenmi</span>
            </div>
            <div class="user" style="padding: 10px; background-color: #686864; border-radius:5px;">
                <img style="border-radius: 50%;" width="30px" src="media\default.webp" alt="">
                <span class="name">Carlos Sanchez</span><span class="username">@<?php echo $_COOKIE["usuario"] ?></span>
            </div>
            <div class="menu-left">
                <div class="d-flex"><img src="media\hogar.svg"><span>Home</span></div>
                <div class="d-flex"><img src="media\calendario.svg"><span>Latest</span></div>
                <div class="d-flex"><img src="media\globo.svg"><span>Explore</span></div>
                <div class="d-flex"><img src="media\hogar.svg"><span>News Feed</span></div>
                <div class="d-flex"><img src="media\hogar.svg"><span>Marketplace</span></div>
            </div>
        </div>
        <div class="col-9 d-flex flex-column">
            <div class="top p-4 row d-flex">
                <input class="col-5 search p-2" placeholder="Search..."></input>
                <div class="col-1"></div>
                <div class="col-2 d-flex top-right">
                    <div class="bell"><img src="media\notificacion.png" alt=""></div>
                    <div class="not"><img src="media\mensaje.png" alt=""></div>
                    <img src="media\default.webp" alt="" style="width:45px !important">
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
                    <div class="options" style="width:45px;"><img src="media\ajustes.png" alt=""></div>
                </div>
            </div>
        </div>
    </div>
</body>
</html>