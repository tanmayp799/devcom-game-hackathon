class Canvas2D {
	constructor(){
		this.canvasObject = null;
		this.canvasWriter = null;
	}

	init(canvasId){
		this.canvasObject = document.getElementById(canvasId);
		this.canvasWriter = this.canvasObject.getContext("2d");
	}

	drawImg(img, pos, dimen) {
		this.canvasWriter.drawImage(img, pos.x, pos.y, dimen.width, dimen.height);
	}

	clear(){
		this.canvasWriter.clearRect(0,0,this.canvasObject.width, this.canvasObject.height);
	}
}

class Ball {
	constructor(_pos,_radius, _vx, _vy){
		//this.x and this.y are the coordinates of the center of the ball
		this.x = _pos.x;
		this.y = _pos.y;
		this.radius = _radius;
		this.vx = _vx;
		this.vy = _vy;

		this.selfImg = null;
	}

	updatePosition(){
		this.x += this.vx;
		this.y += this.vy;
	}

	setSelfImgById(id){
		this.selfImg = document.getElementById(id);
	}

	getDimension(){
		return {width: 2 * this.radius, height : 2 * this.radius};
	}
	getCornerPosition(){ //Utility function to get the coordinates of the top-left corner of the ball (because that's the position used by canvas for drawing)
		return {x: this.x - this.radius, y: this.y - this.radius};
	}
	getPosition(){
		return {x: this.x, y: this.y};
	}
	
	//Collision with walls function.
	collision_walls(){
		if(this.x == this.radius || this.x == 1200 - this.radius) this.vx = -this.vx;
		if(this.y == this.radius || this.y == 900 - this.radius) this.vy = -this.vy;
	}

	//Ball in hole for corners as an attempt to fix the issue
	corner_hole(){
		if((this.x == this.radius && this.y == this.radius) || (this.x == this.radius && this.y == 900 - this.radius) 
		|| (this.x == 1200 - this.radius && this.y == this.radius) || (this.x == 1200 - this.radius && this.y == 900 - this.radius)){
			this.vy = 0;
			this.vx = 0; //We can add a code that makes them vanish later. :)
		}
	}
}

canvas = new Canvas2D();
canvas.init("gameCanvas");

<<<<<<< HEAD
ball_8 = new Ball({x:0, y:0}, 30, 1, 1); //If all works fine, this should draw a quarter of the 8-ball, centered at the top-left corner of the canvas
ball_2 = new Ball({x:100, y:100}, 28, 2, 1); 
=======
ball_8 = new Ball({x:600, y:30}, 30, 0.5, 0); //If all works fine, this should draw a quarter of the 8-ball, centered at the top-left corner of the canvas
ball_2 = new Ball({x:200, y:200}, 28, 2, 1);
>>>>>>> ball_in_hole


function updatePositions(){
	ball_8.updatePosition();
	ball_2.updatePosition();
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
	ball_8.setSelfImgById("ball8");
	canvas.drawImg(ball_8.selfImg, ball_8.getCornerPosition(), ball_8.getDimension());
	
	//ball 2
	ball_2.setSelfImgById("ball2");
	canvas.drawImg(ball_2.selfImg, ball_2.getCornerPosition(), ball_2.getDimension())
}

function main_loop(){
	updatePositions();
	collisionWall();
	BallInHole();
	canvas.clear();
	draw();
}

window.onload = function(){
	setInterval(main_loop, 2);
}