window.onload = function(){
let checkbox = document.getElementById("light_mode");
let body = document.getElementsByTagName("body");

if(checkbox.checked){ 
    body[0].style.backgroundColor = "#1d1e22";
    body[0].style.color = "white";
} else{
    body[0].style.backgroundColor = "white";
    body[0].style.color = "black";
}

checkbox.addEventListener('change', function (){
    if(checkbox.checked){ 
        body[0].style.backgroundColor = "#1d1e22";
        body[0].style.color = "white";
    } else{
        body[0].style.backgroundColor = "white";
        body[0].style.color = "black";
    }
})
}