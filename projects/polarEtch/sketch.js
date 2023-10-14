let curr;
let step;
let c;

function setup() {
    createCanvas(windowWidth, windowHeight);

    colorMode(HSB);
    background(200);
    noFill();
    stroke(0);

    curr = createVector(width/2,height/2);
    step = 10;
    c = false;
} //setup

function draw() {
    if (keyIsPressed) {
        globalKeyHandler();
        if (c) {
            drawCGrid();
            next = cKeyHandler();
            line(curr.x, curr.y, next.x, next.y);
            curr = next;
        } else {
            drawPGrid();
            next = cKeyHandler();
            line(curr.x, curr.y, next.x, next.y);
            curr = next;
        } //if
    } //if
} //draw

function globalKeyHandler() {
    if (key == 'n') {
        background(random(255), random(80), random(220,255));
    } //if
    
    if (keyIsDown(67)) {
        if (c) curr = cToP(curr);
        else curr = pToC(curr);
        c = !c;
        console.log(c ? 'c' : 'p');
    } //if
    
} //globalHandler

function cKeyHandler() {
    next = createVector(curr.x, curr.y);

    if (keyIsDown(UP_ARROW)) {
        next.y -= step;
    } //if
    
    if (keyIsDown(DOWN_ARROW)) {
        next.y += step;
    } //if

    if (keyIsDown(LEFT_ARROW)) {
        next.x -= step;
    } //if

    if (keyIsDown(RIGHT_ARROW)) {
        next.x += step;
    } //if

    return next;
} //cKeyHandler

function pKeyHandler() {
    next = createVector(curr.x, curr.y);

    if (keyIsDown(UP_ARROW)) {
        next.y -= step;
    } //if
    
    if (keyIsDown(DOWN_ARROW)) {
        next.y += step;
    } //if

    if (keyIsDown(LEFT_ARROW)) {
        next.x -= step;
    } //if

    if (keyIsDown(RIGHT_ARROW)) {
        next.x += step;
    } //if

    curr.y = curr.y % 360;
    //console.log(next);
    return pToC(next);
} //cKeyHandler

function cToP(cart) {
    r = Math.sqrt(cart.x*cart.x + cart.y*cart.y);
    theta = Math.atan2(cart.y,cart.x);
    polar = createVector(r, theta);
    return polar;
} //cToP

function pToC(polar) {
    //curr.x = r, curr.y = theta
    cart = createVector(polar.x * cos(polar.y), polar.x * sin(polar.y));
    return cart;
} //pToC

function drawCGrid() {
    let delta = 100;
    stroke(90);
    for (let i = 0; i < width; i += delta) {
        line(i, -height, i, height);
    } //for

    for (let j = 0; j < height; j += delta) {
        line(-width, j, width, j);
    } //for
    stroke(0);
} //drawCGrid

function drawPGrid() {
    let delta = 100;
    stroke(90);
    line(width/2, 0, width/2, height);
    line(0, height/2, width, height/2);
    for (let i = 0; i < width; i += delta) {
        circle(width/2, height/2, i);
    } //for
    stroke(0);
} //drawPGrid



