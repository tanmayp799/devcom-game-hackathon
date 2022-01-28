let canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({width: D_CANVAS_W, height: D_CANVAS_H});



cueStick = new CueStick({x: 300, y: 300}, 50, {width: D_CUE_L, height:D_CUE_B});
imgPosition = cueStick.getCornerPosition();

let img = new Image();
img.src = P_CUESTICK;
img.id = "cueStick";

imgPos = {x: imgPosition.x, y: imgPosition.y};
imgDimens = {width: D_CUE_L, height:D_CUE_B};

function cueStickMargin(k)
{
    if(k.keyCode == 87)
    {
        if(cueStick.margin > D_MAX_CUE_MARGIN){
            alert("Max power reaches"); 
            return;
        }
        cueStick.margin += 1;
    }

    if(k.keyCode == 83)
    {
        if(cueStick.margin < D_MIN_CUE_MARGIN){
            alert("Min power reached");
            return;
        }
        cueStick.margin -= 1;
    }
    console.log(cueStick.margin);
}

document.onkeydown = cueStickMargin;