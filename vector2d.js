//Vector2D assumes the cartesian system of Canvas. Hence, small positive angle is clockwise
class Vector2D {
	constructor(x, y){
		this.x = x;
		this.y = y;
	}

	addToSelf(y){
		if(typeof y !== typeof this){
			throw new TypeError("The arguments of Vector2D.sum must be of type Vector2D\n");
			return;
		}
		this.x += y.x;
		this.y += y.y;
	}

	rotateBy(theta){
		let oldX = this.x;let oldY = this.y;
		this.x = (oldX * Math.cos(theta)) - (oldY * Math.sin(theta));
		this.y = (oldX * Math.sin(theta)) + (oldY * Math.cos(theta));
	}

	sum(y){
		if(typeof y !== typeof this){
			throw new TypeError("The arguments of Vector2D.sum must be of type Vector2D\n");
			return this;
		}

		return new Vector2D(this.x + y.x, this.y + y.y);
	}
	mult(scale){
		return new Vector2D(this.x * scale, this.y * scale);
	}
	
	getComponentAlong(theta){ //theta is the angle of the ray with x axis along which component is demanded
		let norm = this.getNorm();
		let delta = Math.atan2(this.y, this.x);
		let resNorm = norm * Math.cos(delta - theta);

		return new Vector2D(resNorm * Math.cos(theta), resNorm * Math.sin(theta));
	}
	getComponentPerp(theta){ //theta is the angle of the ray with x axis perpendicular to which component is demanded
		let norm = this.getNorm();
		let delta = Math.atan2(this.y, this.x);
		let resNorm = norm * Math.sin(delta - theta);

		return new Vector2D(-resNorm * Math.sin(theta), resNorm * Math.cos(theta));
	}

	getDistanceFromLine(r, theta){ //returns algebraic distance, not absolute distance 
		//r is a point on the said line, theta is the angle from positive x-axis
		let m = Math.tan(theta);

		let dist = (this.y - r.y) - m*(this.x - r.x);
		dist = dist/Math.sqrt( 1 + m*m );

		return dist;
	}

	getUnitVector(){
		let length = this.getNorm();
		return new Vector2D(this.x/length, this.y/length);
	}
	getNegation(){
		return new Vector2D(-this.x, -this.y);
	}
	getNorm(){
		return Math.sqrt(this.x * this.x + this.y * this.y);
	}
	getAngleWithX(){ //small positive angle is anti-clockwise, as mentioned at the top
		return Math.atan2(this.y, this.x);
	}


	static sum(x, y){
		if(typeof x !== typeof y){
			throw new TypeError("The arguments of Vector2D.sum must be of type Vector2D\n");
			return null;
		} 
		return new Vector2D(x.x + y.x, x.y + y.y);
	}

	static unitVectorAlong(theta){
		let res = new Vector2D(1,0);
		res.rotateBy(theta);

		return res;
	}

	static dot(v1,v2){
		return v1.x*v2.x + v1.y*v2.y;
	}

	static Zero(){
		return new Vector2D(0,0);
	}

}