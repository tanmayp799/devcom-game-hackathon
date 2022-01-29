let gameEngine = new gameEngine("gameCanvas", 15);

//========================== Game Engine Functions Start =============================
//Use GameEngine to access functions
//=========================== Game Engine Functions end ===============================================

function handleKeyPress(key){
	gameEngine.updateCueStickPower(key.keyCode);
}

function main_loop(){
	gameEngine.clearScreen();
	gameEngine.drawBalls();

	if(gameEngine.isPlaying()){
		//Execute code for the situation when it's players turn to adjust cue and hit the white ball
		gameEngine.drawCueStick();
	}
	else if(gameEngine.isMoving()){
		//Execute code for the situation when the balls are still moving
		gameEngine.updateBallStates();
		if(gameEngine.ballsAtRest()) gameEngine.gameState = GS_PLAYING;
	}
}

gameEngine.gameState = GS_PLAYING;
gameEngine.initBalls();
gameEngine.initCueStick();

document.addEventListener('mousemove', (event)=>{
	gameEngine.updateCueStickAngle(event);
});
document.onkeydown = handleKeyPress;


window.onload = function(){
	setInterval(main_loop, 20);
}