window.onload = function(){
    let checkbox = document.getElementById("light_mode");
    let body = document.getElementsByTagName("body");
    let time = new Date();
    let expireTime = time.getTime() + 86400000*30.5;
    time.setTime(expireTime);

    // Funcion para leer las cookies
    function getCookie(name) {
        let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ));
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    let cookie = getCookie("color_mode");

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
        checkbox.checked = true;
    } else if(cookie == 'light'){
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
        checkbox.checked = false;
    }

    function qs(query){
        return document.querySelector(query);
    }

    function qsA(query){
        return document.querySelectorAll(query);
    }

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
        }
    })

    var video = document.getElementById("back-weather"); 
    video.playbackRate = 0.5;
    var isday = document.getElementById("is_day");
    if(isday.innerHTML != "Day"){
        video.style.filter = "blur(0px)";
    } else{
        video.style.filter = "blur(5px)";
    }

    $(".dropdown-toggle").click(function(){
        if($(".dropdown-menu").is(':visible')){
            $(".dropdown-menu").slideUp('slow');
        }else if($(".dropdown-menu").is(':hidden')){
                $(".dropdown-menu").slideDown('slow');
        }
    })
}