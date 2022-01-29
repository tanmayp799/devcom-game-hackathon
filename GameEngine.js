class GameEngine{
	constructor(_canvasId, _num_balls){
		this.num_balls = _num_balls;

		this.balls = [];
		this.cueStick = null;

		this.gameState = GS_UNDEFINED;

		this.canvas = new Canvas2D();
		this.canvas.init(_canvasId);
		this.canvas.setDimens({
			width: D_CANVAS_W,
			height: D_CANVAS_H
		});

		this.pocketedBalls = [];

		this.playerState = PS_STRIPE;

		this.solidScore = 0;this.stripeScore = 0;
	}

	initBalls(){
		let ball = null;
		for(let i = 0; i <= this.num_balls; i++){
			ball = new Ball(
					{x: D_CANVAS_W * (0.5 + Math.random() * 0.5), y: (i) * D_CANVAS_H/16},
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
	updateCueStickAngle(event){
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
	    if(keyCode == 13) this.releaseCueStick();
	}
	releaseCueStick(){
		let angle = this.cueStick.angle;
		let speed = PHY_MAX_BALL_SPEED * (this.cueStick.margin / D_MAX_CUE_MARGIN);

		let velocity = new Vector2D(speed * Math.cos(angle), speed * Math.sin(angle));

		this.balls[0].setVelocity(velocity);
		this.cueStick.margin = D_MIN_CUE_MARGIN;
		this.gameState = GS_MOVING;
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

	ballsAtRest(){
		for(let i=0; i <= this.num_balls; i++) if(this.balls[i].getVelocity_asVector2d().getNorm() != 0) return false;
		return true;
	}

	handleNewlyPocketed(){
		let newlyPocketed = [];
		for(let i=0; i<=this.num_balls; i++){
			if(this.balls[i].isOnBoard() && !this.pocketedBalls.includes(i)){
				newlyPocketed.push(i);
			}
		}

		for(let i=0; i < newlyPocketed.length; i++){
			if(newlyPocketed[i] == 0){
				//Handle the pocketing of white ball by letting the other player choose where to put the ball

				if(this.playerState == PS_SOLID) this.playerState = PS_STRIPE;
				else if(this.playerState == PS_STRIPE) this.playerState = PS_SOLID;
			}
			else if(newlyPocketed[i] == 8){
				//declare the other player as the winner if current player's balls aren't all pocketed
				//otherwise current player wins
			}
			else if(newlyPocketed[i] >= 1 && newlyPocketed[i] <= 7){
				this.solidScore++;
				this.pocketedBalls.push(newlyPocketed[i]);
				//also change the playerState accordingly
			}
			else if(newlyPocketed[i] >= 9 && newlyPocketed[i] <= 15){
				this.stripeScore++;
				this.pocketedBalls.push(newlyPocketed[i]);
				//also change the playerState accordingly
			}
		}
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

	isPlaying(){
		return (this.gameState == GS_PLAYING);
	}
	isMoving(){
		return (this.gameState == GS_MOVING);
	}

	clearScreen(){
		this.canvas.clear();
	}
}