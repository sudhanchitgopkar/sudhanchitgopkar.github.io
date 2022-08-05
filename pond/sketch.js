var totalObj;
var pondSize;
var pond;

var pFish;
var pTrash;

var fished;

var catchList;
var currCaught;
var totalCaught;
var avgCaught;
var iteration;
var iterationsPerStep;
var timeStep;

var fpsSlider;
var pondSizeSlider;
var iterationsAllowed;

var alive;
var dead;
var unknown;

function setup() {
    createCanvas(windowWidth, windowHeight);

    alive = loadImage('alive.png');
    alive.resize(8,8);
    dead = loadImage('dead.png');
    dead.resize(80,80);
    unknown = loadImage('unknown.png');
    unknown.resize(80,80);

    if (!fpsSlider) {
        fpsSlider = createSlider(1, 60, 60, 1);
    } //if
    fpsSlider.position(windowWidth-100, 10);
    fpsSlider.style('width', '80px');

    if (!pondSizeSlider) {
        pondSizeSlider = createSlider(10, 100, 10, 1);
    } //if
    pondSizeSlider.position(windowWidth-100, 50);
    pondSizeSlider.style('width', '80px');

    if (!iterationsAllowed) {
        iterationsAllowed = createSlider(1, pondSizeSlider.value(), Math.floor(pondSizeSlider.value()/2), 1);
    } //if
    iterationsAllowed.position(windowWidth-100, 90);
    iterationsAllowed.style('width', '80px');

    totalObj = 52;
    pondSize = pondSizeSlider.value();
    pond = [];

    pFish = 0.5;
    pTrash = 1 - pFish;

    fished = new Set();

    catchList = [];
    currCaught = 0;
    totalCaught = 0;
    avgCaught = 0;
    iteration = 1;
    iterationsPerStep = iterationsAllowed.value();
    timeStep = 1;

    metricHolder = [];

    for (var i = 0; i < pondSize; i++) {
        pond.push((random(1) < pFish));
    } //for

} //setup

function draw() {
    background(0);
    handleSliders();
    drawPond();
    drawGraph();
    if (iteration <= iterationsPerStep) fish();
    else (replenish());
} //draw

function drawPond() {
    var objSize = 70;
    if (pondSize < 20) {
        for (var i = 0; i < pondSize; i++) {
            if (fished.has(i)) {
                if (pond[i]) {
                    image(alive,map(i,0,pondSize,objSize,windowWidth-objSize),height/2,objSize,objSize);
                } else {
                    image(dead,map(i,0,pondSize,objSize,windowWidth-objSize),height/2,objSize,objSize);
                } //if
            } else {
                image(unknown,map(i,0,pondSize,objSize,windowWidth-objSize),height/2,objSize,objSize);
            } //if
        } //for
    } else {
        var numRows = Math.ceil(pondSize/20.0)
        for (var i = 0; i < numRows; i++) {
            for (var j = 0; j < 20; j++) {
                if (fished.has((i*20)+j)) {
                    if (pond[(i*20)+j]) {
                        image(alive,map(j,0,20,objSize,windowWidth-objSize),map(i,0,numRows,windowHeight*0.25,windowHeight*0.75),
                        objSize,objSize);
                    }
                    else {
                        image(dead,map(j,0,20,objSize,windowWidth-objSize),map(i,0,numRows,windowHeight*0.25,windowHeight*0.75),
                        objSize,objSize);
                    }
                } else if ((i*20)+j < pondSize) {
                    image(unknown,map(j,0,20,objSize,windowWidth-objSize),map(i,0,numRows,windowHeight*0.25,windowHeight*0.75),
                        objSize,objSize);
                } else {
                    fill(0);
                } //if
            } //for
        } //for
    } //if
    showMetrics();
} //drawPond

function fish() {
    var target = Math.floor(random(pondSize));
    if (fished.has(target)) {
        return;
    } //if
    
    if (pond[target]) currCaught++;
    fished.add(target);
    iteration++;
} //fish

function replenish() {
    fished.forEach(spot => {
        pond[spot] = (random(1) < pFish)
      });
    fished.clear();
    calcMetrics();
}

function calcMetrics() {
    totalCaught += currCaught;
    timeStep++;
    avgCaught = totalCaught/timeStep;
    catchList.push(avgCaught);
    currCaught = 0;
    iteration = 1;
}

function drawGraph() {
    colorMode(HSB);

    for (var i = 1; i < catchList.length; i++) {
        var prevX = map(i-1,0,catchList.length,100,windowWidth-100);
        var prevY = map(catchList[i-1],0,pondSize,windowHeight-10,windowHeight-700);
        var currX = map(i,0,catchList.length,100,windowWidth-100);
        var currY = map(catchList[i],0,pondSize,windowHeight-10,windowHeight-700);
        stroke(map(i,1,catchList.length,0,255),255,255);
        circle(prevX,prevY,2);
        line(prevX,prevY,currX,currY);
        circle(currX,currY,2);
    } //for

    colorMode(RGB);
    stroke(255);
} //drawGraph

function showMetrics() {
    let msg = "Iteration: " + iteration + "\tFish caught in current iteration: " + currCaught +
    "\nTimestep: " + timeStep + "\t Average fish caught per timestep: " + avgCaught;
    fill(255);
    text(msg,0,20);
}

function handleSliders() {
    text("FPS: " + fpsSlider.value(),fpsSlider.x - 55, 17);
    text("Pond Size : " + pondSizeSlider.value(),pondSizeSlider.x - 95, 57);
    text("Iterations/Timestep : " + iterationsAllowed.value(),iterationsAllowed.x - 135, 97);
    frameRate(fpsSlider.value());
    if (pondSize != pondSizeSlider.value()) {
        iterationsAllowed = null;
        setup();
    } //if
    if (iterationsPerStep != iterationsAllowed.value()) {
        setup();
    } //if
} //handleSliders

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} //windowResized
