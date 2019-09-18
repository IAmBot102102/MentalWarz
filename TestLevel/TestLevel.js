// let canvas = document.getElementById("gameScreen");
// let c = canvas.getContext("2d");
let canvas = $("#gameScreen");
const canvasBounds = { bottom: 500, top: 0, left: 0, right: 750 };
const player = { height: 40, width: 40 };
let playerPos = { x: 40, y: 480 };
let playerSpeed = { x: 0, y: 0 };
const friction = 0.89;
const airfriction = 0.97;
const gravity = 0.8;
let directions = { left: false, right: false, up: false };
const speed = 7.5;
const speedIncrement = 0.8;
const jumpSpeed = 20;
let onGround = true;



function CheckCollision(PlayerX, PlayerY, PlayerSizeX, PlayerSizeY, ObstacleX, ObstacleY, ObstacleSizeX, ObstacleSizeY){
  for(ex = ObstacleX; ex < ObstacleX + 1 + ObstacleSizeX; ex++){
    for(ey = ObstacleY; ey < ObstacleY + 1 + ObstacleSizeY; ey++){
      if(ex <= PlayerX + PlayerSizeX && ex >= PlayerX){
        if(ey <= PlayerY + PlayerSizeY && ey >= PlayerY){
          return true;
        }
      }
    }
  }
  return false;
}



$("body").keydown(function(event) {
 if (event.keyCode === 37) {
   directions.left = true;
 }
 if (event.keyCode === 39) {
   directions.right = true;
 }
 if (event.keyCode === 38) {
   directions.up = true;
 }
 console.log(event.keyCode);
});

$("body").keyup(function(event) {
 if (event.keyCode === 37) {
   directions.left = false;
 }
 if (event.keyCode === 39) {
   directions.right = false;
 }
 if (event.keyCode === 38) {
   directions.up = false;
 }
 //
console.log(event.keyCode);
});

function render() {
 canvas.clearCanvas();

 if (directions.left) {
   playerSpeed.x > -1 * speed
     ? (playerSpeed.x -= speedIncrement)
     : (playerSpeed.x = -1 * speed);
 }
 if (directions.right) {
   playerSpeed.x < speed
     ? (playerSpeed.x += speedIncrement)
     : (playerSpeed.x = speed);
 }
 if (onGround && directions.up) playerSpeed.y = -1 * jumpSpeed;

 playerSpeed.y += gravity;
 playerPos.x += playerSpeed.x;
 playerPos.y += playerSpeed.y;

 onGround = false;

 if (playerPos.y > canvasBounds.bottom - player.height / 2) {
   playerPos.y = canvasBounds.bottom - player.height / 2;
   playerSpeed.y = 0;
   onGround = true;
 }
 if (playerPos.y < canvasBounds.top + player.height / 2) {
   playerPos.y = canvasBounds.top + player.height / 2;
   playerSpeed.y = 0;
 }
 if (playerPos.x > canvasBounds.right - player.height / 2) {
   playerPos.x = canvasBounds.right - player.height / 2;
   playerSpeed.x = 0;
 }
 if (playerPos.x < canvasBounds.left + player.height / 2) {
   playerPos.x = canvasBounds.left + player.height / 2;
   playerSpeed.x = 0;
 }

 if (
   (!directions.left && !directions.right) ||
   (directions.right && directions.left)
 )
   onGround ? (playerSpeed.x *= friction) : (playerSpeed.x *= airfriction);

 if (playerSpeed.x < (10 ^ -4) && playerSpeed.x > 0) {
   playerSpeed.x = 0;
 }
 if (playerSpeed.x > (-10 ^ -4) && playerSpeed.x < 0) {
   playerSpeed.x = 0;
 }


 canvas.drawRect({
   fillStyle: "#000",
   x: playerPos.x,
   y: playerPos.y,
   width: player.width,
   height: player.height
 });
}

var interval = setInterval(render, 10);
