<?php include("header-login.php"); ?>
    <div id="login" class="login d-flex flex-column p-4 justify-content-center align-items-center w-33">
        <div class="login-main phone-logo" style="display:none;">
            <img src="..\..\media\Logo Aplicación Blanco.png"></img>
            <h3>Yoenmi</h3>
        </div>
        <h1 class="mb-4" style="color:black;">Inicio de sesión</h1>
        <form class="d-flex flex-column" method="POST" action="../../controllers/login.php">
            <label for="username">Nombre de usuario</label>
            <input name="username" id="username" type="text" <?php if(isset($_GET['user'])){echo "value=$_GET[user]";} ?> ></input>
            <label for="username" class="mt-3">Contraseña</label>
            <div class="inputwfoto"><input class="password" name="password" id="password" type="password"></input><img id="ojo-pass" width=20px src='..\..\media\ojo-pass.png'></div>
            <?php
            if(isset($_GET["error"])){
                echo "<div class='alert alert-danger' role='alert'>". $_GET["error"]."</div>";
            }
            if(isset($_GET["success"])){
                echo "<div class='alert alert-success' role='alert'>". $_GET["success"]."</div>";
            }
            ?>
            <label for="remember"><input class="me-2" type="checkbox" id="remember" name="remember"></input>Recuérdame</label>
            <div class="mt-3">¿Aún no tienes cuenta? <a href="register.php">Regístrate</a></div>
            <button id="submit" type="submit" class="send-btn mt-3">Enviar</button>
        </form>
    </div>
</body>
<script src="login.js"></script>
</html>
