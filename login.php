<?php
include("header.php");
if(!empty($_SESSION["usuario"])){
    header("Location: welcome.php");
}
?>
    <div class="d-flex flex-column mt-5 justify-content-center align-items-center container">
        <h1 class="mb-4">Inicio de sesión</h1>
        <form class="d-flex flex-column" method="POST" action="controllers/login.php">
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
            <div class="mt-3">¿Aún no tienes cuenta? <a href="register.php">Regístrate</a></div>
            <button id="submit" type="submit" class="btn btn-success mt-3">Enviar</button>
        </form>
    </div>


</body>
</html>