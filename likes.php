<?php

require('db_conn.php');

$id = $_GET['id'];
$data = $conn->getLikes($id);
echo "<div class='header-modal'><h1 style='color:white;'>Le gusta a:</h1></div>";

if(count($data)<1){
    echo "<small style='display:block; color:grey; text-align:center; margin: 30px;'>Esta publicación aún no le gusta a nadie... ¿no está tan mal no?</small>";
} else{
    for($i=0;$i<count($data);$i++){
        echo "<div class='d-flex user-liked'><div class='profile-pic' style='width:50px; height:50px; background-image:url(".$data[$i]['avatar'].");'></div><span style='font-size:35px;'>".$data[$i]['Nombre']."</span><span style='font-size: 20px;'>@".$data[$i]['username']."</span></div><hr style='width: 70%; margin: auto; color: grey;' />";
    }
}

?>