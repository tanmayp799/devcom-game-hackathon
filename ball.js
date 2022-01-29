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

	updateVelocity(){
		if(!this.onBoard) return;
		let velocityVector = this.getVelocity_asVector2d();
		
		if(velocityVector.getNorm() < PHY_FRIC_DECELERATION) {
			this.setVelocity(Vector2D.Zero());
			return;
		}

		let unitVector = velocityVector.getUnitVector();
		let decel_unitVector = unitVector.getNegation();
		let decel_Vector = decel_unitVector.mult(PHY_FRIC_DECELERATION);
		
		velocityVector = velocityVector.sum(decel_Vector);
		this.setVelocity(velocityVector);
	}


	static stateAfterCollision(ball1, ball2, badbad = false){
		// console.log("velocityAfterCollision called")
		let pos1 = ball1.getPosition_asVector2d();let pos2 = ball2.getPosition_asVector2d();
		let delPos = pos1.sum(pos2.getNegation())

		let angle_loc = Math.abs(delPos.getAngleWithX());

		let v1 = ball1.getVelocity_asVector2d();let v2 = ball2.getVelocity_asVector2d();

		let along1 = v1.getComponentAlong(angle_loc);let along2 = v2.getComponentAlong(angle_loc);
		let perp1 = v1.getComponentPerp(angle_loc);let perp2 = v2.getComponentPerp(angle_loc);
	
		// console.log(ball1.getVelocity());
		// console.log(ball1.getVelocity_asVector2d());

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
		if(!this.isOnBoard() || !otherBall.isOnBoard()) return false;

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
		if(this.x <= this.radius || this.x >= D_CANVAS_W - this.radius) this.vx = -this.vx;
		if(this.y <= this.radius || this.y >= D_CANVAS_H - this.radius) this.vy = -this.vy;

		let finalX = this.x + this.vx;let finalY = this.y + this.vy;
		if(finalX <= this.radius) this.x = this.radius;if(finalX >= D_CANVAS_W - this.radius) this.x = D_CANVAS_W - this.radius;
		if(finalY <= this.radius) this.y = this.radius;if(finalY >= D_CANVAS_H - this.radius) this.y = D_CANVAS_H - this.radius;	 
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