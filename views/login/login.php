<?php include("header-login.php"); ?>
    <div class="login d-flex flex-column p-4 justify-content-center align-items-center">
        <h1 class="mb-4" style="color:black;">Inicio de sesión</h1>
        <form class="d-flex flex-column" method="POST" action="../../controllers/login.php">
            <label for="username">Nombre de usuario</label>
            <input name="username" id="username" type="text" <?php if(isset($_GET['user'])){echo "value=$_GET[user]";} ?> ></input>
            <label for="username" class="mt-3">Contraseña</label>
            <input name="password" id="password" type="password"></input>
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
</html>
