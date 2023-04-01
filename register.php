<?php include("header-login.php"); ?>
<body>
    <div class="login d-flex flex-column p-4 justify-content-center align-items-center">
        <h1 class="mb-4" style="color:black;">Formulario de registro</h1>
        <form class="d-flex flex-column" method="POST" action="controllers/register.php">
        <label for="name" class="mt-3">Nombre</label>
            <input name="name" id="name" type="text"></input>
            <label for="username" class="mt-3">Nombre de usuario</label>
            <input name="username" id="username" type="text"></input>
            <label for="username" class="mt-3">Contraseña</label>
            <input name="password" id="password" type="password"></input>
            <?php
            if(isset($_GET["error"])){
                echo "<div class='alert alert-danger' role='alert'>". $_GET["error"]."</div>";
            }
            ?>
            <div class="mt-3">¿Ya tienes cuenta? <a href="index.php">Inicia sesión</a></div>
            <button id="submit" type="submit" class="send-btn mt-3">Enviar</button>
        </form>
    </div>
</body>
</html>