class CueStick {
	constructor(_pos, _margin, _dimens){
		//this.whiteX and this.whiteY are the coordinates of the center of the white ball, not of the top left corner of the cue stick
		this.whiteX = _pos.x;
		this.whiteY = _pos.y;

		this.dimens = _dimens;

		this.angle = null;

		this.margin = _margin; //this.margin is the distance of the tip of the cue-stick from the center of the white ball

		this.selfImg = null;
	}

	loadSelfImg(path){
		this.selfImg = new Image();
		this.selfImg.src = path;
	}

	getAxisPosition(){
		return {x: this.whiteX, y: this.whiteY};
	}

	getCornerPosition(){ //returns the top-left corner position of the cue-stick image considering the axis point and the margin, assuming horizontal orientation pointing towards right
		return {x: this.whiteX - this.margin - this.dimens.width, y: this.whiteY - this.dimens.height/2};
	}

	setPosition(_pos){
		this.whiteX = _pos.x;
		this.whiteY = _pos.y;
	}
	setAngle(_angle){
		this.angle = _angle;	
	}
}