let canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({width: D_CANVAS_W, height: D_CANVAS_H});

let poolTable_img = new Image();
poolTable_img.src = P_POOL_TABLE;
poolTable_img.id = "poolTable";
poolTable_imgPosition = {x: 0, y: 0};

function printMousePos(event) {
    console.log("x: " + event.clientX + "  y: " + event.clientY);
  }
  
  document.addEventListener("click", printMousePos);

window.onload = function()
{
    canvas.drawImg(poolTable_img, poolTable_imgPosition, {width: D_CANVAS_W, height: D_CANVAS_H});
}