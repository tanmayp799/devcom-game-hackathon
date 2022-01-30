let canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({width: D_CANVAS_W, height: D_CANVAS_H});

let poolTable_img = new Image();
poolTable_img.src = P_POOL_TABLE;
poolTable_img.id = "poolTable";
poolTable_imgPosition = {x: 0, y: 0};

balls = [];
NUM_BALLS = 15;
for(let i = 0; i <= NUM_BALLS; i++){
    ball = new Ball(
            {x: D_CANVAS_W * (0.5 + Math.random() * 0.5), y: (i) * D_CANVAS_H/16},
            D_BALL_RADIUS,
            0,0
        );
    ball.setSelfImgByPath(P_BALL[i]);

    balls.push(ball);
}
balls[0].setPosition({x:413, y: 450});
balls[1].setPosition({x: 1090, y:400});
balls[2].setPosition({x: 1090 + 50*1.732, y: 500});
balls[3].setPosition({x: 1090 + 25*1.732, y:425});
balls[4].setPosition({x: 1090 + 50*1.732, y: 400});
balls[5].setPosition({x: 1090 + 50*1.732, y: 350});
balls[6].setPosition({x: 1090 + 25*1.732, y: 525});
balls[7].setPosition({x: 1090 - 25*1.732, y:475});
balls[8].setPosition({x:1090, y:450});
balls[9].setPosition({x: 1090 - 50*1.732, y:450});
balls[10].setPosition({x: 1090 + 25*1.732, y:475});
balls[11].setPosition({x: 1090 + 50*1.732, y:550});
balls[12].setPosition({x: 1090 - 25*1.732, y: 425});
balls[13].setPosition({x: 1090 + 50*1.732, y: 450});
balls[14].setPosition({x: 1090 + 25*1.732, y:375});
balls[15].setPosition({x: 1090, y:500});








function drawInitial(){
    for(let j = 0; j<=NUM_BALLS; j++){
        canvas.drawImg(balls[j].selfImg, balls[j].getCornerPosition(), balls[j].getDimension());
    }
}

function drawPoolTable(){
    canvas.drawImg(poolTable_img, poolTable_imgPosition, {width: D_CANVAS_W, height: D_CANVAS_H});

}

function main_loop(){
    canvas.clear();
    drawPoolTable();
    drawInitial();
}

// ====================================================================================================
function getRelativeCoords(event) {
    // return { x: event.offsetX, y: event.offsetY };
  console.log("x: " + event.offsetX + "  y: " + event.offsetY);
  }
  
  document.addEventListener("click", getRelativeCoords);

  window.onload = function(){
      setInterval(main_loop, 20);
  }