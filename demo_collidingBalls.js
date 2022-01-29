let canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({
	width: D_CANVAS_W,
	height: D_CANVAS_H
});

ball_8 = new Ball({x:750,y:400}, D_BALL_RADIUS, 5, 10);ball_8.setSelfImgByPath(P_8BALL);
ball_2 = new Ball({x: 500, y: 500}, D_BALL_RADIUS, 0, 0);ball_2.setSelfImgByPath(P_2BALL);

function updatePositions(){
	ball_8.updatePosition();
	ball_2.updatePosition();

	if(ball_8.isCollidingWith(ball_2)){
		// console.log("Collided");
		// v8 = ball_8.getVelocity();v2 = ball_2.getVelocity();
		// fv = {v1: {x: v2.x, y: 0}, v2: {x: v8.x, y: 0}};
		fv = Ball.stateAfterCollision(ball_8, ball_2);

		ball_8.setVelocity(fv.v1);ball_2.setVelocity(fv.v2);
		ball_8.setPosition(fv.p1);ball_2.setPosition(fv.p2);
		console.log(ball_8.getVelocity());console.log(ball_2.getVelocity());
	}
}

function collisionWall(){
	ball_8.collision_walls();
	ball_2.collision_walls();
}

function BallInHole(){
	ball_8.corner_hole();
	ball_2.corner_hole();
}

function draw(){
	ball_8.setSelfImgByPath(P_8BALL);
	canvas.drawImg(ball_8.selfImg, ball_8.getCornerPosition(), ball_8.getDimension());
	
	//ball 2
	ball_2.setSelfImgByPath(P_2BALL);
	canvas.drawImg(ball_2.selfImg, ball_2.getCornerPosition(), ball_2.getDimension());
}

	let poolTable_img = new Image();
	poolTable_img.src = P_POOL_TABLE;
	poolTable_img.id = "poolTable";
	poolTable_imgPosition = {x: 0, y: 0};


function drawPoolTable(){
    canvas.drawImg(poolTable_img, poolTable_imgPosition, {width: D_CANVAS_W, height: D_CANVAS_H});

}

function printMousePos(event) {
    console.log("x: " + event.clientX + "  y: " + event.clientY);
  }
  
  document.addEventListener("click", printMousePos);


function main_loop(){
	updatePositions();
	collisionWall();
	canvas.clear();
	drawPoolTable();
	draw();
}

window.onload = function(){
	setInterval(main_loop, 20);
}