//Dimensions
const D_BALL_RADIUS = 25;

const D_CUE_L = 250; //cue length
const D_CUE_B = 10; // cue breadth

const D_CANVAS_W = 1500; //canvas width
const D_CANVAS_H = 900;  //canvas height

const D_MIN_CUE_DIST = 5;const D_MAX_CUE_DIST = 50;
const D_MIN_CUE_MARGIN = D_MIN_CUE_DIST + D_BALL_RADIUS;
const D_MAX_CUE_MARGIN = D_MAX_CUE_DIST + D_BALL_RADIUS;
const D_MARGIN_INC = 1;

const D_BOARD_MARGIN_X = 80*D_CANVAS_W/1500
const D_BOARD_MARGIN_Y = D_CANVAS_H/10;

//============================================================================

//Physics
const PHY_DEF_BALL_SPEED = 1;
const PHY_MAX_BALL_SPEED = 10;
const PHY_FRIC_DECELERATION = 0.01;

const PHY_EPS = 5; //Planning to detect collision extended to a margin of PHY_EPS in order to avoid any 'stuck' situations

//============================================================================

//Paths
const P_WBALL = "./assets/white_ball.png";
const P_1BALL = "./assets/1_ball.png";
const P_2BALL = "./assets/2_ball.png";
const P_3BALL = "./assets/3_ball.png";
const P_4BALL = "./assets/4_ball.png";
const P_5BALL = "./assets/5_ball.png";
const P_6BALL = "./assets/6_ball.png";
const P_7BALL = "./assets/7_ball.png";
const P_8BALL = "./assets/8_ball.png";
const P_9BALL = "./assets/9_ball.png";
const P_10BALL = "./assets/10_ball.png";
const P_11BALL = "./assets/11_ball.png";
const P_12BALL = "./assets/12_ball.png";
const P_13BALL = "./assets/13_ball.png";
const P_14BALL = "./assets/14_ball.png";
const P_15BALL = "./assets/15_ball.png";

const P_BALL = [P_WBALL,P_1BALL,P_2BALL,P_3BALL,P_4BALL,P_5BALL,P_6BALL,P_7BALL,P_8BALL,P_9BALL,P_10BALL,P_11BALL,P_12BALL,P_13BALL,P_14BALL,P_15BALL];

const P_CUESTICK = "./assets/cue_stick.png";

const P_POOL_TABLE = "./assets/pool_table.png";


//============================================================================

//Game State
const GS_PLAYING = 1;
const GS_MOVING = 2;
const GS_UNDEFINED = 3;