window.onload = function(){
    document.onmousemove = function(e){
        var clouds = document.querySelectorAll(".cloud");

        var x = e.clientX/50 + 970;
        var y = e.clientY/50 +100;

        clouds[0].style.top = y + "px";
        clouds[0].style.left = x + "px";

        var x = e.clientX/50 + 300;
        var y = e.clientY/50 + 20;

        clouds[1].style.top = y + "px";
        clouds[1].style.left = x + "px";
        
        var x = e.clientX/50 + 100;
        var y = e.clientY/50 + 500;

        clouds[2].style.top = y + "px";
        clouds[2].style.left = x + "px";
    }
}