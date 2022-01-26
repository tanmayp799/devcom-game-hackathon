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

	static sum(x, y){
		if(typeof x !== typeof y){
			throw new TypeError("The arguments of Vector2D.sum must be of type Vector2D\n");
			return null;
		} 
		return new Vector2D(x.x + y.x, x.y + y.y);
	}
}