class Canvas2D {
	constructor(){
		this.canvasObject = null;
		this.canvasWriter = null;
	}

	init(canvasId){
		this.canvasObject = document.getElementById(canvasId);
		this.canvasWriter = this.canvas.getContext("2d");
	}

	drawImg(img) {
		this.canvasWriter.drawImage(img, img.width, img.height);
	}
}

class Ball {
	constructor(_x,_y,_radius, _vx, _vy){
		this.x = _x;
		this.y = _y;
		this.radius = _radius;
		this.vx = _vx;
		this.vy = _vy;
	}
}

canvas = new Canvas2D();
canvas.init("gameCanvas");

// canvas.drawImg(document.getElementById("8ball"));