let canvas = new Canvas2D();
canvas.init("gameCanvas");
canvas.setDimens({width: D_CANVAS_W, height: D_CANVAS_H});



cueStick = new CueStick({x: 300, y: 300}, 50, {width: D_CUE_L, height:D_CUE_B});

let img = new Image();
img.src = P_CUESTICK;
img.id = "cueStick";
imgPosition = cueStick.getCornerPosition();

canvas.drawImg(img, imgPosition, {width: D_CUE_L, height:D_CUE_B});

function cueStickMargin(k)
{
    if(k.keyCode == 87)
    {
        if(cueStick.margin > D_MAX_CUE_MARGIN){
            alert("Max power reaches"); 
            return;
        }
        cueStick.margin += D_MARGIN_INC;
    }

    if(k.keyCode == 83)
    {
        if(cueStick.margin < D_MIN_CUE_MARGIN){
            alert("Min power reached");
            return;
        } 
        cueStick.margin -= D_MARGIN_INC;
    }
    console.log(cueStick.margin);
    imgPosition = cueStick.getCornerPosition();
    canvas.clear();
    canvas.drawImg(img, imgPosition, {width: D_CUE_L, height:D_CUE_B});
}



document.onkeydown = cueStickMargin;