// let canvas = document.getElementById("gameScreen");
// let c = canvas.getContext("2d");
let canvas = $('#gameScreen');
const canvasBounds = { bottom: 500, top: 0, left: 0, right: 750 };
const player = { height: 30, width: 30, x: 40, y: 480, vx: 0, vy: 0 };
let obstacles = [];
const friction = 0.81;
const airfriction = 0.95;
const gravity = 1.3;
let directions = { left: false, right: false, up: false };
const speed = 12;
const speedIncrement = 1.2;
const jumpSpeed = 20;
let onGround = true;

function createObstacle(height, width, x, y, color) {
	obstacles.push({ height: height, width: width, x: x, y: y, color: color });
}

// function CheckCollision(
// 	PlayerX,
// 	PlayerY,
// 	PlayerSizeX,
// 	PlayerSizeY,
// 	ObstacleX,
// 	ObstacleY,
// 	ObstacleSizeX,
// 	ObstacleSizeY
// ) {
// 	for (ex = ObstacleX; ex < ObstacleX + 1 + ObstacleSizeX; ex++) {
// 		for (ey = ObstacleY; ey < ObstacleY + 1 + ObstacleSizeY; ey++) {
// 			if (ex <= PlayerX + PlayerSizeX && ex >= PlayerX) {
// 				if (ey <= PlayerY + PlayerSizeY && ey >= PlayerY) {
// 					return true;
// 				}
// 			}
// 		}
// 	}
// 	return false;
// }

function checkCollision(player, object) {
	if (
		player.x < object.x + object.width &&
		player.x + player.width > object.x &&
		player.y < object.y + object.height &&
		player.y + player.height > object.y
	) {
		return true;
	} else return false;
}

$('body').keydown(function(event) {
	if (event.keyCode === 37) {
		directions.left = true;
	}
	if (event.keyCode === 39) {
		directions.right = true;
	}
	if (event.keyCode === 38) {
		directions.up = true;
	}
	// console.log(event.keyCode);
});

$('body').keyup(function(event) {
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
	// console.log(event.keyCode);
});

function render() {
	canvas.clearCanvas();

	if (directions.left) {
		player.vx > -1 * speed ? (player.vx -= speedIncrement) : (player.vx = -1 * speed);
	}
	if (directions.right) {
		player.vx < speed ? (player.vx += speedIncrement) : (player.vx = speed);
	}
	if (onGround && directions.up) player.vy = -1 * jumpSpeed;

	player.vy += gravity;
	player.x += player.vx;
	player.y += player.vy;
	console.log(player.y + ' ' + player.vy);

	onGround = false;

	for (var i = 0; i < obstacles.length; i++) {
		// if (player.vx < 0) {
		// 	if (
		// 		CheckCollision(
		// 			player.x,
		// 			player.y,
		// 			player.width,
		// 			player.height,
		// 			obstacles[i].x,
		// 			obstacles[i].y,
		// 			obstacles[i].width,
		// 			obstacles[i].height
		// 		) == true
		// 	) {
		// 		player.vx = 0;
		// 		player.x = obstacles[i].x + obstacles[i].width / 2 + player.width / 2;
		// 	}
		// }
		if (player.vx < 0) {
			if (checkCollision(player, obstacles[i]) == true) {
				player.vx = 0;
				player.x = obstacles[i].x + obstacles[i].width;
			}
		}
		if (player.vx > 0) {
			if (checkCollision(player, obstacles[i]) == true) {
				player.vx = 0;
				player.x = obstacles[i].x - player.width;
			}
		}
	}

	if (player.y > canvasBounds.bottom - player.height) {
		player.y = canvasBounds.bottom - player.height;
		player.vy = 0;
		onGround = true;
	}
	if (player.y < canvasBounds.top + player.height) {
		player.y = canvasBounds.top + player.height;
		player.vy = 0;
	}
	if (player.x > canvasBounds.right - player.height) {
		player.x = canvasBounds.right - player.height;
		player.vx = 0;
	}
	if (player.x < canvasBounds.left + player.height) {
		player.x = canvasBounds.left + player.height;
		player.vx = 0;
	}

	if ((!directions.left && !directions.right) || (directions.right && directions.left))
		onGround ? (player.vx *= friction) : (player.vx *= airfriction);

	if (player.vx < (10 ^ -4) && player.vx > 0) {
		player.vx = 0;
	}
	if (player.vx > (-10 ^ -4) && player.vx < 0) {
		player.vx = 0;
	}

	canvas.drawRect({
		fillStyle: '#000',
		x: player.x,
		y: player.y,
		width: player.width,
		height: player.height,
		fromCenter: false
	});

	for (let i = 0; i < obstacles.length; i++) {
		const obstacle = obstacles[i];
		canvas.drawRect({
			fillStyle: obstacle.color,
			x: obstacle.x,
			y: obstacle.y,
			width: obstacle.width,
			height: obstacle.height,
			fromCenter: false
		});
	}
}

createObstacle(200, 40, 400, 400, '#000');

var interval = setInterval(render, 16.66);
