
let gameEngine = new GameEngine("gameCanvas", 15);

//========================== Game Engine Functions Start =============================

//=========================== Game Engine Functions end ===============================================

function handleKeyPress(key){
	gameEngine.updateCueStickPower(key.keyCode);
}

function main_loop(){
	gameEngine.clearScreen();
	gameEngine.drawPoolTable();
	gameEngine.drawBalls();

	if(gameEngine.isPlaying()){
		//Execute code for the situation when it's players turn to adjust cue and hit the white ball
		gameEngine.drawCueStick();
		// gameEngine.old_drawAimLine();
		gameEngine.drawAimGuide();
	}
	else if(gameEngine.isMoving()){
		//Execute code for the situation when the balls are still moving
		gameEngine.updateBallStates();
		if(gameEngine.ballsAtRest()){
			gameEngine.handleNewlyPocketed();
			
			if(gameEngine.gameState == GS_MOVING) {
				gameEngine.gameState = GS_PLAYING;
			}
		}
	}

}

gameEngine.gameState = GS_PLAYING;
gameEngine.initBalls();
gameEngine.initCueStick();

document.addEventListener('mousemove', (event)=>{
	gameEngine.handleMovingMouse(event);
});
document.addEventListener('click', (event)=>{
	gameEngine.handleMouseDown(event);
});
document.onkeydown = handleKeyPress;

window.onload = function(){
	setInterval(main_loop, 20);
}