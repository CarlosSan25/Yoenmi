window.onload = function(){
        let box = document.querySelector(".login-main");
        let boxBoundingRect = box.getBoundingClientRect();
        let boxCenter= {
            x: boxBoundingRect.left + boxBoundingRect.width/2, 
            y: boxBoundingRect.top + boxBoundingRect.height/2
        };

        document.addEventListener("mousemove", e => {
        let angle = Math.atan2(e.pageX - boxCenter.x, - (e.pageY - boxCenter.y) )*(180 / Math.PI);
        angle = (angle/10);      
        box.style.transform = `rotate3d(1,1,1,${angle}deg)`;
        })
}

let ojo = document.querySelector("#ojo-pass");
let input = document.getElementById("password");

ojo.addEventListener('click', function(){
    if(input.type == "text"){
        input.type = "password";
        ojo.src = "http://localhost/yoenmi/media/ojo-pass.png";
    } else{
        input.type = "text";
        ojo.src = "http://localhost/yoenmi/media/ojo-pass-no.png";
    }
});

console.log($("div.alert-danger").text());
if($("div.alert-danger").text() != ''){
    console.log("Okeeeeeey");
    $("div.alert-danger").show('slow');
    setTimeout(function(){
        $("div.alert-danger").hide('slow');
        $("div.alert-danger").text('');
    }, 3000);
}