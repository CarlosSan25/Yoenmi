window.onload = function(){
    let checkbox = document.getElementById("light_mode");
    let body = document.getElementsByTagName("body");
    let time = new Date();
    let expireTime = time.getTime() + 86400000*30.5;
    time.setTime(expireTime);

    // Function to read a stored cookie
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    // Functions to simplify query selector & query selector All 
    function qs(query){
        return document.querySelector(query);
    }

    function qsA(query){
        return document.querySelectorAll(query);
    }

    let cookie = getCookie("color_mode");

    // Set styles depending on the color_mode cookie
    if(cookie == 'dark'){
        body[0].style.backgroundColor = "#1d1e22";
        body[0].style.color = "white";
        document.cookie = "color_mode=dark;expires="+time;
        qs(".logo-text").style.color = "white";
        qs(".logo img").src = "media/Logo Aplicación Blanco.png";
        var icos = qsA(".menu-left .ico");
        icos.forEach(function(element){
            element.style.filter = "invert(100%)";
        });
        qs(".weather").style.color = "white";
        qs(".mainframe").style.backgroundColor = "#17181c";
        qs(".whats-new").style.backgroundColor =  "#1e1f23";
        var search = qsA(".search");
        search.forEach(function(element){
            element.style.backgroundColor = "#686864";
            element.style.boxShadow = "none";
        })
        qs(".left-side").style.boxShadow = "3px 1px 5px -2px black";
        var posts = qsA(".post");
        posts.forEach(function(element){
            element.classList.add("post-dark");
        });
        var see_likes = qsA("#see-likes");
        see_likes.forEach(function(element){
            element.style.filter = 'invert(1)';
        });
        checkbox.checked = true;
    } else if(cookie == 'light' || cookie == null){
        body[0].style.backgroundColor = "white";
        body[0].style.color = "black";
        document.cookie = "color_mode=light;expires="+time;
        qs(".logo-text").style.color = "black";
        qs(".logo img").src = "media/Logo BLANCO.png";
        var icos = qsA(".menu-left .ico");
        icos.forEach(function(element){
            element.style.filter = "invert(0)";
        });
        qs(".weather").style.color = "white";
        qs(".mainframe").style.backgroundColor = "white";
        qs(".whats-new").style.backgroundColor =  "#0160b157";
        var search = qsA(".search");
        search.forEach(function(element){
            element.style.backgroundColor = "white";
            element.style.border = "solid 1px gray";
            element.style.boxShadow = "1px 0.5px 4px gray";
        })
        qs(".left-side").style.boxShadow = "3px 1px 5px -2px gray";
        var posts = qsA(".post");
        posts.forEach(function(element){
            element.classList.add("post-light");
        });
        var see_likes = qsA("#see-likes");
        see_likes.forEach(function(element){
            element.style.filter = 'invert(0)';
        });
        checkbox.checked = false;
    }

    // Set styles and store a cookie if color_mode switch changes
    checkbox.addEventListener('change', function (){
        if(checkbox.checked){ 
            body[0].style.backgroundColor = "#1d1e22";
            body[0].style.color = "white";
            document.cookie = "color_mode=dark;expires="+time;
            qs(".logo-text").style.color = "white";
            qs(".logo img").src = "media/Logo Aplicación Blanco.png";
            var icos = qsA(".menu-left .ico");
            icos.forEach(function(element){
                element.style.filter = "invert(100%)";
            });
            qs(".weather").style.color = "white";
            qs(".mainframe").style.backgroundColor = "#17181c";
            qs(".whats-new").style.backgroundColor =  "#1e1f23";
            var search = qsA(".search");
            search.forEach(function(element){
                element.style.backgroundColor = "#686864";
                element.style.boxShadow = "none";
            })
            qs(".left-side").style.boxShadow = "3px 1px 5px -2px black";
            var posts = qsA(".post");
            posts.forEach(function(element){
                element.classList.replace("post-light","post-dark");
            });
            var see_likes = qsA("#see-likes");
            see_likes.forEach(function(element){
                element.style.filter = 'invert(1)';
            });
            var comments = qsA('.form-comm');
            comments.forEach(function(element){
                element.style.backgroundColor = 'rgb(26 30 45)';
            });
        } else{
            body[0].style.backgroundColor = "white";
            body[0].style.color = "black";
            document.cookie = "color_mode=light;expires="+time;
            qs(".logo-text").style.color = "black";
            qs(".logo img").src = "media/Logo BLANCO.png";
            var icos = qsA(".menu-left .ico");
            icos.forEach(function(element){
                element.style.filter = "invert(0)";
            });
            qs(".weather").style.color = "white";
            qs(".mainframe").style.backgroundColor = "white";
            qs(".whats-new").style.backgroundColor =  "#0160b157";
            var search = qsA(".search");
            search.forEach(function(element){
                element.style.backgroundColor = "white";
                element.style.border = "solid 1px gray";
                element.style.boxShadow = "1px 0.5px 4px gray";
            })
            qs(".left-side").style.boxShadow = "3px 1px 5px -2px gray";
            var posts = qsA(".post");
            posts.forEach(function(element){
                element.classList.replace("post-dark","post-light");
            });
            var see_likes = qsA("#see-likes");
            see_likes.forEach(function(element){
                element.style.filter = 'invert(0)';
            });
            var comments = qsA('.form-comm');
            comments.forEach(function(element){
                element.style.backgroundColor = 'rgb(13 87 151 / 65%)';
            });
        }
    })

    // Slow the background weather widget video and change it depending if its day or night
    var video = document.getElementById("back-weather"); 
    video.playbackRate = 0.5;
    var isday = document.getElementById("is_day");
    if(isday.innerHTML != "Day"){
        video.style.filter = "blur(0px)";
    } else{
        video.style.filter = "blur(5px)";
    }

    // Right top dropdown menú
    $(".dropdown-toggle").click(function(){
        if($(".dropdown-menu").is(':visible')){
            $(".dropdown-menu").slideUp('fast');
        }else if($(".dropdown-menu").is(':hidden')){
                $(".dropdown-menu").slideDown('fast');
        }
    })



    $("#home").click(function(){
        $(location).attr('href','welcome.php');
    });

    $("#explore").click(function(){
        $(location).attr('href','explore.php');
    });

    // Scroll to top button
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('a.scroll-top').fadeIn('slow');
        } else {
            $('a.scroll-top').fadeOut('slow');
        }
    });
    $('a.scroll-top').click(function(event) {
        event.preventDefault();
        $('html, body').animate({scrollTop: 0});
    });
}