    // Funcion para leer las cookies
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

$(document).ready(function(){

    //Get posts and display them
    let user_id = $("#user_id").text();
    let type;

    // Define type of request depending of the page
    if($('#home').hasClass('active')){
        type = 'user';
    } else{
        type='all';
    }

    // Ajax request
    $.ajax( "controllers/posts.php?type="+type, {
                type: 'POST',
                dataType: 'json',
                data: {'user_id' : user_id}
    }).then(function(respuesta){
        console.log(respuesta);
        // Get the color_mode cookie & display posts with the correspondent class
        let cook = getCookie("color_mode");
        for(var post of respuesta){
                
            let color_class;
            let liked_class;

            if(cook == "dark"){
                color_class = "post-dark";
            } else if(cook == "light" || cook == null){
                color_class = "post-light";
            }

            // Append each post
            $('#posts').append("<div id='"+post['ID']+"' class='d-flex flex-column post " + color_class + "'></div>");
            $('#'+post['ID']).append("<div><div><div class='profile-pic post-user-image' style='background-image: url("+post['avatar']+");'></div><span class='name'>"+post['Nombre']+"</span><span class='username'> @"+post['username']+"</span></div><span>"+post['date']+"</span></div>");
            $('#'+post['ID']).append("<div class='text-content'>"+post['content']+"</div>");
            if(post['image'].length > 0){
                $('#'+post['ID']).append("<img src='"+post['image']+"'>");
            }

            // If the post is liked by the current user, add correpondent class
            if(post['liked'] == 1){
                liked_class = 'liked';
            } else {
                liked_class = '';
            }

            // Add comments button and add comment box
            $('#'+post['ID']).append("<div style='gap:10px; align-items: center;position:relative;' id='likes-com' class='d-flex'><div class='like "+liked_class+"'><span id='likes-count'>"+post['likes']+"</span><img  height=20px src='media/like.png'></div><a href='likes.php?id="+post['ID']+"' rel='modal:open'><img height=25px src='media/ojo.png' class='ico see-likes' id='see-likes'></img></a></div>");
            $('#'+post['ID']+' #likes-com').append("<div class='comments-button'><span id='comments-count'>"+post['count-comm']+"</span><img height=20px src='media/comments.png'></div>");
            $('#'+post['ID']).parent().append("<div style='display:none; background-color: rgb(26 30 45); margin-top:-20px;border-radius: 5px;' id='form-"+post['ID']+"'></div>")
            $('#form-'+post['ID']).append("<form class='comment-form' action='controllers/comment.php' enctype='multipart/form-data' method='POST' style='width: 100%;'><div class='d-flex flex-column' style='gap: 20px;'><div class='d-flex' style='gap: 20px; height: 40px;'><div class='profile-pic' style='height: 40px !important; width: 40px !important; background-image: url("+post['avatar']+");'></div><input type='text' placeholder='Responde a "+post['Nombre']+"'id='content' name='content' class='search' style='padding: 10px; width: 100%;' value=''></div><div id='abajo-postear' class='d-flex justify-content-between' style='align-items:center;'><div class='div d-flex' id='icp' style='gap: 20px;'><label for=''><img style='cursor:pointer;' class='ico' width='20px' src='media/camara.svg' alt=''></label><label for='image'><img style='cursor:pointer;' class='ico' width='20px' src='media/imagen.svg' alt=''></label></div></div></form>");
            $('#form-'+post['ID']+' #icp').append("<input type='text' name='post_id' id='post_id' style='display:none;' value='"+post['ID']+"'><input type='text' name='user_id' id='user_id' style='display:none;' value='"+user_id+"'><input style='display:none;' type='file' class='form-control' id='image' name='image' accept='image/*' /><a href='#'><img style='cursor:pointer;' class='ico' width='20px' src='media/enlace-alt.svg' alt=''></a><a href='#'><img style='cursor:pointer;' class='ico' width='20px' src='media/marcador.svg' alt=''></a></div>");
            $('#form-'+post['ID']+' #abajo-postear').append("<button style='padding: 5px 30px;' class='btn-send-com btn btn-dark' type='submit'>Responder</button>");

            if(post['comments'].length>0){
                $('#form-'+post['ID']+' .comment-form').addClass("comment-form-line-bottom");
                const comments = post['comments'];
                for(let i=0;i<comments.length;i++){
                    // Add each comment
                    $('#form-'+post['ID']).append("<div id='comment-"+comments[i]['ID']+"' class='d-flex flex-column comment'></div>");
                    $('#comment-'+comments[i]['ID']).append("<div><div><div class='profile-pic post-user-image' style='background-image: url("+comments[i]['avatar']+");'></div><span class='name'>"+comments[i]['Nombre']+"</span><span class='username'> @"+comments[i]['username']+"</span></div><span>"+comments[i]['date']+"</span></div>");
                    $('#comment-'+comments[i]['ID']).append("<div class='text-content'>"+comments[i]['content']+"</div>");
                    if(comments[i]['image'].length > 0){
                    $('#comment-'+comments[i]['ID']).append("<img src='"+comments[i]['image']+"'>");
                    }
                }
            }
        }
            
        // Post comments dropdown
        $(".comments-button").click(function(){
        let post_id = $(this).parent().parent().attr("id");
        if($("#form-"+post_id).is(':visible')){
            $(this).removeClass('comments-button-opened');
            $("#form-"+post_id).slideUp('fast');
        }else if($("#form-"+post_id).is(':hidden')){
            $("#form-"+post_id).slideDown('fast');
            $(this).addClass('comments-button-opened');
        }

        
        $(".btn-send-com").click(function(event){
            event.preventDefault();
            let parent = $(this).parent().parent().parent().parent()[0].id;
            let post_id = $("#"+parent+" #post_id")[0].value;
            let content = $("#"+parent+" #content")[0].value;   
            $.ajax( "controllers/comment.php?type=insert", {
                type: 'POST',
                dataType: 'text',
                data: {'user_id' : user_id,
                        'post_id' : post_id,
                    'content' : content}
            }).then(function(respuesta){
                if(respuesta == "true"){
                    $.ajax("controllers/comment.php?type=get", {
                        type: 'POST',
                        dataType: 'text',
                        data: {'post_id' : post_id}
                    }).then(function(respuesta){
                        let parsed = JSON.parse(respuesta);
                        $('#form-'+post_id+'>div').remove();
                        $("#"+parent+" #content")[0].value = "";
                        for(var new_comment of parsed){
                            // Add each comment
                            $('#form-'+post_id).append("<div id='comment-"+new_comment['ID']+"' class='d-flex flex-column comment'></div>");
                            $('#comment-'+new_comment['ID']).append("<div><div><div class='profile-pic post-user-image' style='background-image: url("+new_comment['avatar']+");'></div><span class='name'>"+new_comment['Nombre']+"</span><span class='username'> @"+new_comment['username']+"</span></div><span>"+new_comment['date']+"</span></div>");
                            $('#comment-'+new_comment['ID']).append("<div class='text-content'>"+new_comment['content']+"</div>");
                        };
                    })
                }
            })
        })
    })
})
    // Function that executes every 0.5 seconds, reads and update number of likes on each post.
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

    // Function for make likes and unlikes
    $(document).on("click", ".like", function (ev) {
        let post_id = $(this).parent().parent().attr("id");
        // If is already liked, send request to unlike & remove liked class
        if($(this).hasClass('liked')){
            $.ajax("controllers/likes.php?type=unlike",{
                type: 'POST',
                dataType: 'bool',
                data: {'user_id' : user_id,
                        'post_id' : post_id}
            });
            $(this).removeClass('liked');
        }else{
            // If is not liked, send request to like & add liked class
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