<?php
require('header.php');
?>
            <script>
                $("#home").addClass('active');
            </script>
            <script src="ajax.js"></script>
            <div class="row mainframe">
                <div class="col-8">
                    <form action="controllers/post.php?type=post" enctype="multipart/form-data" method="POST" style="width: 100%;">
                        <div class="d-flex flex-column whats-new" style="gap: 20px;">
                            <div class="d-flex" style="gap: 20px; height: 40px;">
                                <div class="profile-pic" style="height: 40px !important; width: 40px !important; background-image: url('<?php echo $_SESSION['image']; ?>');"></div>
                                <input type="text" id="content" name="content" class="search" style="padding: 10px; width: 100%;" placeholder="What's on your mind?" value="<?php if(isset($_GET["content"])){echo $_GET["content"];} ?>">
                            </div>
                            <div id="max-content" style="display:none; text-align:right;"></div>
                            <div class="d-flex justify-content-between" style="align-items:center;">
                                <div class="div d-flex" style="gap: 20px;">
                                    <label for="camera"><img style="cursor:pointer;" class="ico" width="20px" src="media/camara.svg" alt=""></label>
                                    <input style="display:none;" type="file" class="form-control" id="camera" name="camera" accept="image/*" capture="camera" />
                                    <label for="image"><img style="cursor:pointer;" class="ico" id="ico-images" width="20px" src="media/imagen.svg" alt=""></label>
                                    <input style="display:none;" type="file" class="form-control" id="image" name="image[]" accept="image/*" multiple />
                                    <img id="url-post" style="cursor:pointer;" class="ico" width="20px" src="media/enlace-alt.svg" alt="">
                                    <img id="ubicacion-post" style="cursor:pointer;" class="ico" width="20px" src="media/marcador.svg" alt="">
                                    <input style="display: none;" id="id" name="id" type="text" value="<?php echo $_SESSION["id"]; ?>">
                                    <input style="display: none;" type="text" id="input-map" name="input-map">
                                </div>
                                <button id="post-submit" style="padding: 5px 30px;" class="btn btn-dark" type="submit">Post</button>
                            </div>
                            <?php
                            if(isset($_GET["error"])){
                                echo "<div class='alert alert-danger' role='alert'>". $_GET["error"]."</div>";
                            }
                            if(isset($_GET["success"])){
                                echo "<div class='alert alert-success' role='alert'>". $_GET["success"]."</div>";
                            }
                            ?>
                        </div>
                        <div id="output-container" style="display:none;">
                            <span>Máximo 4 imágenes.</span>
                            <output id="post-output"></output>
                        </div>
                        <div id="map" style="display:none; padding:10px; display:flex; justify-content: center;"></div>
                    </form>
                    <div id="posts" class="posts"></div>
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
                    <div style="color:black;" id="ubicacion-modal" class="modal">
                    <div class="d-flex flex-column p-3" style="align-items:center; gap:15px;">
                        <div style='color:black; text-align:center; padding:20px;font-size: 20px;'><strong>Añade una ubicacion a tu post</strong></div>
                        <div><u>Añade un lugar</u></div>
                        <div style="display:flex; gap: 10px;"><label for="lugar">Lugar </label><input style="border: solid 1px black;" type="text" id="lugar" name="lugar"></div>
                        <div><u>Añade tus coordenadas</u></div>
                        <div style="display:flex; gap: 10px;"><label for="latitude">Latitud </label><input style="border: solid 1px black;" type="text" id="latitude" name="latitude"></div>
                        <div style="display:flex; gap: 10px;"><label for="longitud">Longitud </label><input style="border: solid 1px black;" type="text" id="longitud" name="longitud"></div>
                        <button id="insert-coords" type="button" class="btn btn-success">Insertar mapa</button>
                        <div>O bien</div>
                        <button id="detect-ubic" type="button" class="btn btn-outline-success">Detectar mi ubicacion</button>
                        <div class="d-flex justify-content-center" style="padding:20px; gap: 10px;">
                            <button id="cerrar-ubic-modal" class="btn btn-warning">Cancelar</button>
                        </div>
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
                <div class="col-4">
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
                        <div id="sugerencias-amistad" class="p-3 mt-4" style="border: 1px solid white; border-radius:5px;">
                            <h2 class="text-center">Sugerencias de amistad</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="main.js"></script>
</html>