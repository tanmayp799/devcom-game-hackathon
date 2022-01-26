let canvas = new Canvas2D();
canvas.init("gameCanvas");

let img = new Image();
img.src = P_CUESTICK;

imgPos = {x:100, y:50};
imgDimens = {width: D_CUE_L, height:D_CUE_B};
rPos = {x:300, y:60};

function updateStick(event){
	canvas.clear();
	mousePos = {x: event.clientX, y: event.clientY};
	rotationAngle = Math.atan( (rPos.y - mousePos.y)/(mousePos.x - rPos.x) );

	if(mousePos.x > rPos.x) rotationAngle += Math.PI;

	canvas.drawImg_rotateAbout(img, imgPos, imgDimens, -rotationAngle, rPos);
}

document.addEventListener('mousemove', (event)=>{updateStick(event);});

// window.onload = function(){

// }
