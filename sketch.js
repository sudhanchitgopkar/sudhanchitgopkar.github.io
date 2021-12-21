var canvas;
var numPoints;
var currPoint;
var modVal;
var modCount;
var flag;



function windowResized() {
    var canvasDiv = document.getElementById('sketch');
    var width = canvasDiv.offsetWidth;
    var height = canvasDiv.offsetHeight;
    resizeCanvas(width, height);
    location.reload();
}

function setup() {
    var canvasDiv = document.getElementById('sketch');
    var width = canvasDiv.offsetWidth;
    var height = canvasDiv.offsetHeight;
    var sketchCanvas = createCanvas(width,height);
    console.log(sketchCanvas);
    sketchCanvas.parent("sketch");

    frameRate(30);
    background(0);
    
    stroke(255);
    noFill();
    
    numPoints=300;
    currPoint=1;
    modVal=2;
    modCounter=1;
    flag = false;
  
    circle(width/2,height/2-25,width);
}

function draw() {
    if (modCounter > 310)
    flag = true;
  else if(modCounter < 1)
    flag = false
  
  if(!flag) {
    strokeWeight(0.5);
    //stroke(map(currPoint,0,numPoints,0,255),69,69);
    stroke('rgba(255, 109, 109, 0.3)');
    line((width/2-3)*cos((currPoint/numPoints) * 2*PI) + width/2,
    (width/2-3)*sin((currPoint/numPoints) * 2*PI) + height/2-25,
    (width/2-3)*cos((modVal*currPoint/numPoints%numPoints) * 2*PI) + width/2,
    (width/2-3)*sin((modVal*currPoint/numPoints%numPoints) * 2*PI) + height/2-25);
    currPoint++;
    modCounter++;
  }
  
  if(flag) {
    strokeWeight(1.2);
    stroke(0);
    line((width/2-3)*cos((currPoint/numPoints) * 2*PI) + width/2,
    (width/2-3)*sin((currPoint/numPoints) * 2*PI) + height/2-25,
    (width/2-3)*cos((modVal*currPoint/numPoints%numPoints) * 2*PI) + width/2,
    (width/2-3)*sin((modVal*currPoint/numPoints%numPoints) * 2*PI) + height/2-25);
    currPoint--;
    modCounter--;
    
    if(modCounter == 1) {
      modVal+=23;
    } //if
  } //if
}
  
function mouseClicked() {
    location.reload();
  }
  