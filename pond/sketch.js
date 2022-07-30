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

function setup() {
    createCanvas(windowWidth, windowHeight);
    //frameRate(1);

    totalObj = 52;
    pondSize = 10;
    pond = [];

    pFish = 0.5;
    pTrash = 1 - pFish;

    fished = new Set();

    catchList = [];
    currCaught = 0;
    totalCaught = 0;
    avgCaught = 0;
    iteration = 1;
    iterationsPerStep = 5;
    timeStep = 1;

    for (var i = 0; i < pondSize; i++) {
        pond.push((random(1) < pFish));
    } //for

    fpsSlider = createSlider(1, 60, 2, 1);
    fpsSlider.position(windowWidth-100, 10);
    fpsSlider.style('width', '80px');
} //setup

function draw() {
    background(0);
    frameRate(fpsSlider.value());
    drawPond();
    if (iteration <= iterationsPerStep) fish();
    else (replenish());
} //draw

function drawPond() {
    var objSize = 50;
    for (var i = 0; i < pondSize; i++) {
        if (fished.has(i)) {
            if (pond[i]) fill(0,255,0);
            else fill(255,0,0);
        } else {
            fill(100,100,100);
        } //if

        circle(map(i,0,pondSize,objSize,windowWidth-objSize),height/2,objSize);
    } //for
    showMetrics();
} //drawPond

function fish() {
    var target = Math.floor(random(pondSize));
    if (fished.has(target)) {
        return;
    } //while
    
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
    catchList.push(currCaught);
    totalCaught += currCaught;
    timeStep++;
    avgCaught = totalCaught/timeStep;
    currCaught = 0;
    iteration = 1;
}

function showMetrics() {
    let msg = "Iteration: " + iteration + "\tFish caught in current iteration: " + currCaught +
    "\nTimestep: " + timeStep + "\t Average fish caught per timestep: " + avgCaught;
    fill(255);
    text(msg,0,20);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
} //windowResized
