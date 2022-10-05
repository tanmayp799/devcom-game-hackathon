//Dimensions

const D_CANVAS_W = 0.8 * screen.width; //canvas width
const D_CANVAS_H = 0.85 * screen.height;  //canvas height

const D_BALL_RADIUS = 0.025 * D_CANVAS_H;

const D_CUE_L = 0.5 * D_CANVAS_H; //cue length
const D_CUE_B = 0.02 * D_CANVAS_H; // cue breadth

const D_MIN_CUE_DIST = 0.0054 * D_CANVAS_H;const D_MAX_CUE_DIST = 0.11 * D_CANVAS_H;
const D_MIN_CUE_MARGIN = D_MIN_CUE_DIST + D_BALL_RADIUS;
const D_MAX_CUE_MARGIN = D_MAX_CUE_DIST + D_BALL_RADIUS;
const D_MARGIN_INC = 0.0022 * D_CANVAS_H;

const D_BOARD_MARGIN_X = 80*D_CANVAS_W/1500
const D_BOARD_MARGIN_Y = D_CANVAS_H/10;

const D_AIMLINE_WIDTH = 0.003 * D_CANVAS_H;

//============================================================================

//Physics
const PHY_DEF_BALL_SPEED = 0.0011 * D_CANVAS_H;
const PHY_MAX_BALL_SPEED = 0.033 * D_CANVAS_H;
const PHY_FRIC_DECELERATION = 0.000055 * D_CANVAS_H;

const PHY_EPS = 0.005 * D_CANVAS_H; //Planning to detect collision extended to a margin of PHY_EPS in order to avoid any 'stuck' situations

const PHY_COEFF_RESTITUTION = 0.94;
//============================================================================

//Initial Positions
const BALL_INIT_POS = [
	{x:413*D_CANVAS_W/1500, y: D_CANVAS_H/2},
	{x: 1090*D_CANVAS_W/1500, y:D_CANVAS_H/2 - 2*D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500 + 2 * D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 + 2 * D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500 + D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 - D_BALL_RADIUS*1.0001},
	
	{x: 1090*D_CANVAS_W/1500 + 2 * D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 - 2*D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500 + 2 * D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 - 4 * D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500 + D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 + 3*D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500 - D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 + D_BALL_RADIUS*1.0001},
	{x:1090*D_CANVAS_W/1500, y: D_CANVAS_H/2},
	{x: 1090*D_CANVAS_W/1500 - 2 * D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2},
	{x: 1090*D_CANVAS_W/1500 + D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 + D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500 + 2 * D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 + 4 * D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500 - D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 - D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500 + 2 * D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2},
	{x: 1090*D_CANVAS_W/1500 + D_BALL_RADIUS*1.0001 * Math.sqrt(3), y: D_CANVAS_H/2 - 3 * D_BALL_RADIUS*1.0001},
	{x: 1090*D_CANVAS_W/1500, y: D_CANVAS_H/2 + 2 * D_BALL_RADIUS*1.0001}
];

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

const P_SOUND_COLLISION = "./assets/collisionSound4.mp3";
const P_SOUND_COLLISION_WITH_WALL = "./assets/collisionWall.mp3";


//============================================================================

//Game State
const GS_PLAYING = 1;
const GS_MOVING = 2;
const GS_UNDEFINED = 3;
const GS_ADJUST_WHITEBALL = 6;

//Player State
const PS_SOLID = 4;
const PS_STRIPE = -PS_SOLID;
