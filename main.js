canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({width: D_CANVAS_W, height: D_CANVAS_H});

gameState = GS_UNDEFINED;

ball_8 = new Ball({x:600, y:30}, D_BALL_RADIUS, 0.5, 0); //If all works fine, this should draw a quarter of the 8-ball, centered at the top-left corner of the canvas
ball_2 = new Ball({x:200, y:200}, D_BALL_RADIUS, 2, 1);

balls = []; //Index 0 corresponds to the white ball
cueStick = null;

//========================== Game Engine Functions Start =============================
function populateBalls(){
	for(let i = 0; i <= 15; i++){
		ball = new Ball(
				{x: Math.sqrt(2) * D_BALL_RADIUS * i, y: Math.sqrt(2) * D_BALL_RADIUS * i},
				D_BALL_RADIUS,
				0,0
			);
		ball.setSelfImgByPath(P_BALL[i]);

		balls.push(ball);
	}

	balls[0].x=1000;balls[0].y=600;
}
function drawBalls(){
	for(let i = 0; i<= 15; i++) canvas.drawImg(balls[i].selfImg, balls[i].getCornerPosition(), balls[i].getDimension());
}
function updateBallPositions(){
	for(let i = 0; i<= 15; i++) {
		balls[i].updatePosition();
	}
	//TODO: Add code to check collision between two balls and update ONLY IF neither of the balls are out of board
}

function initCueStick(){
	if(balls.length > 0) cueStick = new CueStick(balls[0].getPosition(), D_MIN_CUE_MARGIN, {width: D_CUE_L, height: D_CUE_B});
	else cueStick = new CueStick({x:0, y:0}, D_MIN_CUE_MARGIN, {width: D_CUE_L, height: D_CUE_B});

	cueStick.loadSelfImg(P_CUESTICK);
}
function drawCueStick(){
	canvas.drawImg_rotateAbout(cueStick.selfImg, 
			cueStick.getCornerPosition(),
			{width: D_CUE_L, height: D_CUE_B},
			cueStick.angle,
			balls[0].getPosition()
		);
}
function updateCueStick(){
	cueStick.setPosition(balls[0].getPosition());
}

function updateCueStickAngle(event){
	if(gameState != GS_PLAYING) return;

	rPos = balls[0].getPosition();
	mousePos = {x: event.clientX, y: event.clientY};
	
	rotationAngle = Math.atan2( (rPos.y - mousePos.y),-(mousePos.x - rPos.x) );

	cueStick.setAngle(rotationAngle);cueStick.setPosition(rPos);
}
function updateCueStickPower(key){
	if(gameState != GS_PLAYING) return;
    if(key.keyCode == 87 && cueStick.margin <= D_MAX_CUE_MARGIN) cueStick.margin += D_MARGIN_INC;
    if(key.keyCode == 83 && cueStick.margin > D_MIN_CUE_MARGIN) cueStick.margin -= D_MARGIN_INC;
}
//=========================== Game Engine Functions end ===============================================


function main_loop(){
	if(gameState == GS_PLAYING){
		//Execute code for the situation when it's players turn to adjust cue and hit the white ball
		drawCueStick();
	}
	else if(gameState == GS_MOVING){
		//Execute code for the situation when the balls are still moving
	}
	canvas.clear();

	drawBalls();
	drawCueStick();
}

gameState = GS_PLAYING;
populateBalls();
initCueStick();
document.addEventListener('mousemove', (event)=>{
	updateCueStickAngle(event);
});
document.onkeydown = updateCueStickPower;
// document.addEventListener('onkeydown', (event)=>{
// 	updateCueStickPower(event);
// });

window.onload = function(){
	// setInterval(drawBalls, 20);
	// populateBalls();
	drawBalls();
	drawCueStick();

	setInterval(main_loop, 20);
	// canvas.drawImg(balls[0].selfImg, balls[0].getCornerPosition(), balls[0].getDimension());
}