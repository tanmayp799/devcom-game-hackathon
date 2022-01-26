canvas = new Canvas2D();
canvas.init("gameCanvas");

ball_8 = new Ball({x:0, y:0}, 30, 1, 1); //If all works fine, this should draw a quarter of the 8-ball, centered at the top-left corner of the canvas
ball_2 = new Ball({x:100, y:100}, 28, 2, 1); 


function updatePositions(){
	ball_8.updatePosition();
	ball_2.updatePosition();
}

function collisionWall(){
	ball_8.collision_walls();
	ball_2.collision_walls();
}

function draw(){
	ball_8.setSelfImgByPath("./assets/8_ball.png");
	canvas.drawImg(ball_8.selfImg, ball_8.getCornerPosition(), ball_8.getDimension());
	
	//ball 2
	ball_2.setSelfImgByPath("./assets/2_ball.png");
	canvas.drawImg(ball_2.selfImg, ball_2.getCornerPosition(), ball_2.getDimension());
}

function main_loop(){
	updatePositions();
	collisionWall();
	canvas.clear();
	draw();
}

window.onload = function(){
	setInterval(main_loop, 2);
}