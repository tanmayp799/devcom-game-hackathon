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

	setSelfImgByPath(path){
		this.selfImg = new Image();
		this.selfImg.src = path;
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
		if(this.x <= this.radius || this.x >= D_CANVAS_W - this.radius) this.vx = -this.vx;
		if(this.y <= this.radius || this.y >= D_CANVAS_H - this.radius) this.vy = -this.vy;
	}

	//Ball in hole for corners as an attempt to fix the issue
	corner_hole(){
		if((this.x == this.radius && this.y == this.radius) || (this.x == this.radius && this.y == D_CANVAS_H - this.radius) 
		|| (this.x == D_CANVAS_W - this.radius && this.y == this.radius) || (this.x == D_CANVAS_W - this.radius && this.y == D_CANVAS_H - this.radius)){
			this.vy = 0;
			this.vx = 0; //We can add a code that makes them vanish later. :)
		}
	}
}