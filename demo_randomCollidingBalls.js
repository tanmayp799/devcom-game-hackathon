let canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({
	width: D_CANVAS_W,
	height: D_CANVAS_H
});

const NUM_BALLS = 15;
const margin = 3;

balls = [];

let doNothing = false;
function populateBalls(){
	for(let i = 0; i <= NUM_BALLS; i++){
		ball = new Ball(
				{x: Math.sqrt(2) * D_BALL_RADIUS * i + margin, y: Math.sqrt(2) * D_BALL_RADIUS * i + margin},
				D_BALL_RADIUS,
				Math.random() * PHY_MAX_BALL_SPEED, Math.random() * PHY_MAX_BALL_SPEED
			);
		ball.setSelfImgByPath(P_BALL[i]);

		balls.push(ball);
	}

	balls[0].x=1000;balls[0].y=600;
}
function drawBalls(){
	for(let i = 0; i<= NUM_BALLS; i++) canvas.drawImg(balls[i].selfImg, balls[i].getCornerPosition(), balls[i].getDimension());
}
function updateBallPositions(){
	for(let i = 0; i<= NUM_BALLS; i++) {
		balls[i].updatePosition();
		balls[i].collision_walls();
		updateVelocity(ball[i]);
	}

	for(let i=0; i<= NUM_BALLS; i++){
		for(let j = i + 1; j <= NUM_BALLS; j++){
			if(balls[i].isCollidingWith(balls[j])){
				let fV = Ball.stateAfterCollision(balls[i], balls[j]);
				console.log("data for ball " + i + " colliding with ball " + j);
				console.log(balls[i].getVelocity());
				balls[i].setVelocity(fV.v1);balls[j].setVelocity(fV.v2);
				balls[i].setPosition(fV.p1);balls[j].setPosition(fV.p2);
				// console.log(balls[i].getVelocity());
				// doNothing = true;
			}
		}
	}

	//TODO: Add code to check collision between two balls and update ONLY IF neither of the balls are out of board
}

populateBalls();

function main_loop(){
	if(doNothing) return;
	canvas.clear();
	updateBallPositions();
	drawBalls();
}

window.onload = function(){
	setInterval(main_loop, 20);

}