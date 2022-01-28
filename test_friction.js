let canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({
	width: D_CANVAS_W,
	height: D_CANVAS_H
});

ball_1 = new Ball({x:200, y:300}, D_BALL_RADIUS, 7, 6);
ballPosition = ball_1.getPosition();

let img = new Image();
img.src = "P_1BALL";
img.id = "ball_1";

canvas.drawImg(img, {x: ballPosition.x, y: ballPosition.y});