let canvas = document.getElementById("gameScreen");
let c = canvas.getContext("2d");
var x = 20;
var y = 20;
var size = 100;
var color = "red";
document.addEventListener("keydown", function(event){
    console.log(event.which);
    if(event.which == 87){
        c.clearRect(x,y,size,size);
        c.fillStyle = color;
        y -= 20;
        if(y <= 0){
            y = 0;
        }
        c.fillRect(x,y,size,size);
    }
    if(event.which == 65){
        c.clearRect(x,y,size,size);
        c.fillStyle = color;
        x -= 20;
        if(x <= 0){
            x = 0;
        }
        c.fillRect(x,y,size,size);
    }
    if(event.which == 83){
        c.clearRect(x,y,size,size);
        c.fillStyle = color;
        y += 20;
        if(y >= 600){
            y = 600;
        }
        c.fillRect(x,y,size,size);
    }
    if(event.which == 68){
        c.clearRect(x,y,size,size);
        c.fillStyle = color;
        x += 20;
        if(x >= 800){
            x = 800;
        }
        c.fillRect(x,y,size,size);
    }
    if(event.which == 32){
        c.clearRect(x,y,size,size);
        c.fillStyle = color;
        x -= 20;
        if(x <= 0){
            x = 0;
        }
        c.fillRect(x,y,size,size);
    }
})

c.fillStyle = color;
c.fillRect(x,y,size,size);