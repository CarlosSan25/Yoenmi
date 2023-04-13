<?php
require('header.php');
?>
            <script>
                $("#explore").addClass('active');
            </script>
            <div class="row mainframe">
                <div class="col-8">
                    <form action="controllers/post.php" enctype="multipart/form-data" method="POST" style="width: 100%;">
                        <div class="d-flex flex-column whats-new" style="gap: 20px;">
                            <div class="d-flex" style="gap: 20px; height: 40px;">
                                <div class="profile-pic" style="height: 40px !important; width: 40px !important; background-image: url('<?php echo $_SESSION['image']; ?>');"></div>
                                <input type="text" id="content" name="content" class="search" style="padding: 10px; width: 100%;" placeholder="What's on your mind?" value="<?php if(isset($_GET["content"])){echo $_GET["content"];} ?>">
                            </div>
                            <div class="d-flex justify-content-between" style="align-items:center;">
                                <div class="div d-flex" style="gap: 20px;">
                                    <label for=""><img style="cursor:pointer;" class="ico" width="20px" src="media/camara.svg" alt=""></label>
                                    <label for="image"><img style="cursor:pointer;" class="ico" width="20px" src="media/imagen.svg" alt=""></label>
                                    <input style="display:none;" type="file" class="form-control" id="image" name="image" accept="image/*" />
                                    <a href="#"><img style="cursor:pointer;" class="ico" width="20px" src="media/enlace-alt.svg" alt=""></a>
                                    <a href="#"><img style="cursor:pointer;" class="ico" width="20px" src="media/marcador.svg" alt=""></a>
                                    <input style="display: none;" id="id" name="id" type="text" value="<?php echo $_SESSION["id"]; ?>">
                                </div>
                                <button style="padding: 5px 30px;" class="btn btn-dark" type="submit">Post</button>
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
                    </form>
                    <div id="posts" class="posts"></div>
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
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
<script src="main.js"></script>
</html>