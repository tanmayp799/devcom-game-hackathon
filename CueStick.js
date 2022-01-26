class CueStick {
	constructor(_pos, _margin){
		//this.whiteX and this.whiteY are the coordinates of the center of the white ball, not of the top left corner of the cue stick
		this.whiteX = _pos.x;
		this.whiteY = _pos.y;

		this.angle = null;

		this.margin = _margin; //this.margin is the distance of the tip of the cue-stick from the center of the white ball

		this.selfImg = null;
	}

	loadSelfImg(path){
		this.selfImg = new Image();
		this.selfImg.src = path;
	}
}