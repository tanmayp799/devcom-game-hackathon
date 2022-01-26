//Dimensions
let D_BALL_RADIUS = 25;

let D_CUE_L = 250; //cue length
let D_CUE_B = 10; // cue breadth

let D_CANVAS_W = 1200; //canvas width
let D_CANVAS_H = 900;  //canvas height

//============================================================================

//Physics
let PHY_DEF_BALL_SPEED = 1;
let PHY_MAX_BALL_SPEED = 10;
let PHY_FRIC_DECELERATION = 0.01;

let PHY_EPS = 1; //Planning to detect collision extended to a margin of PHY_EPS in order to avoid any 'stuck' situations

//============================================================================

//Paths
let P_1BALL = "./assets/1_ball.png";
let P_2BALL = "./assets/2_ball.png";
let P_3BALL = "./assets/3_ball.png";
let P_4BALL = "./assets/4_ball.png";
let P_5BALL = "./assets/5_ball.png";
let P_6BALL = "./assets/6_ball.png";
let P_7BALL = "./assets/7_ball.png";
let P_8BALL = "./assets/8_ball.png";
let P_9BALL = "./assets/9_ball.png";
let P_10BALL = "./assets/10_ball.png";
let P_11BALL = "./assets/11_ball.png";
let P_12BALL = "./assets/12_ball.png";
let P_13BALL = "./assets/13_ball.png";
let P_14BALL = "./assets/14_ball.png";
let P_15BALL = "./assets/15_ball.png";

let P_WBALL = "./assets/white_ball.png";
let P_CUESTICK = "./assets/cue_stick.png";


//============================================================================

//Game State
let GS_PLAYING = 1;
let GS_MOVING = 2;