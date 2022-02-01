class GameEngine{
	constructor(_canvasId, _num_balls){
		this.num_balls = _num_balls;

		this.alertString = "";

		this.balls = [];
		this.cueStick = null;
		this.aimLine = null;
		this.poolTableBg = new Image();this.poolTableBg.src = P_POOL_TABLE;

		this.gameState = GS_UNDEFINED;

		this.canvas = new Canvas2D();
		this.canvas.init(_canvasId);
		this.canvas.setDimens({
			width: D_CANVAS_W,
			height: D_CANVAS_H
		});

		this.pocketedBalls = [];

		this.playerState = PS_STRIPE;
		this.setPlayerState(PS_SOLID);

		this.solidScore = 0;this.stripeScore = 0;

	}

	initBalls(){
		let ball = null;
		for(let i = 0; i <= this.num_balls; i++){
			ball = new Ball(
					BALL_INIT_POS[i],
					D_BALL_RADIUS,
					0,0
				);
			ball.setSelfImgByPath(P_BALL[i]);

			this.balls.push(ball);
		}

		this.balls[0].x=D_CANVAS_W/5;
		this.balls[0].y=D_CANVAS_H/2;
	}

	initCueStick(){
		if(this.balls.length > 0) this.cueStick = new CueStick(this.balls[0].getPosition(), D_MIN_CUE_MARGIN, {width: D_CUE_L, height: D_CUE_B});
		else this.cueStick = new CueStick({x:0, y:0}, D_MIN_CUE_MARGIN, {width: D_CUE_L, height: D_CUE_B});

		this.cueStick.loadSelfImg(P_CUESTICK);
	}

	updateCueStickPosition(){
		this.cueStick.setPosition(this.balls[0].getPosition());
	}
	updateCueStickAngle(){
		if(this.gameState != GS_PLAYING) return;

		let rPos = this.balls[0].getPosition();
		let mousePos = {x: this.mouseX, y: this.mouseY};
		
		let rotationAngle = Math.atan2( (rPos.y - mousePos.y),-(mousePos.x - rPos.x) );

		this.cueStick.setAngle(rotationAngle);this.cueStick.setPosition(rPos);
	}
	old_updateCueStickAngle(event){
		if(this.gameState != GS_PLAYING) return;

		let rPos = this.balls[0].getPosition();
		let mousePos = {x: event.clientX, y: event.clientY};
		
		let rotationAngle = Math.atan2( (rPos.y - mousePos.y),-(mousePos.x - rPos.x) );

		this.cueStick.setAngle(rotationAngle);this.cueStick.setPosition(rPos);		
	}
	updateCueStickPower(keyCode){
		if(this.gameState != GS_PLAYING) return;
	    if(keyCode == 87 && this.cueStick.margin <= D_MAX_CUE_MARGIN) this.cueStick.margin += D_MARGIN_INC;
	    if(keyCode == 83 && this.cueStick.margin > D_MIN_CUE_MARGIN) this.cueStick.margin -= D_MARGIN_INC;
	    if(keyCode == 13) {
	    	this.releaseCueStick();
	    	console.clear();
	    }
	}
	releaseCueStick(){
		let angle = this.cueStick.angle;
		let speed = PHY_MAX_BALL_SPEED * (this.cueStick.margin / D_MAX_CUE_MARGIN);

		let velocity = new Vector2D(speed * Math.cos(angle), speed * Math.sin(angle));

		this.balls[0].setVelocity(velocity);
		this.cueStick.margin = D_MIN_CUE_MARGIN;
		this.gameState = GS_MOVING;
		this.alertPlayers("");
	}

	updateBallStates(){
		if(this.gameState != GS_MOVING) return;

		for(let i = 0; i<= this.num_balls; i++) {
			this.balls[i].updatePosition();
			this.balls[i].updateVelocity();
		}

		for(let i=0; i<= this.num_balls; i++){
			for(let j = i + 1; j <= this.num_balls; j++){
				if(this.balls[i].isCollidingWith(this.balls[j])){
					let fV = Ball.stateAfterCollision(this.balls[i], this.balls[j]);
					this.balls[i].setVelocity(fV.v1);this.balls[j].setVelocity(fV.v2);
					this.balls[i].setPosition(fV.p1);this.balls[j].setPosition(fV.p2);
				}
			}
		}	
	}

	adjustWhiteBall(newX, newY){
		let invalidPos = false;
		for(let i=1; i <= this.num_balls; i++){
			if(this.balls[0].isCollidingWith(this.balls[i])) invalidPos = true;
		}

		if(!invalidPos){
			this.balls[0].x = newX;this.balls[0].y = newY;
			this.gameState = GS_PLAYING;
			this.alertPlayers("");
		}else{
			this.alertPlayers("Can't put the ball there");
		}
	}

	ballsAtRest(){
		for(let i=0; i <= this.num_balls; i++) if(this.balls[i].getVelocity_asVector2d().getNorm() != 0) return false;
		return true;
	}

	handleNewlyPocketed(){
		let newlyPocketed = [];
		for(let i=0; i<=this.num_balls; i++){
			if(!this.balls[i].isOnBoard() && !this.pocketedBalls.includes(i)){
				newlyPocketed.push(i);
			}
		}

		let curPlayerPotScore = 0;

		for(let i=0; i < newlyPocketed.length; i++){
			if(newlyPocketed[i] == 0){
				//Handle the pocketing of white ball by letting the other player choose where to put the ball
				this.gameState = GS_ADJUST_WHITEBALL;
				this.balls[0].onBoard = true;

				if(this.playerState == PS_SOLID) this.setPlayerState(PS_STRIPE);
				else if(this.playerState == PS_STRIPE) this.setPlayerState(PS_SOLID);
			}
			else if(newlyPocketed[i] == 8){
				if(this.playerState == PS_SOLID){
					if(this.solidScore >= 7) this.declareWinner(PS_SOLID);
					else this.declareWinner(PS_STRIPE);
				}
				if(this.playerState == PS_STRIPE){
					if(this.stripeScore >= 7) this.declareWinner(PS_STRIPE);
					else this.declareWinner(PS_SOLID);
				}
			}
			else if(newlyPocketed[i] >= 1 && newlyPocketed[i] <= 7){ // Solid ball potted
				this.solidScore++;
				this.pocketedBalls.push(newlyPocketed[i]);

				if(this.playerState == PS_SOLID) curPlayerPotScore++;
				else if(this.playerState == PS_STRIPE) curPlayerPotScore--;
				//also change the playerState accordingly
			}
			else if(newlyPocketed[i] >= 9 && newlyPocketed[i] <= 15){ //Striped ball potted
				this.stripeScore++;
				this.pocketedBalls.push(newlyPocketed[i]);

				if(this.playerState == PS_SOLID) curPlayerPotScore--;
				else if(this.playerState == PS_STRIPE) curPlayerPotScore++;
				//also change the playerState accordingly
			}
		}

		if( !( newlyPocketed.includes(0) || newlyPocketed.includes(8) ) ){
			if(curPlayerPotScore < 0){
				if(this.playerState == PS_SOLID) this.setPlayerState(PS_STRIPE);
				else if(this.playerState == PS_STRIPE) this.setPlayerState(PS_SOLID);
			}
		}

		if(newlyPocketed.length == 0) {
			if(this.playerState == PS_SOLID) this.setPlayerState(PS_STRIPE);
			else if(this.playerState == PS_STRIPE) this.setPlayerState(PS_SOLID);
		}
	}

	declareWinner(winner_ps){
		if(winner_ps == PS_SOLID){
			this.alertPlayers("Solids won!");
		}
		else if(winner_ps == PS_STRIPE){
			this.alertPlayers("Stripes won!");
		}
		else this.alertPlayers("No one won!");

		let dupAlert = this.alertString;

		this.drawAlertText();

		setTimeout(function(){
			alert(dupAlert);
			this.resetGameEngine();
		}, 200);

		// this.resetGameEngine();
	}

	drawPoolTable(){
		this.canvas.drawImg(
			this.poolTableBg,
			{x:0,y:0},
			{width: D_CANVAS_W, height: D_CANVAS_H}
		);

		//Draw alert text
		this.drawAlertText();
	}

	drawAlertText(){
		this.canvas.canvasWriter.globalCompositeOperator = 'xor';
		this.canvas.canvasWriter.fillStyle = '#2E4B38';
		this.canvas.canvasWriter.font = "bold 30px sans-serif";
		this.canvas.drawText_centerAt(this.alertString, {x: D_CANVAS_W/2, y:D_CANVAS_H/2});
	}

	drawCueStick(){
		this.canvas.drawImg_rotateAbout(
				this.cueStick.selfImg, 
				this.cueStick.getCornerPosition(),
				{width: D_CUE_L, height: D_CUE_B},
				this.cueStick.angle,
				this.balls[0].getPosition()
			);
	}

	drawBalls(){
		for(let i = 0; i<= this.num_balls; i++)
			if(this.balls[i].isOnBoard()){ 
				this.canvas.drawImg(
					this.balls[i].selfImg, 
					this.balls[i].getCornerPosition(), 
					this.balls[i].getDimension()
				);
			}
	}

	drawAimGuide(){
		const ctx = this.canvas.canvasWriter;
		
		let rPos = this.balls[0].getPosition();
		let mousePos = {x: this.mouseX, y: this.mouseY};
	
		let rotationAngle = Math.atan2( (rPos.y - mousePos.y),-(mousePos.x - rPos.x) );
		
		let drawingPositions = this.getDrawingPositions();
		let ghostBallPosition = undefined;
		let targetBallPosition = undefined;
		let locAngle = undefined;
		if(drawingPositions != undefined){
			ghostBallPosition = drawingPositions.ghost;
			targetBallPosition = drawingPositions.target;
			locAngle = targetBallPosition.sum(ghostBallPosition.getNegation()).getAngleWithX();
		}


		// ctx.setLineDash([9, 1]);
		ctx.lineWidth = D_AIMLINE_WIDTH;
		ctx.strokeStyle = 'white';
		ctx.beginPath();
		ctx.moveTo(rPos.x, rPos.y);
		if(ghostBallPosition == undefined){
			ctx.lineTo(this.balls[0].x + 5000*Math.cos(rotationAngle), this.balls[0].y + 5000*Math.sin(rotationAngle));
			ctx.stroke();
		}else{
			ctx.lineTo( ghostBallPosition.x, ghostBallPosition.y );
			ctx.stroke();

			ctx.beginPath();
			ctx.arc(ghostBallPosition.x, ghostBallPosition.y, this.balls[0].radius, 0, 2*Math.PI);
			ctx.stroke();

			ctx.beginPath();
			ctx.moveTo(targetBallPosition.x, targetBallPosition.y);
			ctx.lineTo(targetBallPosition.x + 1.2*D_BALL_RADIUS*Math.cos(locAngle), targetBallPosition.y + 1.2*D_BALL_RADIUS*Math.sin(locAngle));
			ctx.stroke();
		}

		// ctx.beginPath();
		// ctx.stroke();
	}

	getDrawingPositions(){
		let r_w = this.balls[0].getPosition_asVector2d();
		let mousePos = {x: this.mouseX, y: this.mouseY};
		let theta = Math.atan2( (r_w.y - mousePos.y),-(mousePos.x - r_w.x) );

		let possibleTargets = this.getPossibleTargets(r_w, theta);

		let finalRes = null; let minDist = Math.sqrt( D_CANVAS_H*D_CANVAS_H + D_CANVAS_W*D_CANVAS_W );

		for(let i = 0; i < possibleTargets.length; i++){
			let r_t = possibleTargets[i]; let r_wt = r_w.sum( r_t.getNegation() );
			let l_2 = r_t.getDistanceFromLine(r_w, theta);//perpendicular distance from line
			let alpha = Math.asin( l_2/(this.balls[0].radius * 2) );
			let beta = Math.asin( l_2/r_wt.getNorm() );

			if(theta >= Math.PI/2 || theta <= -Math.PI/2){
				alpha = -alpha;beta=-beta;
			}

			let r_wbar = r_wt.getUnitVector();
			r_wbar.rotateBy(alpha - beta);
			r_wbar = r_wbar.mult( 2*this.balls[0].radius );
			r_wbar = r_t.sum(r_wbar);

			let tempDist = r_wbar.sum(r_w.getNegation()).getNorm();

			if(r_wbar.sum(r_w.getNegation()).getNorm() < minDist){
				minDist = tempDist;
				finalRes = {ghost: r_wbar, target: r_t};
			}
		}

		return finalRes;
	}

	getPossibleTargets(r_w, theta){
		let res = [];
		let lineDirection = Vector2D.unitVectorAlong(theta);
		for(let i = 1; i <= 15; i++){
			if(this.balls[i].isOnBoard()){
				let r_t = this.balls[i].getPosition_asVector2d(); let r_tw = r_t.sum(r_w.getNegation());

				if( (Math.abs(r_t.getDistanceFromLine(r_w, theta)) < this.balls[i].radius + this.balls[0].radius) && (Vector2D.dot(lineDirection, r_tw) > 0) ){ 
					res.push(r_t);
				}
			}
		}
		return res;
	}

	old_drawAimLine(){
		const ctx = this.canvas.canvasWriter;
		
		let rPos = this.balls[0].getPosition();
		let mousePos = {x: this.mouseX, y: this.mouseY};
	
		let rotationAngle = Math.atan2( (rPos.y - mousePos.y),-(mousePos.x - rPos.x) );
		
		ctx.setLineDash([10, 10]);
		ctx.lineWidth = D_AIMLINE_WIDTH;
		ctx.strokeStyle = 'white';
			ctx.beginPath();
		ctx.moveTo(rPos.x, rPos.y);
		ctx.lineTo(this.balls[0].x + 5000*Math.cos(rotationAngle), this.balls[0].y + 5000*Math.sin(rotationAngle));
		ctx.stroke();
	}

	handleMovingMouse(event){
		const rect = this.canvas.getBoundingClientRect();
		this.mouseX = event.clientX - rect.left;
		this.mouseY = event.clientY - rect.top;

		if(this.gameState == GS_PLAYING) {
			this.updateCueStickAngle();
		}
		if(this.gameState == GS_ADJUST_WHITEBALL) this.balls[0].setPosition({x: this.mouseX, y: this.mouseY});
	}
	handleMouseDown(event){
		if(this.gameState == GS_ADJUST_WHITEBALL){
			const rect = this.canvas.getBoundingClientRect();
			let clickedMouseX = event.clientX - rect.left;
			let clickedMouseY = event.clientY - rect.top;
			
			this.adjustWhiteBall(clickedMouseX,clickedMouseY);
		}
	}

	isPlaying(){
		return (this.gameState == GS_PLAYING);
	}
	isMoving(){
		return (this.gameState == GS_MOVING);
	}
	isMovingWhiteBall(){
		return (this.gameState == GS_ADJUST_WHITEBALL);
	}

	alertPlayers(alertText){
		this.alertString = alertText;
		// alert(this.alertString);
	}

	clearScreen(){
		this.canvas.clear();
	}

	setPlayerState(newPlayerState){
		this.lastPlayerState = this.playerState;
		this.playerState = newPlayerState;

		if(this.playerState != this.lastPlayerState){
			if(this.playerState == PS_SOLID){ 
				this.alertPlayers("Solid's turn.");

			}
			else if(this.playerState == PS_STRIPE) this.alertPlayers("Stripe's turn.");
		}
	}

	resetGameEngine(){
		this.balls = [];this.initBalls();
		this.cueStick = null;this.initCueStick();

		this.gameState = GS_PLAYING;

		this.clearScreen();

		this.pocketedBalls = [];

		this.playerState = PS_STRIPE;
		this.setPlayerState(PS_SOLID);

		this.solidScore = 0;this.stripeScore = 0;
	}
}