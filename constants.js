//Dimensions
let const D_BALL_RADIUS = 25;

let const D_CUE_L = 250; //cue length
let const D_CUE_B = 10; // cue breadth

let const D_CANVAS_W = 1200; //canvas width
let const D_CANVAS_H = 900;  //canvas height

//============================================================================

//Physics
let const PHY_DEF_BALL_SPEED = 1;
let const PHY_MAX_BALL_SPEED = 10;
let const PHY_FRIC_DECELERATION = 0.01;

let const PHY_EPS = 1; //Planning to detect collision extended to a margin of PHY_EPS in order to avoid any 'stuck' situations

//============================================================================

//Paths
let const P_WBALL = "./assets/white_ball.png";
let const P_1BALL = "./assets/1_ball.png";
let const P_2BALL = "./assets/2_ball.png";
let const P_3BALL = "./assets/3_ball.png";
let const P_4BALL = "./assets/4_ball.png";
let const P_5BALL = "./assets/5_ball.png";
let const P_6BALL = "./assets/6_ball.png";
let const P_7BALL = "./assets/7_ball.png";
let const P_8BALL = "./assets/8_ball.png";
let const P_9BALL = "./assets/9_ball.png";
let const P_10BALL = "./assets/10_ball.png";
let const P_11BALL = "./assets/11_ball.png";
let const P_12BALL = "./assets/12_ball.png";
let const P_13BALL = "./assets/13_ball.png";
let const P_14BALL = "./assets/14_ball.png";
let const P_15BALL = "./assets/15_ball.png";

let const P_BALL = [P_WBALL,P_1BALL,P_2BALL,P_3BALL,P_4BALL,P_5BALL,P_6BALL,P_7BALL,P_8BALL,P_9BALL,P_10BALL,P_11BALL,P_12BALL,P_13BALL,P_14BALL,P_15BALL];

let const P_CUESTICK = "./assets/cue_stick.png";


//============================================================================

//Game State
let const GS_PLAYING = 1;
let const GS_MOVING = 2;