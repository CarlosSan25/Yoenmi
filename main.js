window.onload = function(){
    let checkbox = document.getElementById("light_mode");
    let body = document.getElementsByTagName("body");
    let time = new Date();
    let expireTime = time.getTime() + 86400000*30.5;
    time.setTime(expireTime);
    let cookies = document.cookie;

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
        checkbox.checked = true;
    } else if(cookie == 'light'){
        body[0].style.backgroundColor = "white";
        body[0].style.color = "black";
        checkbox.checked = false;
    }

    checkbox.addEventListener('change', function (){
        if(checkbox.checked){ 
            body[0].style.backgroundColor = "#1d1e22";
            body[0].style.color = "white";
            document.cookie = "color_mode=dark;expires="+time;
            
        } else{
            body[0].style.backgroundColor = "white";
            body[0].style.color = "black";
            document.cookie = "color_mode=light;expires="+time;
        }
    })

    $(".dropdown-toggle").click(function(){
        if($(".dropdown-menu").is(':visible')){
            $(".dropdown-menu").slideUp('slow');
        }else if($(".dropdown-menu").is(':hidden')){
                $(".dropdown-menu").slideDown('slow');
        }
    }
    )
}