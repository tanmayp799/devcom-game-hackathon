canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({width: D_CANVAS_W, height: D_CANVAS_H});

gameState = GS_UNDEFINED;

ball_8 = new Ball({x:600, y:30}, D_BALL_RADIUS, 0.5, 0); //If all works fine, this should draw a quarter of the 8-ball, centered at the top-left corner of the canvas
ball_2 = new Ball({x:200, y:200}, D_BALL_RADIUS, 2, 1);

balls = []; //Index 0 corresponds to the white ball
cueStick = null;

NUM_BALLS = 15;

//========================== Game Engine Functions Start =============================
function populateBalls(){
	for(let i = 0; i <= NUM_BALLS; i++){
		ball = new Ball(
				{x: D_CANVAS_W * (0.5 + Math.random() * 0.5), y: (i) * D_CANVAS_H/16},
				D_BALL_RADIUS,
				0,0
			);
		ball.setSelfImgByPath(P_BALL[i]);

		balls.push(ball);
	}

	//balls[0].x=D_CANVAS_W/5;balls[0].y=D_CANVAS_H/2;

	//==============INITIAL POSITIONS========================//
	balls[0].setPosition({x:413*D_CANVAS_W/1500, y: D_CANVAS_H/2});
	balls[1].setPosition({x: 1090*D_CANVAS_W/1500, y:D_CANVAS_H/2 - 2*D_BALL_RADIUS});
	balls[2].setPosition({x: 1090*D_CANVAS_W/1500 + 50*1.732, y: D_CANVAS_H/2 + 2*D_BALL_RADIUS});
	balls[3].setPosition({x: 1090*D_CANVAS_W/1500 + 25*1.732, y:D_CANVAS_H/2 - D_BALL_RADIUS});
	balls[4].setPosition({x: 1090*D_CANVAS_W/1500 + 50*1.732, y: D_CANVAS_H/2 - 2*D_BALL_RADIUS});
	balls[5].setPosition({x: 1090*D_CANVAS_W/1500 + 50*1.732, y: D_CANVAS_H/2 - 4*D_BALL_RADIUS});
	balls[6].setPosition({x: 1090*D_CANVAS_W/1500 + 25*1.732, y: D_CANVAS_H/2 + 3*D_BALL_RADIUS});
	balls[7].setPosition({x: 1090 - 25*1.732, y:D_CANVAS_H/2 + D_BALL_RADIUS});
	balls[8].setPosition({x:1090*D_CANVAS_W/1500, y:D_CANVAS_H/2});
	balls[9].setPosition({x: 1090*D_CANVAS_W/1500 - 50*1.732, y:D_CANVAS_H/2});
	balls[10].setPosition({x: 1090*D_CANVAS_W/1500 + 25*1.732, y:D_CANVAS_H/2 + D_BALL_RADIUS});
	balls[11].setPosition({x: 1090*D_CANVAS_W/1500 + 50*1.732, y:D_CANVAS_H/2 + 4*D_BALL_RADIUS});
	balls[12].setPosition({x: 1090*D_CANVAS_W/1500 - 25*1.732, y: D_CANVAS_H/2 - D_BALL_RADIUS});
	balls[13].setPosition({x: 1090*D_CANVAS_W/1500 + 50*1.732, y: D_CANVAS_H/2});
	balls[14].setPosition({x: 1090*D_CANVAS_W/1500 + 25*1.732, y:D_CANVAS_H/2 - 3*D_BALL_RADIUS});
	balls[15].setPosition({x: 1090*D_CANVAS_W/1500, y:D_CANVAS_H/2 + 2*D_BALL_RADIUS});

// POOL TABLE===//
// let poolTable_img = new Image();
// poolTable_img.src = P_POOL_TABLE;                  NOT WORKING WHEN WRITTEN HERE. ADDED SAME CODE BELOW AND IT's WORKING FINE.
// poolTable_img.id = "poolTable";
// poolTable_imgPosition = {x: 0, y: 0};

// function drawPoolTable(){
//     canvas.drawImg(poolTable_img, poolTable_imgPosition, {width: D_CANVAS_W, height: D_CANVAS_H});

// }
//============================================================================//

}
function initCueStick(){
	if(balls.length > 0) cueStick = new CueStick(balls[0].getPosition(), D_MIN_CUE_MARGIN, {width: D_CUE_L, height: D_CUE_B});
	else cueStick = new CueStick({x:0, y:0}, D_MIN_CUE_MARGIN, {width: D_CUE_L, height: D_CUE_B});

	cueStick.loadSelfImg(P_CUESTICK);
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
    if(key.keyCode == 13) releaseCueStick();
}
function releaseCueStick(){
	let angle = cueStick.angle;
	let speed = PHY_MAX_BALL_SPEED * (cueStick.margin / D_MAX_CUE_MARGIN);

	let velocity = new Vector2D(speed * Math.cos(angle), speed * Math.sin(angle));

	balls[0].setVelocity(velocity);
	cueStick.margin = D_MIN_CUE_MARGIN;
	gameState = GS_MOVING;
}

function updateBallStates(){
	if(gameState != GS_MOVING) return;

	for(let i = 0; i<= NUM_BALLS; i++) {
		balls[i].updatePosition();
		balls[i].updateVelocity();
	}

	for(let i=0; i<= NUM_BALLS; i++){
		for(let j = i + 1; j <= NUM_BALLS; j++){
			if(balls[i].isCollidingWith(balls[j])){
				let fV = Ball.stateAfterCollision(balls[i], balls[j]);
				balls[i].setVelocity(fV.v1);balls[j].setVelocity(fV.v2);
				balls[i].setPosition(fV.p1);balls[j].setPosition(fV.p2);
			}
		}
	}	
}

function ballsAtRest(){
	for(let i=0; i <= NUM_BALLS; i++) if(balls[i].getVelocity_asVector2d().getNorm() != 0) return false;
	return true;
}

function drawCueStick(){
	canvas.drawImg_rotateAbout(cueStick.selfImg, 
			cueStick.getCornerPosition(),
			{width: D_CUE_L, height: D_CUE_B},
			cueStick.angle,
			balls[0].getPosition()
		);
}
function drawBalls(){
	for(let i = 0; i<= NUM_BALLS; i++) canvas.drawImg(balls[i].selfImg, balls[i].getCornerPosition(), balls[i].getDimension());
}
//=========================== Game Engine Functions end ===============================================
//=========POOL TABLE=======================//
let poolTable_img = new Image();
poolTable_img.src = P_POOL_TABLE;
poolTable_img.id = "poolTable";
poolTable_imgPosition = {x: 0, y: 0};

function drawPoolTable(){
    canvas.drawImg(poolTable_img, poolTable_imgPosition, {width: D_CANVAS_W, height: D_CANVAS_H});

}
//=========================================================================================//
function main_loop(){
	canvas.clear();

	if(gameState == GS_PLAYING){
		//Execute code for the situation when it's players turn to adjust cue and hit the white ball
		drawPoolTable();
		drawCueStick();
	}
	else if(gameState == GS_MOVING){
		//Execute code for the situation when the balls are still moving
		drawPoolTable();
		updateBallStates();
		if(ballsAtRest()) gameState = GS_PLAYING;
	}
	//drawPoolTable();
	//drawCueStick();
	drawBalls();
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
	//drawPoolTable();
	drawBalls();
	drawCueStick();

	setInterval(main_loop, 20);
	// canvas.drawImg(balls[0].selfImg, balls[0].getCornerPosition(), balls[0].getDimension());
}