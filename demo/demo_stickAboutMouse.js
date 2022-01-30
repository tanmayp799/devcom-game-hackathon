let canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({width: D_CANVAS_W, height: D_CANVAS_H});

let cueStick = new CueStick({x: 300, y: 300}, 50, {width: D_CUE_L, height:D_CUE_B});

let img = new Image();
img.src = P_CUESTICK;
img.id = "cueStick";

imgPos = {x:100, y:50};
imgDimens = {width: D_CUE_L, height:D_CUE_B};
rPos = {x:imgPos.x + 50 + D_CUE_L, y: imgPos.y + 50 + D_CUE_B/2};

function updateStick(event){
	canvas.clear();
	mousePos = {x: event.clientX, y: event.clientY};
	
	rotationAngle = Math.atan2( (rPos.y - mousePos.y),-(mousePos.x - rPos.x) );

	canvas.drawImg_rotateAbout(img, imgPos, imgDimens, rotationAngle, rPos);
}

document.addEventListener('mousemove', (event)=>{
	updateStick(event);
});

// window.onload = function(){

// }
