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
		if(!this.onBoard) return;

		this.x += this.vx;
		this.y += this.vy;

		this.collision_walls();
		this.corner_hole();
	}

	static velocityAfterCollision_old(BALL_1, BALL_2){
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
			x: (v1*Math.sin(theta)*Math.cos(alpha) - v2*Math.cos(phi)*Math.cos(delta)),
			y: -(v1*Math.sin(theta)*Math.sin(alpha) + v2*Math.cos(phi)*Math.sin(delta))
		};
		let finalV2 = {
			x: -(v2*Math.sin(phi)*Math.cos(beta) - v1*Math.cos(theta)*Math.cos(delta)),
			y: (v2*Math.sin(phi)*Math.sin(beta) + v1*Math.cos(theta)*Math.sin(delta))
		};

		return {v1: finalV1, v2: finalV2};
	}

	static stateAfterCollision(ball1, ball2, badbad = false){
		console.log("velocityAfterCollision called")
		let pos1 = ball1.getPosition_asVector2d();let pos2 = ball2.getPosition_asVector2d();
		let delPos = pos1.sum(pos2.getNegation())

		let angle_loc = Math.abs(delPos.getAngleWithX());

		let v1 = ball1.getVelocity_asVector2d();let v2 = ball2.getVelocity_asVector2d();

		let along1 = v1.getComponentAlong(angle_loc);let along2 = v2.getComponentAlong(angle_loc);
		let perp1 = v1.getComponentPerp(angle_loc);let perp2 = v2.getComponentPerp(angle_loc);
	
		console.log(ball1.getVelocity());
		console.log(ball1.getVelocity_asVector2d());

		let finalV1 = perp1.sum(along2); let finalV2 = perp2.sum(along1);

		//Now eliminate overlap
		let overlap = ball1.radius + ball2.radius - delPos.getNorm();
		let rectification_1 = delPos.getUnitVector().mult(overlap/2 + along2.getNorm());
		let rectification_2 = delPos.getNegation().getUnitVector().mult(overlap/2 + along1.getNorm())
		let fp1 = pos1.sum(rectification_1);let fp2 = pos2.sum(rectification_2);

		let finalState = {
			v1: finalV1, 
			v2: finalV2,
			p1: fp1,
			p2: fp2
		};

		let delFp = fp1.sum(fp2.getNegation());
		if(delFp.getNorm() <= ball1.radius + ball2.radius && !badbad){
			ball1.collision_walls();
			ball2.collision_walls();
			finalState = Ball.stateAfterCollision(ball1, ball2, badbad = true);
		}


		return finalState;
	}

	isCollidingWith(otherBall){
		let delX = otherBall.x - this.x;
		let delY = otherBall.y - this.y;
		let dist = Math.sqrt( delX*delX + delY*delY);

		return (dist < this.radius + otherBall.radius);
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
	getPosition_asVector2d(){
		return new Vector2D(this.x, this.y);
	}
	
	isOnBoard(){
		return this.onBoard;
	}
	
	//Collision with walls function.
	collision_walls(){
		let cornerPos = new Vector2D();
		cornerPos = this.getCornerPosition();
		
		if(this.x <= this.radius + 80*D_CANVAS_W/1500 || this.x >= 1420*D_CANVAS_W/1500 - this.radius){
			if(cornerPos.y <= D_CANVAS_H/10 + PHY_EPS || cornerPos.y >= 0.9*D_CANVAS_H - 2*this.radius - PHY_EPS) this.vx = this.vx;
			else this.vx = -this.vx;
		}
		if(this.y <= this.radius + D_CANVAS_H/10 || this.y >= 0.9*D_CANVAS_H - this.radius){
			if(cornerPos.x <= 80*D_CANVAS_W/1500 + PHY_EPS || cornerPos.x >= 1420*D_CANVAS_W/1500 - 2*this.radius - PHY_EPS || (cornerPos.x >= 715*D_CANVAS_W/1500 - PHY_EPS && cornerPos.x <= D_CANVAS_W/2 +PHY_EPS)) this.vy = this.vy;
			else this.vy = -this.vy;
		}

		//Bottom pocket horizontal speed
		// if(41*D_CANVAS_H/45 - cornerPos.y < 2*D_BALL_RADIUS + PHY_EPS) this.vx = this.vx;
		// //Top pocket horizontal speed
		// if(cornerPos.y < D_CANVAS_H/9 + PHY_EPS) this.vx = this.vx;
		// //Left pocket vertical speed
		// if(cornerPos.x < 3*D_CANVAS_W/50 + PHY_EPS) this.vy = this.vy;
		// //Right pocket vertical speed
		// if(64*D_CANVAS_W/75 - cornerPos.x < 2*D_BALL_RADIUS +PHY_EPS) this.vy = this.vy;
		// //Edge center pockets
		// if(cornerPos.x > 12*D_CANVAS_W/25 - PHY_EPS && cornerPos.x < 38*D_CANVAS_W/75) this.vy = this.vy;

		let finalX = this.x + this.vx;let finalY = this.y + this.vy;
		if(finalX <= this.radius + 80*D_CANVAS_W/1500){
			if(cornerPos.y <= D_CANVAS_H/10 + PHY_EPS || cornerPos.y >= 0.9*D_CANVAS_H - 2*this.radius - PHY_EPS) this.x = this.x;
			else this.x = this.radius + 80*D_CANVAS_W/1500;
		}
		if(finalX >= 1420*D_CANVAS_W/1500 - this.radius){
			if(cornerPos.y <= D_CANVAS_H/10 + PHY_EPS || cornerPos.y >= 0.9*D_CANVAS_H - 2*this.radius - PHY_EPS) this.x = this.x;
			else this.x = 1420*D_CANVAS_W/1500 - this.radius;
		}
		if(finalY <= this.radius + D_CANVAS_H/10){
			if(cornerPos.x <= 80*D_CANVAS_W/1500 + PHY_EPS || cornerPos.x >= 1420*D_CANVAS_W/1500 - 2*this.radius - PHY_EPS || (cornerPos.x >= 715*D_CANVAS_W/1500 - PHY_EPS && cornerPos.x <= D_CANVAS_W/2 +PHY_EPS)) this.y = this.y;
			else this.y = this.radius + D_CANVAS_H/10;
		}
		if(finalY >= 0.9*D_CANVAS_H - this.radius){
			if(cornerPos.x <= 80*D_CANVAS_W/1500 + PHY_EPS || cornerPos.x >= 1420*D_CANVAS_W/1500 - 2*this.radius - PHY_EPS || (cornerPos.x >= 715*D_CANVAS_W/1500 - PHY_EPS && cornerPos.x <= D_CANVAS_W/2 +PHY_EPS)) this.y = this.y;
			else this.y = 0.9*D_CANVAS_H - this.radius;	 
		}
	}

	//Ball in hole for corners as an attempt to fix the issue
	corner_hole(){
		if((this.x == this.radius && this.y == this.radius) || (this.x == this.radius && this.y == D_CANVAS_H - this.radius) 
		|| (this.x == D_CANVAS_W - this.radius && this.y == this.radius) || (this.x == D_CANVAS_W - this.radius && this.y == D_CANVAS_H - this.radius)){
			this.onBoard = false;
			this.vy = - 2*this.radius;
			this.vx = - 2*this.radius; //We can add a code that makes them vanish later. :)
		}
	}

	setPosition(_pos){
		this.x = _pos.x;
		this.y = _pos.y;
	}

	getVelocity(){
		return {x: this.vx, y:this.vy};
	}
	getVelocity_asVector2d(){
		return new Vector2D(this.vx, this.vy);
	}

	setVelocity(vel){
		this.vx = vel.x;
		this.vy = vel.y;
	}
}