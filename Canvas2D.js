class Canvas2D {
	constructor(){
		this.canvasObject = null;
		this.canvasWriter = null;
	}

	init(canvasId){
		this.canvasObject = document.getElementById(canvasId);
		this.canvasWriter = this.canvasObject.getContext("2d");
	}

	drawImg(img, pos, dimen) {
		this.canvasWriter.drawImage(img, pos.x, pos.y, dimen.width, dimen.height);
	}

	drawImg(img, pos, dimen, rotation){
		//NOTE: pos is the coordinate of the top-left corner of the image (about which the image is supposed to be rotated by 'rotation' radians)
		this.canvasWriter.translate(pos.x, pos.y);
		this.canvasWriter.rotate(rotation);
		this.canvasWriter.drawImage(img, 0, 0, dimen.width, dimen.height);
		this.canvasWriter.rotate(-rotation);
		this.canvasWriter.translate(-pos.x, -pos.y);
	}

	drawImg_rotateAbout(img, pos, dimen, rotation, rPos){ //rPos is the point about which the image is to be rotated
		this.canvasWriter.translate(rPos.x, rPos.y);
		this.canvasWriter.rotate(rotation);
		this.canvasWriter.drawImage(img, pos.x - rPos.x, pos.y - rPos.y, dimen.width, dimen.height);
		this.canvasWriter.rotate(-rotation);
		this.canvasWriter.translate(-rPos.x, -rPos.y);
	}

	clear(){
		this.canvasWriter.clearRect(0,0,this.canvasObject.width, this.canvasObject.height);
	}
}