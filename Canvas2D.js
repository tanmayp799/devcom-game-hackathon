class Canvas2D {
	constructor(){
		this.canvasObject = null;
		this.canvasWriter = null;
	}

	init(canvasId){
		this.canvasObject = document.getElementById(canvasId);
		this.canvasWriter = this.canvasObject.getContext("2d");
	}

	drawText(text, pos, font, fillStyle){ //here, pos is the position of the bottom left corner of text 
		if(fillStyle !== undefined) this.canvasWriter.fillStyle = fillStyle;
		if(font !== undefined) this.canvasWriter.font = font;
		
		this.canvasWriter.fillText(text, pos.x, pos.y);
	}

	drawText_centerAt(text, centerPos, font, fillStyle){ //here, centerPos is the position of the center of text
		if(fillStyle !== undefined) this.canvasWriter.fillStyle = fillStyle;
		if(font !== undefined) this.canvasWriter.font = font;

		let textMetrics = this.canvasWriter.measureText(text);
		let textWidth = textMetrics.width;
		let textHeight = textMetrics.actualBoundingBoxAscent + textMetrics.actualBoundingBoxDescent;

		this.drawText(text, {x: centerPos.x - textWidth/2, y: centerPos.y + textHeight/2});
	}

	drawImg(img, pos, dimen) {
		this.canvasWriter.drawImage(img, pos.x, pos.y, dimen.width, dimen.height);
	}

	drawImg_rotate(img, pos, dimen, rotation){
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

	setDimens(dimens){
		this.canvasObject.width = dimens.width;
		this.canvasObject.height = dimens.height;
	}

	getBoundingClientRect(){
		return this.canvasObject.getBoundingClientRect();
	}
}