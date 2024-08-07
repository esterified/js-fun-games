//document.getElementById("gameCanvas").style.height = screen.availHeight-16+"px";
//document.getElementById("gameCanvas").style.width = screen.availWidth-16+"px";	

var canvas;
var canvasContext;
//var ballHeight=10;
var matchEnd = false;
var player1Score = 0;
var player2Score = 0;
var ballWidth = ballHeight = 10;
var posX = 100;
var posY = 100;
var ballSpeedX = ballSpeedY = 10;
var paddleY2 = 50;
var paddleY1 = 50;
var fps = 30;
const P1_HEIGHT = 100;
const P2_HEIGHT = 100;
const P_WIDTH = 10;
const W_SCORE = 20;
//adding graphical image to ball START
var ballPic = document.createElement("img");
ballPic.src = "Ball.png";
//adding graphical image to ball END
window.onload = function () {
	canvas = document.getElementById("gameCanvas");

	canvasContext = canvas.getContext("2d");
	// resize the canvas to fill browser window dynamically
	window.addEventListener('resize', resizeCanvas, false);

	function resizeCanvas() {
		canvas.width = window.innerWidth * .75;
		canvas.height = window.innerHeight * .75;
	}
	resizeCanvas();
	canvas.onclick = function () {
		if (matchEnd) {
			player1Score = 0;
			player2Score = 0;
			matchEnd = false;
		}

	};
	canvas.onmousemove = function (er) {
		paddleY1 = calculateMousePos(er).y - canvas.getBoundingClientRect().top - P1_HEIGHT / 2;

	};
	setInterval(function () { moveMe(); drawMe(); }, 1000 / fps);
}

function calculateMousePos(e) {

	return {
		x: e.clientX,
		y: e.clientY
	};
	//confusion //var roo = document.scrollingElement;
	//var roo = document.documentElement;

	//var x2=roo.scrollLeft;
	// var y2=roo.scrollTop;
	//var coor = "Coordinates: (" + x + "," + y + ") C2 : (" + x1 + "," + y1 + ") C3 : (" + x2 + "," + y2 + ")";

	//console.log(coor);
}
function computerMovement() {
	if (paddleY2 + P2_HEIGHT - P2_HEIGHT / 4 < posY) {
		paddleY2 += 10;

	}
	else if (paddleY2 + P2_HEIGHT / 4 > posY) {
		paddleY2 -= 10;
	}

}
function moveMe() {
	if (matchEnd) {
		return;
	}
	computerMovement();
	posX += ballSpeedX;
	posY += ballSpeedY;
	if (posX + ballWidth > canvas.width - P_WIDTH) {
		if (posY >= paddleY2 && posY <= paddleY2 + P2_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			var deltaY = Math.abs(posY - (paddleY2 + P2_HEIGHT / 2));
			ballSpeedY = deltaY * 0.25;
		}
		else {
			player1Score++;
			ballReset();

		}
	}
	if (posX < 0 + P_WIDTH) {

		if (posY >= paddleY1 && posY <= paddleY1 + P1_HEIGHT) {
			ballSpeedX = -ballSpeedX;
			var deltaY = Math.abs(posY - (paddleY1 + P1_HEIGHT / 2));
			ballSpeedY = deltaY * 0.25;
		}
		else {

			player2Score++;
			ballReset();
		}
	}
	if (posY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
	if (posY < 0) {
		ballSpeedY = -ballSpeedY;
	}
}
function drawNet() {
	for (var i = 20; i < canvas.height; i += 40) {
		colorRect(canvas.width / 2 - 1, i, 2, 15, 'white');
	}
}
function drawMe() {
	if (matchEnd) {

		colorRect(0, 0, canvas.width, canvas.height, 'black');
		canvasContext.fillStyle = 'white';
		if (player1Score >= W_SCORE) {
			canvasContext.fillText("Left player wins", 350, 100);
		}
		else if (player2Score >= W_SCORE) {
			canvasContext.fillText("Right player wins", 350, 100);
		}
		canvasContext.fillText("click to continue", 350, 400);
		return;
	}
	colorRect(0, 0, canvas.width, canvas.height, 'black');
	drawNet();
	colorRect(0, paddleY1, P_WIDTH, P1_HEIGHT, 'white');
	colorRect(canvas.width - P_WIDTH, paddleY2, P_WIDTH, P2_HEIGHT, 'white');
	canvasContext.drawImage(ballPic, posX, posY, ballWidth, ballHeight);
	//colorCircle(posX, posY, ballWidth*2 , 'white');
	canvasContext.font = "30px Verdana";
	canvasContext.fillText(player1Score, 20, 30);
	canvasContext.fillText(player2Score, canvas.width - 40, 30);
}
function ballReset() {
	if (player1Score >= W_SCORE || player2Score >= W_SCORE) {
		matchEnd = true;
	}
	posX = canvas.width / 2;
	posY = canvas.height / 2;
	ballSpeedX = -ballSpeedX;
}
function colorRect(x, y, width, height, color) {
	canvasContext.fillStyle = color;
	canvasContext.fillRect(x, y, width, height);
}
function colorCircle(x, y, radius, color) {
	canvasContext.fillStyle = color;
	canvasContext.beginPath();
	canvasContext.arc(x, y, radius, 0, Math.PI * 2, true);
	canvasContext.fill();
}
