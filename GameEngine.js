class GameEngine{
	constructor(_num_balls){
		this.num_balls = _num_balls;

		this.balls = [];
		this.cueStick = null;

		this.gameState = GS_UNDEFINED;
	}

	initBalls(){
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
		if(balls.length > 0) cueStick = new CueStick(balls[0].getPosition(), D_MIN_CUE_MARGIN, {width: D_CUE_L, height: D_CUE_B});
		else cueStick = new CueStick({x:0, y:0}, D_MIN_CUE_MARGIN, {width: D_CUE_L, height: D_CUE_B});

		cueStick.loadSelfImg(P_CUESTICK);
	}

	updateCueStickPosition(){
		cueStick.setPosition(balls[0].getPosition());
	}
	updateCueStickPower(key){
		if(this.gameState != GS_PLAYING) return;
	    if(key.keyCode == 87 && this.cueStick.margin <= D_MAX_CUE_MARGIN) this.cueStick.margin += D_MARGIN_INC;
	    if(key.keyCode == 83 && this.cueStick.margin > D_MIN_CUE_MARGIN) this.cueStick.margin -= D_MARGIN_INC;
	    if(key.keyCode == 13) releaseCueStick();
	}
	releaseCueStick(){
		let angle = cueStick.angle;
		let speed = PHY_MAX_BALL_SPEED * (this.cueStick.margin / D_MAX_CUE_MARGIN);

		let velocity = new Vector2D(speed * Math.cos(angle), speed * Math.sin(angle));

		this.balls[0].setVelocity(velocity);
		this.cueStick.margin = D_MIN_CUE_MARGIN;
		this.gameState = GS_MOVING;
	}

	updateBallStates(){
		if(gameState != GS_MOVING) return;

		for(let i = 0; i<= NUM_BALLS; i++) {
			balls[i].updatePosition();
			balls[i].updateVelocity();
		}

		for(let i=0; i<= NUM_BALLS; i++){
			for(let j = i + 1; j <= NUM_BALLS; j++){
				if(balls[i].isCollidingWith(balls[j])){
					let fV = Ball.stateAfterCollision(balls[i], balls[j]);
					balls[i].setVelocity(fV.v1);balls[j].setVelocity(fV.v2);
					balls[i].setPosition(fV.p1);balls[j].setPosition(fV.p2);
				}
			}
		}	
	}

	ballsAtRest(){
		for(let i=0; i <= NUM_BALLS; i++) if(balls[i].getVelocity_asVector2d().getNorm() != 0) return false;
		return true;
	}

	drawCueStick(){
		canvas.drawImg_rotateAbout(cueStick.selfImg, 
				cueStick.getCornerPosition(),
				{width: D_CUE_L, height: D_CUE_B},
				cueStick.angle,
				balls[0].getPosition()
			);
	}

	drawBalls(){
		for(let i = 0; i<= NUM_BALLS; i++) canvas.drawImg(balls[i].selfImg, balls[i].getCornerPosition(), balls[i].getDimension());
	}
}