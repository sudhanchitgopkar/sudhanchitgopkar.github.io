var canvas;
var i;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
    i=0;
    canvas = createCanvas(windowWidth,windowHeight);
    canvas.position(0,0);
    canvas.style('z-index', '-1');
    background(0);
    fill(255);
}

function draw() {
    background(random(0,20),random(0,20),random(0,20));
    i+=1;
    if (i > 255) {
        i = 0;
    }
}