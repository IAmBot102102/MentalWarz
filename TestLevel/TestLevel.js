// let canvas = document.getElementById("gameScreen");
// let c = canvas.getContext("2d");
let canvas = $('#gameScreen');
const canvasBounds = { bottom: 500, top: 0, left: 0, right: 750 };
let player = { height: 30, width: 30, x: 40, y: 480, vx: 0, vy: 0 };
let _player = { height: 30, width: 30, x: 40, y: 480, vx: 0, vy: 0 };
let obstacles = [];
let backgroundObs = [];
let foregroundObs = [];
const friction = 0.75;
const airfriction = 0.95;
const gravity = 1.3;
let directions = { left: false, right: false, up: false };
const speed = 11;
const speedIncrement = 1.2;
const jumpSpeed = 20;
let onGround = true;

function createObstacle({ height = 40, width = 40, x = 0, y = 0, color = '#000', reset = undefined } = {}) {
	obstacles.push({ height: height, width: width, x: x, y: y, color: color, reset: reset });
}

function createBackObject({ height = 40, width = 40, x = 0, y = 0, color = '#000' } = {}) {
	backgroundObs.push({ height: height, width: width, x: x, y: y, color: color });
}
function createForeObject({ height = 40, width = 40, x = 0, y = 0, color = '#000' } = {}) {
	foregroundObs.push({ height: height, width: width, x: x, y: y, color: color });
}

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

	// console.log(player.y + ' ' + player.vy);

	onGround = false;

	for (var i = 0; i < obstacles.length; i++) {
		if (checkCollision(player, obstacles[i]) == true) {
			if (obstacles[i].reset) {
				player = Object.assign({}, obstacles[i].reset);
			} else if (
				player.vy > 0 &&
				_player.y <= obstacles[i].y - player.height &&
				player.y - obstacles[i].y < player.vy
			) {
				player.vy = 0;
				player.y = obstacles[i].y - player.height;
				onGround = true;
			} else if (
				player.vy < 0 &&
				_player.y >= obstacles[i].y + obstacles[i].height &&
				obstacles[i].y + obstacles[i].height - player.y > player.vy
			) {
				player.vy = 0;
				player.y = obstacles[i].y + obstacles[i].height;
			} else if (player.vx < 0) {
				player.vx = 0;
				player.x = obstacles[i].x + obstacles[i].width;
			} else if (player.vx > 0) {
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
	if (player.y < canvasBounds.top) {
		player.y = canvasBounds.top;
		player.vy = 0;
	}
	if (player.x > canvasBounds.right - player.height) {
		player.x = canvasBounds.right - player.height;
		player.vx = 0;
	}
	if (player.x < canvasBounds.left) {
		player.x = canvasBounds.left;
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

	for (let i = 0; i < backgroundObs.length; i++) {
		const bObject = backgroundObs[i];
		canvas.drawRect({
			fillStyle: bObject.color,
			x: bObject.x,
			y: bObject.y,
			width: bObject.width,
			height: bObject.height,
			fromCenter: false
		});
	}

	canvas.drawRect({
		fillStyle: '#FCAC4B',
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

	for (let i = 0; i < foregroundObs.length; i++) {
		const fObject = foregroundObs[i];
		canvas.drawRect({
			fillStyle: fObject.color,
			x: fObject.x,
			y: fObject.y,
			width: fObject.width,
			height: fObject.height,
			fromCenter: false
		});
	}

	_player = Object.assign({}, player);
}

// createObstacle(100, 70, 400, 400, '#000');
createObstacle({ height: 100, width: 70, x: 400, y: 400, color: '#000' });
// createObstacle(200, 150, 600, 300, '#000');
createObstacle({ height: 200, width: 150, x: 600, y: 300, color: '#000' });
// createObstacle(25, 100, 0, 375, '#000');
createObstacle({ height: 25, width: 100, x: 0, y: 375, color: '#000' });
// createObstacle(25, 100, 175, 245, '#000');
createObstacle({ height: 25, width: 100, x: 175, y: 245, color: '#000' });
// createObstacle(25, 100, 0, 115, '#000');
createObstacle({ height: 25, width: 100, x: 0, y: 115, color: '#000' });
// createObstacle(25, 130, 470, 490, '#EF4747', { height: 30, width: 30, x: 40, y: 480, vx: 0, vy: 0 });
createObstacle({
	height: 25,
	width: 130,
	x: 470,
	y: 490,
	color: '#EF4747',
	reset: { height: 30, width: 30, x: 40, y: 480, vx: 0, vy: 0 }
});
createBackObject();

var interval = setInterval(render, 16.66);
