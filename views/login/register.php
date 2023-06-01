<?php include("../login/header-login.php"); ?>
<body>
    <div id="register" class="login d-flex flex-column p-4 justify-content-center align-items-center w-33">
        <div class="login-main phone-logo" style="display:none;">
            <img src="..\..\media\Logo Aplicación Blanco.png"></img>
            <h3>Yoenmi</h3>
        </div>
        <h1 class="mb-3" style="color:black;text-align:center;">Formulario de registro</h1>
        <form class="d-flex flex-column" method="POST" action="../../controllers/register.php" enctype="multipart/form-data">
            <label for="name">Nombre</label>
            <input name="name" id="name" type="text" required></input>
            <label for="correo">Correo</label>
            <input name="correo" id="correo" type="email" required></input>
            <div class="d-flex flex-column user_and_pass" style="gap:10px;">
                <div>
                    <label for="username">Nombre de usuario</label>
                    <input style="width:100%" name="username" id="username" type="text" required <?php if(isset($_GET['user'])){echo "value=$_GET[user]";} ?>></input>
                </div>
                <div>
                    <label for="password">Contraseña</label>
                    <div class="inputwfoto"><input class="password" name="password" id="password" type="password" required></input><img id="ojo-pass" style="margin:5px; cursor:pointer;" width=20px src='..\..\media\ojo-pass.png'></div>
                </div>    
            </div>
            <div style="display: flex; gap:10px;">
                <div>
                <label for="image">Foto de Perfil</label>
                <input type="file" class="form-control" id="image" name="image" accept="image/*">
                </div>
                <div>
                <label for="banner">Banner de Perfil</label>
                <input type="file" class="form-control" id="banner" name="banner" accept="image/*">
                </div>
            </div>
            <label for="private"><input type="checkbox" name="private" id="private"> Perfil Privado</label>
            <?php
            if(isset($_GET["error"])){
                echo "<div class='alert alert-danger' role='alert'>". $_GET["error"]."</div>";
            }
            ?>
            <div class="mt-3">¿Ya tienes cuenta? <a href="login.php">Inicia sesión</a></div>
            <button id="submit" type="submit" class="send-btn mt-3">Enviar</button>
        </form>
    </div>
</body>
<script src="login.js"></script>
</html>