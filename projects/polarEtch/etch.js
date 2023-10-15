let colorPicker;
let gridStep = 50;
let c = true;
let etch;
let hud;
let curr;
let step;

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorPicker = createColorPicker('#ff6d6d');
    colorPicker.position(width - 50, height - 30);

    etch = createGraphics(windowWidth, windowHeight);
    etch.stroke(255,0,0);

    hud = createGraphics(windowWidth, windowHeight);

    curr = createVector(0,0);
    step = 5;

    noFill();
    drawGrid();
} //setup

function draw() {
    if (keyIsPressed) {
        colorPicker.hide();
        etch.stroke(colorPicker.color());
        if (c) {
            next = etchC()
            if (!OOB(next)) {
                etch.push();
                etch.translate(width/2, height/2);
                etch.line(curr.x, curr.y, next.x, next.y);
                etch.pop();
                curr = next;
            } //if
        } else {
            next = etchP();
            nextC = pToC(next);
            currC = pToC(curr);
            etch.push();
            etch.translate(width/2, height/2);
            etch.line(currC.x, currC.y, nextC.x, nextC.y);
            etch.pop();
            curr = next;
        } //if
    } //if
    
    /*
    hud.fill(100);
    hud.clear();
    let info = "System: " + (c ? "Cartesian " : "Polar ");
    info += c ? ("x: " + curr.x + " y: " + curr.y) : ("r: " + curr.x + " θ: " + curr.y);
    hud.text(info, 10, height - 20);

    image(hud, 0,0);
    */

    image(etch, 0,0);
} //draw

function etchC() {
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
} //etchP

function etchP() {
    next = createVector(curr.x, curr.y);
    
    if (keyIsDown(UP_ARROW)) {
        next.x += step;
    } //if
        
    if (keyIsDown(DOWN_ARROW)) {
        next.x -= step;
    } //if
    
    if (keyIsDown(LEFT_ARROW)) {
        next.y -= step/5 * Math.PI/180 % TWO_PI;
    } //if
    
    if (keyIsDown(RIGHT_ARROW)) {
        next.y += step/5 * Math.PI/180;
        
    } //if

    return next;
} //etchP

function cToP(cart) {
    r = Math.sqrt(cart.x * cart.x + cart.y * cart.y);
    theta = Math.atan2(cart.y, cart.x);

    return createVector(r, theta);
} //cToP

function pToC(pol) {
    x = pol.x * cos(pol.y);
    y = pol.x * sin(pol.y);

    return createVector(x, y);
} //pToC

function drawGrid() {
    push();
    noFill();
    translate(width/2, height/2);
    stroke(40);
    if (c) {
        for (let i = -width/2; i < width/2; i += gridStep) {
            line(i, -height/2, i, height/2);
        } //for

        for (let i = -height/2; i < height/2; i += gridStep) {
            line(-width/2, i, width/2, i);
        } //for
    } else {

        line(0, -height/2, 0, height/2);
        line(-width/2, 0, width/2, 0);

        for (let i = -width; i <= width; i += gridStep) {
            circle(0, 0, i);
        } //for
    } //if
    pop();
} //drawGrid

function keyReleased() {
    if (key === 'c') {
        background(0);

        if (c) {
            curr = cToP(curr);
        } else {
            curr = pToC(curr);
        } //if
        c = !c;

        drawGrid();
    } else if (key === 'n') {
        setup();
    } else if (key === 'h') {
        colorPicker.show();
    } //if
} //keyReleased

function OOB(vec) {
    //for vec as cartesian
    return vec.x < -width/2 || vec.x > width/2 || vec.y < -height/2 || vec.y > height/2;
}