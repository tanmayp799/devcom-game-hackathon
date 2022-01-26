function collision_balls(BALL_1, BALL_2){
    var alpha, beta, theta, phi, delta; 
    /*
        Alpha = angle b/w velocity of ball1 and x-axis.
        Beta = angle b/w velocity of ball2 and x-axis.
        theta = angle b/w velocity of ball1 and line of collision.
        phi = angle b/w velocity of ball2 and line of collision.   
        delta = angle b/w line of collision and x-axis.
    */
    var vx_1, vy_1, vx_2, vy_2, v1, v2;
    var x_1, y_1, x_2, y_2;

    let {vx_1, vy_1} = BALL_1.getVelocity();
    alpha = Math.atan2(vy_1, vx_1);

    let {vx_2, vy_2} = BALL_2.getVelocity();
    beta = Math.atan2(vy_2, vx_2);

    let {x_1, y_1} = BALL_1.getPosition();
    let {x_2, y_2} = BALL_2.getPosition();

    delta = Math.atan2(y_2 - y_1, x_2 - x_1);

    theta = alpha + delta;
    phi = beta + delta;

    v1 = Math.sqrt(vx_1**2 + vy_1**2); //net velocities
    v2 = Math.sqrt(vx_2**2 + vy_2**2);
    
    BALL_1.this.vx = v1*Math.sin(theta)*Math.cos(alpha) - v2*Math.cos(phi)*Math.cos(delta); //velocity after collision
    BALL_1.this.vy = v1*Math.sin(theta)*Math.sin(alpha) + v2*Math.cos(phi)*Math.sin(delta);

    BALL_2.this.vx = v2*Math.sin(phi)*Math.cos(beta) - v1*Math.cos(theta)*Math.cos(delta);
    BALL_2.this.vy = v2*Math.sin(phi)*Math.sin(beta) + v1*Math.cos(theta)*Math.sin(delta);

}
