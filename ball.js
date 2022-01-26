class Ball {
	constructor(_pos,_radius, _vx, _vy){
		//this.x and this.y are the coordinates of the center of the ball
		this.x = _pos.x;
		this.y = _pos.y;
		this.radius = _radius;
		this.vx = _vx;
		this.vy = _vy;

		this.onBoard = true;

		this.selfImg = null;
	}

	updatePosition(){
		this.x += this.vx;
		this.y += this.vy;
	}

	static velocityAfterCollision(BALL_1, BALL_2){
	    var alpha, beta, theta, phi, delta; 
	    /*
	        Alpha = angle b/w velocity of ball1 and x-axis.
	        Beta = angle b/w velocity of ball2 and x-axis.
	        theta = angle b/w velocity of ball1 and line of collision.
	        phi = angle b/w velocity of ball2 and line of collision.   
	        delta = angle b/w line of collision and x-axis.
	    */
	    var vx_1, vy_1, vx_2, vy_2, v1, v2;
	    var x_1, y_1, x_2, y_2;

	    let vv1 = BALL_1.getVelocity();
	    vx_1 = vv1.x;vy_1 = vv1.y;
	    // {vx_1, vy_1} = BALL_1.getVelocity();
	    alpha = Math.atan2(vy_1, vx_1);

	    let vv2 = BALL_2.getVelocity();
	    vx_2 = vv2.x;vy_2 = vv2.y;
	    beta = Math.atan2(vy_2, vx_2);

	    let p1 = BALL_1.getPosition(); let p2 = BALL_2.getPosition();
	    x_1 = p1.x;y_1 = p1.y;
	    x_2 = p2.x;y_2 = p2.y;
	    // let {x_1, y_1} = BALL_1.getPosition();
	    // let {x_2, y_2} = BALL_2.getPosition();

	    delta = Math.atan2(y_2 - y_1, x_2 - x_1);

	    theta = alpha + delta;
	    phi = beta + delta;

	    v1 = Math.sqrt(vx_1**2 + vy_1**2); //net velocities
	    v2 = Math.sqrt(vx_2**2 + vy_2**2);
	    
	    // BALL_1.this.vx = v1*Math.sin(theta)*Math.cos(alpha) - v2*Math.cos(phi)*Math.cos(delta); //velocity after collision
	    // BALL_1.this.vy = v1*Math.sin(theta)*Math.sin(alpha) + v2*Math.cos(phi)*Math.sin(delta);

	    // BALL_2.this.vx = v2*Math.sin(phi)*Math.cos(beta) - v1*Math.cos(theta)*Math.cos(delta);
	    // BALL_2.this.vy = v2*Math.sin(phi)*Math.sin(beta) + v1*Math.cos(theta)*Math.sin(delta);
		let finalV1 = {
			x: -(v1*Math.sin(theta)*Math.cos(alpha) - v2*Math.cos(phi)*Math.cos(delta)),
			y: -(v1*Math.sin(theta)*Math.sin(alpha) + v2*Math.cos(phi)*Math.sin(delta))
		};
		let finalV2 = {
			x: -(v2*Math.sin(phi)*Math.cos(beta) - v1*Math.cos(theta)*Math.cos(delta)),
			y: (v2*Math.sin(phi)*Math.sin(beta) + v1*Math.cos(theta)*Math.sin(delta))
		};

		return {v1: finalV1, v2: finalV2};
	}

	isCollidingWith(otherBall){
		let delX = otherBall.x - this.x;
		let delY = otherBall.y - this.y;
		let dist = Math.sqrt( delX*delX + delY*delY);

		return (dist <= this.radius + otherBall.radius);
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
	isOnBoard(){
		return this.onBoard;
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
	getVelocity(){
		return {x: this.vx, y:this.vy};
	}

	setVelocity(vel){
		this.vx = vel.x;
		this.vy = vel.y;
	}
}