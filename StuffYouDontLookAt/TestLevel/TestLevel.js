let canvas = document.getElementById("gameScreen");
let c = canvas.getContext("2d");
$MyCanvas = $("#gameScreen");
var size = 20;
var position = [0,29];
var Obsticals = [[5,10,2,2,"dynamicy", 5, 10, "up"]];
var color = "blue";
var jump = false;
var left = false;
var right = false;
document.addEventListener("keydown", function(event){
    console.log(event.which);
    // w
    if(event.which == 87){
      ErasePlayer();
        if(jump == false){
            position[1] -= 3;
            jump = true;
            if(left == true){
              position[0] -= 2;
            }
            if(right == true){
              position[0] += 2;
            }
        }

        DrawPlayer();

    }
    //a
    if(event.which == 65){
        ErasePlayer();
        position[0] -= 1;
        if(position[0] <= 0){
            position[0] = 0;
        }
        DrawPlayer();
        left = true;
    }
    //d
    if(event.which == 68){
        ErasePlayer();
        position[0] += 1;
        if(position[0] >= 40){
            position[0] = 40;
        }
        DrawPlayer();
        right = true;
    }
    //space
    if(event.which == 32){
      ErasePlayer();
        if(jump == false){
            position[1] -= 3;
            jump = true;
            if(left == true){
              position[0] -= 2;
            }
            if(right == true){
              position[0] += 2;
            }
        }

        DrawPlayer();
    }
});

document.addEventListener("keyup", function(event){
    console.log(event.which);
    //a
    if(event.which == 65){
        left = false;
    }
    //d
    if(event.which == 68){
      right = false;
    }
});
function PlayerGravity(){
    position[1] += 1;
    if(position[1] >= 30){
        position[1] -= 1;
        jump = false;
    }
    DrawPlayer();
}
function DrawPlayer(){
    c.fillStyle = color;
    c.fillRect(position[0]*20, position[1]*20, size, size);
}
function ClearObstacles(){
    Obsticals.forEach(Ob => {
        c.clearRect(Ob[0]*20, Ob[1]*20, Ob[2]*20, Ob[3]*20);
    });
}
function DrawObstacles(){
    ClearObstacles();
    Obsticals.forEach(Ob => {
        if(Ob[4] == "static"){
            var ObColor = "purple";
        }
        if(Ob[4] == "dynamicx"){
            var ObColor = "red";
            if(Ob[7] == "up"){
                Ob[0] += 1;
            }
            if(Ob[7] == "down"){
                Ob[0] -= 1;
            }
            if(Ob[1] >= Ob[6]){
                Ob[7] = "down";
            }
            if(Ob[1] <= Ob[5]){
                Ob[7] = "up";
            }
        }
        if(Ob[4] == "dynamicy"){
            var ObColor = "orange";
            if(Ob[7] == "up"){
                Ob[1] += 1;
            }
            if(Ob[7] == "down"){
                Ob[1] -= 1;
            }
            if(Ob[1] >= Ob[6]){
                Ob[7] = "down";
            }
            if(Ob[1] <= Ob[5]){
                Ob[7] = "up";
            }
        }
        c.fillStyle = ObColor;
        c.fillRect(Ob[0]*20, Ob[1]*20, Ob[2]*20, Ob[3]*20);

    });
}
function ErasePlayer(){
    c.clearRect(position[0]*20, position[1]*20, size, size);
}
function Game(){
    ErasePlayer();
    PlayerGravity();
    DrawPlayer();
    DrawObstacles();


}
var interval = setInterval(Game, 120);
