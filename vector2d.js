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

	static Zero(){
		return new Vector2D(0,0);
	}

}