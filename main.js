canvasObject = document.getElementById("gameCanvas");
canvasWriter = canvasObject.getContext("2d");

class Ball {
	constructor(_x,_y,_radius, _vx, _vy){
		this.x = _x;
		this.y = _y;
		this.radius = _radius;
		this.vx = _vx;
		this.vy = _vy;
	}
}