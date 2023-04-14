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
    let user_avatar = $(".profile-pic")[0].style.backgroundImage.slice(4, -1).replace(/"/g, "");
    let user_username = $(".username")[0].innerHTML.slice(1);
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
            let coment_color_class;
            let liked_class;

            // Format date got from the DB in posts
            fecha = new Date(post['date']);
            const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
            var minutes;
            if(fecha.getMinutes() < 10){minutes = "0"+fecha.getMinutes();} else {minutes = fecha.getMinutes();}
            var date = fecha.getDate()+" de "+meses[fecha.getMonth()]+" a las "+fecha.getHours()+":"+minutes;

            if(cook == "dark"){
                color_class = "post-dark";
                comment_color_class = 'rgb(26 30 45)';

            } else if(cook == "light" || cook == null){
                color_class = "post-light";
                comment_color_class = 'rgb(13 87 151 / 65%)';
            }

            // Append each post
            $('#posts').append("<div id='"+post['ID']+"' class='d-flex flex-column post " + color_class + "'></div>");
            $('#'+post['ID']).append("<div><div><div class='profile-pic post-user-image' style='background-image: url("+post['avatar']+");'></div><span class='name'>"+post['Nombre']+"</span><span class='username'> @"+post['username']+"</span></div><span>"+date+"</span></div>");
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

            $('#'+post['ID']).append("<div style='gap:10px; align-items: center;position:relative;' id='likes-com' class='d-flex'><div class='like "+liked_class+"'><span id='likes-count'>"+post['likes']+"</span><img  height=20px src='media/like.png'></div><a href='likes.php?id="+post['ID']+"' rel='modal:open'><img height=25px src='media/ojo.png' class='ico see-likes' id='see-likes'></img></a></div>");
            $('#'+post['ID']+' #likes-com').append("<div class='comments-button'><span id='comments-count'>"+post['count-comm']+"</span><img height=20px src='media/comments.png'></div>");

            if(post['username'] == user_username){
                $('#'+post['ID']+' #likes-com').append("<div class='edit-delete-buttons'><div class='delete-post-button'><img height=20px src='media/delete.png'></div><div class='edit-post-button'><img height=20px src='media/edit.png'></div></div>");
            }

            // Add comment box
            $('#'+post['ID']).parent().append("<div class='form-comm' style='display:none; background-color: "+comment_color_class+"; margin-top:-20px;border-radius: 5px;' id='form-"+post['ID']+"'></div>")
            $('#form-'+post['ID']).append("<form class='comment-form' action='controllers/comment.php' enctype='multipart/form-data' method='POST' style='width: 100%;'><div class='d-flex flex-column' style='gap: 20px;'><div class='d-flex' style='gap: 20px; height: 40px;'><div class='profile-pic' style='height: 40px !important; width: 40px !important; background-image: url("+user_avatar+");'></div><input type='text' placeholder='Responde a "+post['Nombre']+"'id='content' name='content' class='search' style='padding: 10px; width: 100%;' value=''></div><div class='alert alert-danger alert-comm'role='alert'></div><div id='abajo-postear' class='d-flex justify-content-between' style='align-items:center;'><div class='div d-flex' id='icp' style='gap: 20px;'><label for=''><img style='cursor:pointer;' class='ico' width='20px' src='media/camara.svg' alt=''></label><label for='image'><img style='cursor:pointer;' class='ico' width='20px' src='media/imagen.svg' alt=''></label></div></div></form>");
            $('#form-'+post['ID']+' #icp').append("<input type='text' name='post_id' id='post_id' style='display:none;' value='"+post['ID']+"'><input type='text' name='user_id' id='user_id' style='display:none;' value='"+user_id+"'><input style='display:none;' type='file' class='form-control' id='image' name='image' accept='image/*' /><a href='#'><img style='cursor:pointer;' class='ico' width='20px' src='media/enlace-alt.svg' alt=''></a><a href='#'><img style='cursor:pointer;' class='ico' width='20px' src='media/marcador.svg' alt=''></a></div>");
            $('#form-'+post['ID']+' #abajo-postear').append("<button style='padding: 5px 30px;' class='btn-send-com btn btn-dark' type='submit'>Responder</button>");

            // If has comments, add them
            if(post['comments'].length>0){
                $('#form-'+post['ID']+' .comment-form').addClass("comment-form-line-bottom");
                const comments = post['comments'];
                for(let i=0;i<comments.length;i++){

                    fecha = new Date(comments[i]['date']);
                    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
                    var minutes;
                    if(fecha.getMinutes() < 10){minutes = "0"+fecha.getMinutes();} else {minutes = fecha.getMinutes();}
                    var date = fecha.getDate()+" de "+meses[fecha.getMonth()]+" a las "+fecha.getHours()+":"+minutes;

                    let class_comment;
                    if(i>0){ class_comment = 'comment-topline'; } else { class_comment = ''; }
                    // Add each comment
                    $('#form-'+post['ID']).append("<div id='comment-"+comments[i]['ID']+"' class='d-flex flex-column comment "+class_comment+"'></div>");
                    $('#comment-'+comments[i]['ID']).append("<div><div><div class='profile-pic post-user-image' style='background-image: url("+comments[i]['avatar']+");'></div><span class='name'>"+comments[i]['Nombre']+"</span><span class='username'> @"+comments[i]['username']+"</span></div><span>"+date+"</span></div>");
                    if(comments[i]['username'] == user_username){
                        $('#comment-'+comments[i]['ID']).append("<div class='d-flex justify-content-between'><div class='text-content'>"+comments[i]['content']+"</div><div class='delete-comment-button'><img height=20px src='media/delete.png'></div></div>");
                    } else{
                        $('#comment-'+comments[i]['ID']).append("<div class='text-content'>"+comments[i]['content']+"</div>");
                    }
                    
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

        // Function to send a comment. It stores the comment at the DB,
        // delete the current comments & add actualised comments.
        $(".btn-send-com").click(function(event){
            event.preventDefault();
            let parent = $(this).parent().parent().parent().parent()[0].id;
            let content = $("#"+parent+" #content")[0].value;  
            let post_id = $("#"+parent+" #post_id")[0].value;
            
            if(content != ''){
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
                            // Delete all current comments
                            $('#form-'+post_id+'>div').remove();
                            $("#"+parent+" #content")[0].value = "";
                            $('#form-'+post_id+' .alert-comm').hide();
                            parsed.forEach(function(new_comment, i){
                                
                                fecha = new Date(new_comment['date']);
                                const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Setiembre", "Octubre", "Noviembre", "Diciembre"];
                                var minutes;
                                if(fecha.getMinutes() < 10){minutes = "0"+fecha.getMinutes();} else {minutes = fecha.getMinutes();}
                                var date = fecha.getDate()+" de "+meses[fecha.getMonth()]+" a las "+fecha.getHours()+":"+minutes;

                                // Add each comment
                                let class_comment;
                                if(i>0){ class_comment = 'comment-topline'; } else { class_comment = ''; }
                                $('#form-'+post_id).append("<div id='comment-"+new_comment['ID']+"' class='d-flex flex-column comment "+class_comment+"'></div>");
                                $('#comment-'+new_comment['ID']).append("<div><div><div class='profile-pic post-user-image' style='background-image: url("+new_comment['avatar']+");'></div><span class='name'>"+new_comment['Nombre']+"</span><span class='username'> @"+new_comment['username']+"</span></div><span>"+date+"</span></div>");
                                $('#comment-'+new_comment['ID']).append("<div class='d-flex justify-content-between'><div class='text-content'>"+new_comment['content']+"</div></div>");
                                $.ajax("controllers/comment.php?type=count", {
                                    type: 'POST',
                                    dataType: 'text',
                                    data: {'post_id' : post_id}
                                }).then(function(respuesta){
                                    parsed = JSON.parse(respuesta);
                                    console.log(parsed);
                                    $("#"+post_id+" #comments-count")[0].innerHTML = parsed["COUNT(post_id)"];
                                });
                            })
                        })
                    }
                })
            } else{
                $('#form-'+post_id+' .alert-comm').text("Introduce algo de texto.");
                $('#form-'+post_id+' .alert-comm').show();
            }
        })
    })
})

    $(document).on("click", ".delete-post-button", function () {
        
        $("#estas-seguro").modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });
    })

    $("#cerrar-delete-modal").click(function(){
        $.modal.close();
    });

    $("#confirmar-delete-modal").click(function(){
        let post_id = $('.delete-post-button').parent().parent().parent()[0].id;

        $.ajax( "controllers/post.php?type=delete", {
            type: 'POST',
            dataType: 'text',
            data: {'post_id' : post_id}
        }).then(function(respuesta){
            if(respuesta == 'true'){
                location.reload();
            }
        })
    });

    $(document).on("click", ".edit-post-button", function () {
        $("#edit-post").modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });
    });

    $("#cerrar-edit-modal").click(function(){
        $('#alert-edit-post').text("");
        $('#alert-edit-post').hide();
        $.modal.close();
    });

    $("#confirmar-edit-modal").click(function(){
        let content = $("#text-edit-post").val();
        if(content != ''){
            let post_id = $('.edit-post-button').parent().parent().parent()[0].id;
            console.log(post_id);
            $.ajax( "controllers/post.php?type=edit", {
                type: 'POST',
                dataType: 'text',
                data: {'post_id' : post_id,
                        'content' : content}
            }).then(function(respuesta){
                console.log(respuesta);
                if(respuesta == 'true'){
                    location.reload();
                }
            })
        } else {
            $('#alert-edit-post').text("Debes introducir algo de texto.");
            $('#alert-edit-post').show();
        }
    });

    $(document).on("click", ".delete-comment-button", function () {
        let form_id = $(this).parent().parent().attr('id');
        let comment_id = form_id.split('-')[1];
        
        $("#estas-seguro-comment").modal({
            escapeClose: false,
            clickClose: false,
            showClose: false
        });

        $("#estas-seguro-comment").append("<span id='"+comment_id+"' style='display:none;'></span>");
    });

    $("#cerrar-delete-modal-comment").click(function(){
        $.modal.close();
    });

    $("#confirmar-delete-modal-comment").click(function(){
        let comment_id = $("#"+$(this).parent().parent().attr('id')+" span").attr('id');
        $.ajax( "controllers/comment.php?type=delete", {
            type: 'POST',
            dataType: 'text',
            data: {'comment_id' : comment_id}
        }).then(function(respuesta){
            if(respuesta == 'true'){
                location.reload();
            }
        })
    });
    
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
    };
    setInterval(refreshLikes, 500);

    // Function for make likes and unlikes
    $(document).on("click", ".like", function () {
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