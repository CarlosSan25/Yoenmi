// Funcion para leer las cookies
function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

var username = document.getElementById('username').innerText;
console.log(username);
$.ajax('controllers/user.php?type=getData',{
    method: 'POST',
    type: 'json',
    data: { 'user' : username }
}).then(function(result){
    result = JSON.parse(result);
    console.log(result);
    var user_id = result['ID'];
    $("#profile-avatar").css("background-image", "url("+result['avatar']+")");
    $("#profile-avatar").attr('data-id', user_id);
    $("#profile-name").text(result['Nombre']);
    $("#profile-username").text("@"+result['username']);
    let date = new Date(result['date']);
    meses = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    $("#profile-user-date").text("Se unió el "+date.getDate()+" de "+meses[date.getMonth()]+" de "+date.getFullYear());
    if(result['banner'].length > 0){
        $("#profile-banner").css('background-image','url("'+result['banner']+'")');
    }

    if(result['private'] == 1 && $("#profile-username").text().replace('@','') != getCookie('usuario')){
        $("#posts").append("<h1 style='text-align:center; margin-top: 30px;'>&#9940;Esta cuenta es privada&#9940;</h1>");
    }

    $.ajax("controllers/user.php?type=countFollowers",{
        method: 'POST',
        type: 'json',
        data: {'username' : username}
    }).then(function(count){
        let count_parsed = JSON.parse(count);
        let followers = count_parsed['count(follower)'];
        $("#followers").text(followers+" seguidores");
    })

    $.ajax("controllers/user.php?type=countFollowing",{
        method: 'POST',
        type: 'json',
        data: {'username' : username}
    }).then(function(count){
        console.log(count);
        let count_parsed = JSON.parse(count);
        let following = count_parsed['count(following)'];
        $("#following").text(following+" siguiendo");
    })

}).then(function(){
function userPosts(){
    let user_id = $("#profile-avatar").attr('data-id');
    console.log(user_id);

    //Get posts and display them
    let user_avatar = $(".profile-pic")[0].style.backgroundImage.slice(4, -1).replace(/"/g, "");
    let user_username = $(".username")[0].innerHTML.slice(1);

    // Ajax request
    $.ajax( "controllers/posts.php?type=user", {
                type: 'POST',
                dataType: 'json',
                data: { 'user_id' : user_id }
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

            if(post['content'].includes('[url=')){
                url = post['content'].split('[url=')[1].split("]")[0];
                
                let text = post['content'].split(']')[1].split('[')[0];
                let regex = /\[url=.*\]/g;
                let contenido = post['content'].replace(regex,'<a target="_blank" href="'+ url +'">');
                contenido = contenido.split('>')
                contenido[0] += '>'+text+'</a>';
                post['content'] = contenido.join("");
            }

            let edited = '';
            if(post['edited'] == 1){
                edited = "<small style='margin-right: 5px;'>edited on</small>";
            } else{
                edited = '';
            }

            // Append each post
            $('#posts').append("<div id='"+post['ID']+"' class='d-flex flex-column post " + color_class + "'></div>");
            $('#'+post['ID']).append("<div class='user_and_date'><a style='color:white;' href='profile.php?user="+post['username']+"'><div class='user-info'><div class='profile-pic post-user-image' style='background-image: url("+post['avatar']+");'></div><span class='name'>"+post['Nombre']+"</span><span class='username'> @"+post['username']+"</span></div></a><span>"+edited+date+"</span></div>");
            $('#'+post['ID']).append("<div class='text-content'>"+post['content']+"</div>");
            if(post['image4'].length > 0){
                $('#'+post['ID']).append("<div class='grid4'><div id='img-slide' data-order='1' class='grid4-img' style='background-image: url("+post['image']+")'></div><div id='img-slide' data-order='2' class='grid4-img' style='background-image: url("+post['image2']+")'></div><div id='img-slide' class='grid4-img' data-order='3' style='background-image: url("+post['image3']+")'></div><div id='img-slide' class='grid4-img' data-order='4' style='background-image: url("+post['image4']+")'></div>");
            } else if(post['image4'].length < 1 && post['image3'].length > 0){
                $('#'+post['ID']).append("<div class='grid3'><div id='img-slide' class='grid3-img' data-order='1' style='background-image: url("+post['image']+")'></div><div id='img-slide' class='grid3-img' data-order='2' style='background-image: url("+post['image2']+")'></div><div id='img-slide' class='grid3-img grid3-imgbot' data-order='3' style='background-image: url("+post['image3']+")'></div>");
            } else if(post['image3'].length < 1 && post['image2'].length > 0){
                $('#'+post['ID']).append("<div class='grid2'><div id='img-slide' class='grid2-img' data-order='1' style='background-image: url("+post['image']+")'></div><div id='img-slide' class='grid2-img' data-order='2' style='background-image: url("+post['image2']+")'></div></div>");
            } else if(post['image2'].length < 1 && post['image'].length > 0){
                $('#'+post['ID']).append("<div class='grid1'><div id='img-slide' class='grid1-img' data-order='1' style='background-image: url("+post['image']+")'></div></div>");
            } else if(post['map'].length > 0){
                $('#'+post['ID']).append('<div style="position:relative; justify-content: center;" class="d-flex"><iframe width="800" height="400" style="border:0; border-radius: 5px;" loading="lazy" allowfullscreen referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCltQyssN-m8du_s3jHNjo3OjOar66Xg_s&q='+post['map']+'"></iframe></div>');
            }

            // If the post is liked by the current user, add correpondent class
            if(post['liked'] == 1){
                liked_class = 'liked';
            } else {
                liked_class = '';
            }

            $('#'+post['ID']).append("<div class='likes_comment_count' style='display:flex; gap:10px; align-items: center;position:relative;' id='count' class='d-flex'><div class='likes-count "+liked_class+"'><a id='likes' href='likes.php?id="+post['ID']+"' rel='modal:open'><span id='likes-count'>"+post['likes']+"</span><span> Likes</span></a></div></div>");
            $('#'+post['ID']+' #count').append("<div class='likes-count "+liked_class+"'><a class='comments-button' style='cursor: pointer;'><span id='comments-count'>"+post['count-comm']+"</span><span> Comment</span></a></div>");

            $('#'+post['ID']).append("<div style='gap:10px; align-items: center;position:relative;' id='likes-com' class='d-flex'><div class='like "+liked_class+"'><img class='pulgar' height=20px src='media/like.png'></div></div>");
            if(post['username'] == user_username.replace('@', '')){
                $('#'+post['ID']+' #likes-com').append("<div class='edit-delete-buttons'><div class='delete-post-button'><img height=20px src='media/delete.png'></div><div class='edit-post-button'><img height=20px src='media/edit.png'></div></div>");
            }

            // Add comment box
            $('#'+post['ID']).parent().append("<div class='form-comm' style='display:none; background-color: "+comment_color_class+"; margin-top:-20px;border-radius: 5px;' id='form-"+post['ID']+"'></div>")
            $('#form-'+post['ID']).append("<form class='comment-form' action='controllers/comment.php' enctype='multipart/form-data' method='POST' style='width: 100%;'><div class='d-flex flex-column' style='gap: 20px;'><div class='d-flex' style='gap: 20px; height: 40px;'><div class='profile-pic' style='height: 40px !important; width: 40px !important; background-image: url("+user_avatar+");'></div><input type='text' placeholder='Responde a "+post['Nombre']+"'id='content' name='content' class='search' style='padding: 10px; width: 100%;' value=''></div><div class='alert alert-danger alert-comm'role='alert'></div><div id='abajo-postear' class='d-flex justify-content-between' style='align-items:center;'><div class='div d-flex' id='icp' style='gap: 20px;'><label for=''><img style='cursor:pointer;' class='ico' width='20px' src='media/camara.svg' alt=''></label><label for='image'><img style='cursor:pointer;' class='ico' width='20px' src='media/imagen.svg' alt=''></label></div></div></form>");
            $('#form-'+post['ID']+' #icp').append("<input type='text' name='post_id' id='post_id' style='display:none;' value='"+post['ID']+"'><input type='text' name='user_id' id='user_id' style='display:none;' value='"+user_id+"'><input style='display:none;' type='file' class='form-control' id='image' name='image' accept='image/*' /><img style='cursor:pointer;' class='ico url-comment' width='20px' src='media/enlace-alt.svg' alt=''><a href='#'><img style='cursor:pointer;' class='ico' width='20px' src='media/marcador.svg' alt=''></a></div>");
            $('#form-'+post['ID']+' #abajo-postear').append("<button style='padding: 5px 30px;' class='btn-send-com btn btn-dark' type='submit'>Responder</button>");

            // If has comments, add them
            if(post['comments'].length>0){
                $('#form-'+post['ID']+' .comment-form').addClass("comment-form-line-bottom");
                const comments = post['comments'];
                for(let i=0;i<comments.length;i++){

                    // Check if has a URL and convert it into an <a> element
                    if(comments[i]['content'].includes('[url=')){
                        url = comments[i]['content'].split('[url=')[1].split("]")[0];
                        
                        let text = comments[i]['content'].split(']')[1].split('[')[0];
                        let regex = /\[url=.*\]/g;
                        let contenido = comments[i]['content'].replace(regex,'<a target="_blank" href="'+ url +'">');
                        contenido = contenido.split('>')
                        contenido[0] += '>'+text+'</a>';
                        comments[i]['content'] = contenido.join("");
                    }

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
        let post_id = $(this).parent().parent().parent().attr("id");
        if($("#form-"+post_id).is(':visible')){
            $("#form-"+post_id).slideUp('fast');
        }else if($("#form-"+post_id).is(':hidden')){
            $("#form-"+post_id).slideDown('fast');
        }
        })

        $("img.url-comment").on("click", function(){
            $("#add_url").attr("data-type","comment");
            console.log('click');
            let post_id = $(this).parent().parent().parent().parent().parent().prev('div')[0].id;
            $("#add_url").attr("data-id",post_id);
            $("#add_url").modal({
                escapeClose: false,
                showClose: false,
                clickClose: false
            });
        })

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
                                
                                if(new_comment['content'].includes('[url=')){
                                    url = new_comment['content'].split('[url=')[1].split("]")[0];
                                    
                                    let text = new_comment['content'].split(']')[1].split('[')[0];
                                    let regex = /\[url=.*\]/g;
                                    let contenido = new_comment['content'].replace(regex,'<a target="_blank" href="'+ url +'">');
                                    contenido = contenido.split('>')
                                    contenido[0] += '>'+text+'</a>';
                                    new_comment['content'] = contenido.join("");
                                }

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
                                if(new_comment['username'] == $(".username")[0].innerHTML.slice(1)){
                                    $('#comment-'+new_comment['ID']).append("<div class='d-flex justify-content-between'><div class='text-content'>"+new_comment['content']+"</div><div class='delete-comment-button'><img height=20px src='media/delete.png'></div></div>");
                                } else{
                                    $('#comment-'+new_comment['ID']).append("<div class='text-content'>"+new_comment['content']+"</div>");
                                }
                                //$('#comment-'+new_comment['ID']).append("<div class='d-flex justify-content-between'><div class='text-content'>"+new_comment['content']+"</div></div>");
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
        $(document).on("click", "#img-slide", function(){

            $(".mySlides").find("img").remove();
            let post_id = $(this).parent().parent().attr("id");
            let imagenes = $("#"+post_id+" #img-slide");
            for(let i=0; i<imagenes.length; i++){
                src = imagenes[i].attributes[3].nodeValue.split("(")[1].slice(0, -1);
                $(".mySlides").append("<img class='slide"+(i+1)+"' src='"+src+"' style='width:100%; display:none;'>");
            }

            $(".mySlides>img").each(function(){
                $(this).on("load", function(){
                    if($(this).height() > $(this).width()){
                        $(".mySlides>img").each(function(){
                            $(this).css("height", "90vh");
                        });
                        $("#slideshow-container").css("min-width", "fit-content");
                    } else{
                        $(".mySlides>img").each(function(){
                            $(this).css("min-width", "50vw");
                            $(this).css("width", "100%");
                            $(this).css("max-height", "90vh");
                        });
                    }
                })
            })

            let siblings = $(this).siblings().length + 1;
            let index = $(this).data("order");
            $(".slide"+index).addClass("slide-active");
            document.getElementsByClassName("numbertext")[0].innerHTML = index+" / "+siblings;
            let user_text = $("#"+post_id).children(":first").html();
            let post_content = $("#"+post_id+" .text-content").html();
            $("#slides-user-date")[0].innerHTML = user_text;
            $("#slides-text-content")[0].innerHTML = post_content;
            $(".mySlides").addClass("show");

            $("#slideshow-container").modal({
                showClose: false
            });
        })

        $(document).on("click", ".delete-post-button", function () {
            $("#estas-seguro").attr('data-type','post');
            $("#estas-seguro>div")[0].innerHTML = '<strong>¿Estás seguro que deseas eliminar este post?</strong>';
            let post_id = $(this).parent().parent().parent()[0].id;
            $("#estas-seguro").attr('data-id',post_id);
            $("#estas-seguro").modal({
                escapeClose: false,
                clickClose: false,
                showClose: false
            });
        })

        $("#cerrar-delete-modal").click(function(){
            $("#estas-seguro-comment").attr('data-id','');
            $("#estas-seguro-comment").attr('data-type','');
            $.modal.close();
        });

        $("#confirmar-delete-modal").click(function(){
            let type = $('#estas-seguro').attr("data-type");
            let id = $('#estas-seguro').attr("data-id");

            if(type == 'post'){
                $.ajax( "controllers/post.php?type=delete", {
                    type: 'POST',
                    dataType: 'text',
                    data: {'post_id' : id}
                }).then(function(respuesta){
                    if(respuesta == 'true'){
                        $("#posts").children().remove();
                        loadPosts();
        
                        $("#alert-warning").text('Post eliminado.');
                        $.modal.close();
                        $("#alert-warning").show('slow');
                        setTimeout(function(){
                            $("#alert-warning").hide('slow');
                            $("#alert-warning").text('');
                        }, 3000);
                    }
                })
            } else if(type == 'comment'){
                $.ajax( "controllers/comment.php?type=delete", {
                    type: 'POST',
                    dataType: 'text',
                    data: {'comment_id' : id}
                }).then(function(respuesta){
                    if(respuesta == 'true'){
                        $("#posts").children().remove();
                        loadPosts();
        
                        $("#alert-warning").text('Comentario eliminado.');
                        $.modal.close();
                        $("#alert-warning").show('slow');
                        setTimeout(function(){
                            $("#alert-warning").hide('slow');
                            $("#alert-warning").text('');
                        }, 3000);
                    }
                });
            }
        });

        $("#cerrar-edit-modal").click(function(){
            $('#alert-edit-post').text("");
            $('#alert-edit-post').hide();
            let input =  $('#edit-post input[type="file"]');
            let parent = input.parent();
            input.remove();
            parent.append('<input style="display:none;" type="file" class="form-control img-edit" id="edit-image" name="edit-image[]" accept="image/*" multiple="">');
            $.modal.close();
        });

        $("#confirmar-edit-modal").click(function(){
            let content = $("#text-edit-post").val();
            let existingImages = $("#edit-existing-images>div:not(#output-container)");
            let eImages = [];
            let a = 0;
            for(let image of existingImages){
                eImages[a] = image.outerHTML.substring(image.outerHTML.indexOf('(')+1, image.outerHTML.indexOf(')'));
                a++;
            }
            let images = $("#edit-post input[type='file']")[0].files;
            let post_id = $('#edit-post>span').attr("value");
            let formData = new FormData();
            for(let image of images){
                formData.append('images[]', image);
            }

            let data = {'post_id' : post_id,
                        'content' : content,
                        'eimages' : JSON.stringify(eImages)};

            formData.append('data', JSON.stringify(data));
            console.log(formData);
            if(content != ''){
                $.ajax( "controllers/post.php?type=edit", {
                    type: 'POST',
                    data: formData,
                    processData:false,
                    contentType: false
                }).then(function(respuesta){
                    console.log(respuesta);
                    if(respuesta == 'true'){
                        $("#posts").children().remove();
                        userPosts();
                        $.modal.close();
                        $("#alert-success").text('Post editado.');
                        $("#alert-success").show('slow');
                        setTimeout(function(){
                            $("#alert-success").hide('slow');
                        }, 3000);
                        $("html, body").animate({ scrollTop: 0 }, 600);

                    } else if(respuesta == 'false'){
                        $.modal.close();
                        $('#alert-danger').text("Ha ocurrido un error editando el post.");
                        $("#alert-danger").show('slow');
                        setTimeout(function(){
                            $("#alert-danger").hide('slow');
                            $("#alert-danger").text('');
                        }, 3000);
                    }
                })
            } else {
                $('#alert-edit-post').text("Debes introducir algo de texto.");
                $('#alert-edit-post').show();
            }
        });

        $(document).on("click", ".delete-comment-button", function () {
            $("#estas-seguro").attr('data-type','comment');
            console.log($("#estas-seguro>div"));
            $("#estas-seguro>div")[0].innerHTML = '<strong>¿Estás seguro que deseas eliminar este comentario?</strong>';
            let form_id = $(this).parent().parent().attr('id');
            let comment_id = form_id.split('-')[1];
            
            $("#estas-seguro").modal({
                escapeClose: false,
                clickClose: false,
                showClose: false
            });

            $("#estas-seguro").attr('data-id',comment_id);
        });

        $("#confirmar-delete-modal-comment").click(function(){
            let comment_id = $("#"+$(this).parent().parent().attr('id')+" span").attr('id');
            
        })
    })
    }

    console.log($("#posts").children().length);
    if($("#posts").children().length == 0){
        userPosts();

        $(window).scroll(function () {
            if($("#posts>div").length > 0){
            // End of the document reached?
            if ($(document).height() - $(this).height() == $(this).scrollTop()) {
                    $("body").append("<div class='loader'></div>");
                    //Get posts and display them
                    let user_id = $("#profile-avatar").attr('data-id');
                    let user_avatar = $(".profile-pic")[0].style.backgroundImage.slice(4, -1).replace(/"/g, "");
                    var user_username = document.getElementById('username').innerText;
                    let type = 'userScroll';
                    let countPost = $("#posts>div").length/2;
                
                    // Ajax request
                    $.ajax( "controllers/posts.php?type="+type, {
                                type: 'POST',
                                dataType: 'json',
                                data: {'user_id' : user_id,
                                        'offset_value' : countPost}
                    }).then(function(respuesta){
                        console.log(respuesta);
                        if(respuesta.length > 0){
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
                
                            if(post['content'].includes('[url=')){
                                url = post['content'].split('[url=')[1].split("]")[0];
                                
                                let text = post['content'].split(']')[1].split('[')[0];
                                let regex = /\[url=.*\]/g;
                                let contenido = post['content'].replace(regex,'<a target="_blank" href="'+ url +'">');
                                contenido = contenido.split('>')
                                contenido[0] += '>'+text+'</a>';
                                post['content'] = contenido.join("");
                            }
                
                            let edited = '';
                            if(post['edited'] == 1){
                                edited = "<small style='margin-right: 5px;'>edited on</small>";
                            } else{
                                edited = '';
                            }
                
                            // Append each post
                            $('#posts').append("<div id='"+post['ID']+"' class='d-flex flex-column post " + color_class + "'></div>");
                            $('#'+post['ID']).append("<div class='user_and_date'><a style='color:white;' href='profile.php?user="+post['username']+"'><div class='user-info'><div class='profile-pic post-user-image' style='background-image: url("+post['avatar']+");'></div><span class='name'>"+post['Nombre']+"</span><span class='username'> @"+post['username']+"</span></div></a><span>"+edited+date+"</span></div>");
                            $('#'+post['ID']).append("<div class='text-content'>"+post['content']+"</div>");
                            if(post['image4'].length > 0){
                                $('#'+post['ID']).append("<div class='grid4'><div id='img-slide' data-order='1' class='grid4-img' style='background-image: url("+post['image']+")'></div><div id='img-slide' data-order='2' class='grid4-img' style='background-image: url("+post['image2']+")'></div><div id='img-slide' class='grid4-img' data-order='3' style='background-image: url("+post['image3']+")'></div><div id='img-slide' class='grid4-img' data-order='4' style='background-image: url("+post['image4']+")'></div>");
                            } else if(post['image4'].length < 1 && post['image3'].length > 0){
                                $('#'+post['ID']).append("<div class='grid3'><div id='img-slide' class='grid3-img' data-order='1' style='background-image: url("+post['image']+")'></div><div id='img-slide' class='grid3-img' data-order='2' style='background-image: url("+post['image2']+")'></div><div id='img-slide' class='grid3-img grid3-imgbot' data-order='3' style='background-image: url("+post['image3']+")'></div>");
                            } else if(post['image3'].length < 1 && post['image2'].length > 0){
                                $('#'+post['ID']).append("<div class='grid2'><div id='img-slide' class='grid2-img' data-order='1' style='background-image: url("+post['image']+")'></div><div id='img-slide' class='grid2-img' data-order='2' style='background-image: url("+post['image2']+")'></div></div>");
                            } else if(post['image2'].length < 1 && post['image'].length > 0){
                                $('#'+post['ID']).append("<div class='grid1'><div id='img-slide' class='grid1-img' data-order='1' style='background-image: url("+post['image']+")'></div></div>");
                            }
                
                            // If the post is liked by the current user, add correpondent class
                            if(post['liked'] == 1){
                                liked_class = 'liked';
                            } else {
                                liked_class = '';
                            }
                
                            $('#'+post['ID']).append("<div class='likes_comment_count' style='display:flex; gap:10px; align-items: center;position:relative;' id='count' class='d-flex'><div class='likes-count "+liked_class+"'><a id='likes' href='likes.php?id="+post['ID']+"' rel='modal:open'><span id='likes-count'>"+post['likes']+"</span><span> Likes</span></a></div></div>");
                            $('#'+post['ID']+' #count').append("<div class='likes-count "+liked_class+"'><a class='comments-button' style='cursor: pointer;'><span id='comments-count'>"+post['count-comm']+"</span><span> Comment</span></a></div>");
                
                            $('#'+post['ID']).append("<div style='gap:10px; align-items: center;position:relative;' id='likes-com' class='d-flex'><div class='like "+liked_class+"'><img class='pulgar' height=20px src='media/like.png'></div></div>");
                
                            if(post['username'] == user_username){
                                $('#'+post['ID']+' #likes-com').append("<div class='edit-delete-buttons'><div class='delete-post-button'><img height=20px src='media/delete.png'></div><div class='edit-post-button'><img height=20px src='media/edit.png'></div></div>");
                            }
                
                            // Add comment box
                            $('#'+post['ID']).parent().append("<div class='form-comm' style='display:none; background-color: "+comment_color_class+"; margin-top:-20px;border-radius: 5px;' id='form-"+post['ID']+"'></div>")
                            $('#form-'+post['ID']).append("<form class='comment-form' action='controllers/comment.php' enctype='multipart/form-data' method='POST' style='width: 100%;'><div class='d-flex flex-column' style='gap: 20px;'><div class='d-flex' style='gap: 20px; height: 40px;'><div class='profile-pic' style='height: 40px !important; width: 40px !important; background-image: url("+user_avatar+");'></div><input type='text' placeholder='Responde a "+post['Nombre']+"'id='content' name='content' class='search' style='padding: 10px; width: 100%;' value=''></div><div class='alert alert-danger alert-comm'role='alert'></div><div id='abajo-postear' class='d-flex justify-content-between' style='align-items:center;'><div class='div d-flex' id='icp' style='gap: 20px;'><label for=''><img style='cursor:pointer;' class='ico' width='20px' src='media/camara.svg' alt=''></label><label for='image'><img style='cursor:pointer;' class='ico' width='20px' src='media/imagen.svg' alt=''></label></div></div></form>");
                            $('#form-'+post['ID']+' #icp').append("<input type='text' name='post_id' id='post_id' style='display:none;' value='"+post['ID']+"'><input type='text' name='user_id' id='user_id' style='display:none;' value='"+user_id+"'><input style='display:none;' type='file' class='form-control' id='image' name='image' accept='image/*' /><img style='cursor:pointer;' class='ico url-comment' width='20px' src='media/enlace-alt.svg' alt=''><a href='#'><img style='cursor:pointer;' class='ico' width='20px' src='media/marcador.svg' alt=''></a></div>");
                            $('#form-'+post['ID']+' #abajo-postear').append("<button style='padding: 5px 30px;' class='btn-send-com btn btn-dark' type='submit'>Responder</button>");
                
                            // If has comments, add them
                            if(post['comments'].length>0){
                                $('#form-'+post['ID']+' .comment-form').addClass("comment-form-line-bottom");
                                const comments = post['comments'];
                                for(let i=0;i<comments.length;i++){
                
                                    // Check if has a URL and convert it into an <a> element
                                    if(comments[i]['content'].includes('[url=')){
                                        url = comments[i]['content'].split('[url=')[1].split("]")[0];
                                        
                                        let text = comments[i]['content'].split(']')[1].split('[')[0];
                                        let regex = /\[url=.*\]/g;
                                        let contenido = comments[i]['content'].replace(regex,'<a target="_blank" href="'+ url +'">');
                                        contenido = contenido.split('>')
                                        contenido[0] += '>'+text+'</a>';
                                        comments[i]['content'] = contenido.join("");
                                    }
                
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
                        } else{
                            $("#alert-success").text('No hay más post por cargar.');
                            $("#alert-success").show('slow');
                            setTimeout(function(){
                                $("#alert-success").hide('slow');
                            }, 3000);
                        }
                    $("div.loader").remove();
                    })
        }
        };
        })
    }

    

    let type = 'user';
    // Function that executes every 0.5 seconds, reads and update number of likes on each post.
    function refreshLikes(){
        $.ajax( "controllers/posts.php?type="+type, {
            type: 'POST',
            dataType: 'text',
            data: {'user_id' : user_id}
        }).then(function(respuesta){
            respuesta = JSON.parse(respuesta);
            for(var post of respuesta){
                $('#'+post['ID']+' #likes-count').text(post['likes']);
            }
        })
    };

    setInterval(refreshLikes, 500);

    // Function for make likes and unlikes
    $(document).on("click", ".pulgar", function () {
        let post_id = $(this).parent().parent().parent().attr("id");
        console.log(post_id);
        // If is already liked, send request to unlike & remove liked class
        if($(this).parent().hasClass('liked')){
            $.ajax("controllers/likes.php?type=unlike",{
                type: 'POST',
                dataType: 'bool',
                data: {'user_id' : user_id,
                        'post_id' : post_id}
            });
            $(this).parent().removeClass('liked');
        }else{
            console.log("NO tiene liked");
            user_id = $("#user_id").text();
            // If is not liked, send request to like & add liked class
            $.ajax("controllers/likes.php?type=like",{
                type: 'POST',
                dataType: 'bool',
                data: {'user_id' : user_id,
                        'post_id' : post_id}
            });

            $(this).parent().addClass('liked');
        }
    });

    

    if($("#profile-username").text().replace('@','') == getCookie('usuario')){
        
        let input_profilepic = document.getElementById("update-profilepic");

        input_profilepic.addEventListener("input", async (event) => {
            console.log("Input registered.");
            console.log(input_profilepic.files);
            if(confirm("¿Estás seguro que deseas reemplazar tu foto de perfil?")){
                let user_id = $("#profile-avatar").attr('data-id');
                console.log(input_profilepic.files[0]);
                var formData = new FormData();
                formData.append('user_id', user_id);
                formData.append('image', input_profilepic.files[0]);
                $.ajax('controllers/user.php?type=updatePhoto',{
                    method: 'POST',
                    type: 'json',
                    data: formData,
                    processData: false,
                    contentType: false
                }).then(function(result){
                    if(result == 'success'){
                        location.reload();
                    } else if(result == 'error'){
                        alert("Ha habido un error!");
                    }
                })
            }
        })

        let input_banner = document.getElementById("update-banner");

        input_banner.addEventListener("input", async (event) => {
            console.log("Input registered.");
            console.log(input_profilepic.files);
            if(confirm("¿Estás seguro que deseas reemplazar tu banner?")){
                let user_id = $("#profile-avatar").attr('data-id');
                console.log(input_banner.files[0]);
                var formData = new FormData();
                formData.append('user_id', user_id);
                formData.append('image', input_banner.files[0]);
                $.ajax('controllers/user.php?type=updateBanner',{
                    method: 'POST',
                    type: 'json',
                    data: formData,
                    processData: false,
                    contentType: false
                }).then(function(result){
                    if(result == 'success'){
                        location.reload();
                    } else if(result == 'error'){
                        alert("Ha habido un error!");
                    }
                })
            }
        })
    
        $("#profile-avatar").on( "mouseenter", function(){
            $(this).append("<img src='media/edit.png' width='50px' style='position: relative; left: 50px; top: 50px;' />")
        } ).on( "mouseleave", function(){
            $(this).children().remove();
        } );
    
        $("#label-banner").on( "mouseenter", function(){
            $("#profile-banner").append("<img src='media/edit.png' width='50px' style='position: absolute; left: 50%; top: 50%;' />")
        } ).on( "mouseleave", function(){
            $("#profile-banner").children().remove();
        } );
    }


});