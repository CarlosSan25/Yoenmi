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
