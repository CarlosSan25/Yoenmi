    // Funcion para leer las cookies
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

$(document).ready(function(){
    let user_id = $("#user_id").text();
    let type;

    if($('#home').hasClass('active')){
        type = 'user';
    } else{
        type='all';
    }

    $.ajax( "controllers/posts.php?type="+type, {
                type: 'POST',
                dataType: 'json',
                data: {'user_id' : user_id}
    }).then(function(respuesta){
        let cook = getCookie("color_mode");
        console.log(respuesta);
        for(var post of respuesta){
                
            let color_class;
            let liked_class;

            if(cook == "dark"){
                color_class = "post-dark";
            } else if(cook == "light" || cook == null){
                color_class = "post-light";
            }

            $('#posts').append("<div id='"+post['ID']+"' class='d-flex flex-column post " + color_class + "'></div>");
            $('#'+post['ID']).append("<div><div><div class='profile-pic post-user-image' style='background-image: url("+post['avatar']+");'></div><span class='name'>"+post['Nombre']+"</span><span class='username'> @"+post['username']+"</span></div><span>"+post['date']+"</span></div>");
            $('#'+post['ID']).append("<div class='text-content'>"+post['content']+"</div>");
            if(post['image'].length > 0){
                $('#'+post['ID']).append("<img src='"+post['image']+"'>");
            }

            if(post['liked'] == 1){
                liked_class = 'liked';
            } else {
                liked_class = '';
            }

            $('#'+post['ID']).append("<div style='gap:10px; align-items: center;' class='d-flex'><div class='like "+liked_class+"'><span id='likes-count'>"+post['likes']+"</span><img  height=20px src='media/like.png'></div><a href='likes.php?id="+post['ID']+"' rel='modal:open'><img height=25px src='media/ojo.png' class='ico' id='see-likes'></img></a></div>");
        }
    })

    function refreshLikes(){
        $.ajax( "controllers/posts.php?type="+type, {
            type: 'POST',
            dataType: 'json',
            data: {'user_id' : user_id}
        }).then(function(respuesta){
            for(var post of respuesta){
                $('#'+post['ID']+' #likes-count').text(post['likes']);
            }
        })
    }

    setInterval(refreshLikes, 500);

    $(document).on("click", ".like", function (ev) {
        let post_id = $(this).parent().parent().attr("id");
        if($(this).hasClass('liked')){
            $.ajax("controllers/likes.php?type=unlike",{
                type: 'POST',
                dataType: 'bool',
                data: {'user_id' : user_id,
                        'post_id' : post_id}
            });
            $(this).removeClass('liked');
        }else{
            $.ajax("controllers/likes.php?type=like",{
                type: 'POST',
                dataType: 'bool',
                data: {'user_id' : user_id,
                        'post_id' : post_id}
            });
            $(this).addClass('liked');
        }
    });
})