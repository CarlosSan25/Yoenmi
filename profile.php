<?php

require("profile-header.php");

?>  

<script src="profile.js"></script>
    <div class="row">
        <div class="col-8" style="border-right: solid 1px grey;padding:0px;">
            <label id="label-banner" for="update-banner"><div id="profile-banner" class="profile-banner"></div></label>
            <div style="position: relative;">
                <label for="update-profilepic"><div id="profile-avatar" class="profile-avatar"></div></label>
                <?php if($_GET['user'] == $_COOKIE["usuario"]){
                    echo '<input style="display: none;" type="file" class="form-control" id="update-banner" name="update-banner" accept="image/*">';
                    echo '<input style="display: none;" type="file" class="form-control" id="update-profilepic" name="update-profilepic" accept="image/*">';
                } ?>
                <div class="row" style="margin-top: 75px; padding-top:15px; padding-left:50px;">
                    <div class="div col-6">
                        <h2 style="font-size: 50px; margin-bottom:0px; line-height: 45px;" id="profile-name"></h2>
                        <h4 style="color:grey;" id="profile-username"></h4>
                    </div>
                    <div class="div col-6" style="text-align: center;">
                        <?php if($_GET['user'] == $_COOKIE["usuario"]){
                            echo '<button style="font-size: 20px;position: absolute;right: 50px;top: 40px;" class="btn btn-outline-primary">Editar Perfil</button>';
                        } ?>
                    </div>
                </div>
                <div class="d-flex" style="margin-top: 20px;align-items: start;gap:10px;padding: 0px 47px;"><img width="20px" src='media\calendario.svg' class='ico'><span id="profile-user-date"></span></div>
                <div class="d-flex" style="border-bottom: 1px solid grey;font-size: 20px;align-items: start;gap:30px;padding: 30px 47px;">
                    <div>185 Siguiendo</div>
                    <div>562 Seguidores</div>
                </div>
            </div>
            <div id="posts" class="posts"></div>
        </div>
        <div class="col-4" style="padding:30px;">
            <div class="weather d-flex flex-column justify-content-center" style="align-items:center;">
                <?php require("weather-api.php"); ?>
                <div class="d-flex justify-content-between" style="font-size: 20px; width: 100%;">
                    <div id="is_day"><?php if($response->current->is_day){echo "Day";} else {echo "Night";} ?></div>
                    <div id="condition-text"><?php echo $response->current->condition->text; ?></div>
                </div>
                <video autoplay muted loop id="back-weather">
                    <source src="<?php if($response->current->is_day == 1){ echo "media\back-sunny.mp4";} else {echo "media\back-night.mp4";} ?>" type="video/mp4">
                </video>
                <img src="<?php echo $response->current->condition->icon; ?>" alt="">
                <div class="temp"><?php echo $response->current->temp_c; ?>º</div>
                <div class="locat"><?php echo $response->location->name ?></div>
                <div style="width: 100%; font-size: 20px;" class="mt-3 d-flex justify-content-around">
                    <div class="wind d-flex flex-column" style="align-items: center;">
                        <span>Wind Now</span>
                        <span><?php echo $response->current->wind_mph ?> m/h</span>
                    </div>
                    <div class="wind d-flex flex-column" style="align-items: center;">
                        <span>Humidity</span>
                        <span><?php echo $response->current->humidity ?></span>
                    </div>
                    <div class="wind d-flex flex-column" style="align-items: center;">
                        <span>Precipitation</span>
                        <span><?php echo $response->current->precip_in ?> %</span>
                    </div>
                </div>
            </div>
        </div>
    </div>  
        <div id="alert-success" class='alert alert-success' role='alert'></div>
        <div id="alert-warning" class='alert alert-warning' role='alert'></div>
        <div id="alert-danger" class='alert alert-danger' role='alert'></div>
        <div id="add_url" class="modal">
            <div style='color:black; text-align:center; padding:20px;font-size: 20px;'><strong>Añade un enlace a tu post</strong></div>
            <div style="gap: 15px; align-items: center;" class="d-flex justify-content-center flex-column">
                <div class="d-flex" style="gap: 20px; align-items: center;"><label for="texto" style="color:black;">Texto</label><input style="border: 1px solid black" name="texto" type="text"></div>
                <div class="d-flex" style="gap: 20px; align-items: center;"><label for="enlace" style="color:black;">Enlace</label><input style="border: 1px solid black" name="enlace" type="text"></div>
            </div>
            <div class="d-flex justify-content-center" style="padding:20px; gap: 10px;">
                <button id="confirmar-url-modal" class="btn btn-success">Añadir</button>
                <button id="cerrar-url-modal" class="btn btn-warning">Cancelar</button>
            </div>
        </div>
        <div id="estas-seguro" class="modal">
            <div style='color:black; text-align:center; padding:20px;font-size: 20px;'><strong>¿Estás seguro que deseas eliminar este post?</strong></div>
            <div class="d-flex justify-content-center" style="padding:20px; gap: 10px;">
                <button id="confirmar-delete-modal" class="btn btn-danger">Eliminar</button>
                <button id="cerrar-delete-modal" class="btn btn-warning">Cancelar</button>
            </div>
        </div>
        <div id="edit-post" class="modal">
            <div class="d-flex flex-column align-center justify-content-center" style="gap: 10px;">
                <div style='color:black; text-align:center; padding:20px;font-size: 20px;'><strong>Edita el post:</strong></div>
                <textarea class="input textarea-edit" type="text" id='text-edit-post' name="text-edit-post"></textarea>
                <div style="display:none; width: 60%; align-self: center; margin-top: 10px;" class="alert alert-danger" id='alert-edit-post' role="alert"></div>
                <div class="d-flex justify-content-between" style="align-items:center;">
                    <div class="div d-flex" style="gap: 20px; padding-left: 50px;">
                        <label for=""><img style="cursor:pointer;" width="20px" src="media/camara.svg" alt=""></label>
                        <label for="edit-image"><img style="cursor:pointer;" width="20px" src="media/imagen.svg" alt=""></label>
                        <input style="display:none;" type="file" class="form-control img-edit" id="edit-image" name="edit-image[]" accept="image/*" multiple />
                        <img id="url-post" style="cursor:pointer;" width="20px" src="media/enlace-alt.svg" alt="">
                        <img style="cursor:pointer;" width="20px" src="media/marcador.svg" alt="">
                        <input style="display: none;" id="id" name="id" type="text" value="<?php echo $_SESSION["id"]; ?>">
                    </div>
                </div>
                <span style="color: black;text-align:center;">Máximo 4 imágenes.</span>
                <div id="edit-existing-images"></div>
                <div class="d-flex justify-content-center" style="padding:20px; gap: 10px;">
                    <button id="confirmar-edit-modal" class="btn btn-warning">Editar</button>
                    <button id="cerrar-edit-modal" class="btn btn-danger">Cancelar</button>
                </div>
            </div>
        </div>
        <div id="slideshow-container" class="slideshow-container modal">
            <div class="mySlides fade">
                <div class="numbertext"></div>
                <div id="text-slides" class="text">
                    <div id="slides-user-date" class="user_and_date"></div>
                    <div id="slides-text-content"></div>
                </div>
            </div>

            <!-- Next and previous buttons -->
            <a class="prev">&#10094;</a>
            <a class="next">&#10095;</a>
        </div>
    </div>
</body>
<script src="main.js"></script>
</html>