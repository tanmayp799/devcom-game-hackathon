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
}

canvas = new Canvas2D();
canvas.init("gameCanvas");

ball_8 = new Ball({x:0, y:0}, 30, 0, 0); //If all works fine, this should draw a quarter of the 8-ball, centered at the top-left corner of the canvas

window.onload = function(){
	ball_8.setSelfImgById("ball8");
	canvas.drawImg(ball_8.selfImg, ball_8.getCornerPosition(), ball_8.getDimension());
};