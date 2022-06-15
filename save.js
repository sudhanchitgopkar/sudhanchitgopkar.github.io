let angle;
let prev;
let curr;
let points = [];
let colors = [];
let scale;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  frameRate(60);
  canvas = createCanvas(windowWidth, windowHeight,WEBGL);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  colorMode(HSB);
  angle = 0;
  scale = map(width,350,1920,1,2);
  noFill();
  prev = -1;
  
  points.push(createVector(random(-50,50),random(-50,50),random(-50,50)));
  let c = color(255,0,0);
  colors.push(c)
}

function plotPoints() {
    if (points.length > 5000) return;
    curr = floor(random(5));
  
  temp = points[points.length-1];
  
  if (curr === 0) {
    let c = color(255,0,0);
    colors.push(c);
    points.push(createVector(
      (temp.x + (-100 * scale))/2,
      (temp.y + (-100 * scale))/2,
      (temp.z + (-100 * scale))/2
    ));   
  } else if (curr === 1) {
    let c = color(0,255,0);
    colors.push(c);
    points.push(createVector(
      (temp.x + (100 * scale))/2,
      (temp.y + (-100 * scale))/2,
      (temp.z + (-100 * scale))/2
    ));   
  } else if (curr === 2) {
    let c = color(0,0,255);
    colors.push(c);
    points.push(createVector(
      (temp.x + (0 * scale))/2,
      (temp.y + (0 * scale))/2,
      (temp.z + (100 * scale))/2
    ));   
  } else if (curr === 3) {
    let c = color(255,255,0);
    colors.push(c);
    points.push(createVector(
      (temp.x + (100 * scale))/2,
      (temp.y + (100 * scale))/2,
      (temp.z + (-100 * scale))/2
    ));   
  } else {
    let c = color(255,0,255);
    colors.push(c);
    points.push(createVector(
      (temp.x + (-100 * scale))/2,
      (temp.y + (100 * scale))/2,
      (temp.z + (-100 * scale))/2
    ));   
  }
  
  prev = curr;
  
  stroke(100,0,50);
  line(temp.x,temp.y,temp.z,points[points.length-1].x,points[points.length-1].y,points[points.length-1].z);
  //line(0,0,100*scale,points[points.length-1].x,points[points.length-1].y,points[points.length-1].z)
  
  strokeWeight(0.9);
  for (let i = 1; i < points.length; i++) {
    //stroke(colors[i]);
    stroke(map(points[i].z,-100*scale,100*scale,0,255),255,255)
    point(points[i].x,points[i].y,points[i].z);
  }
  
} //plotPoints

function prism() {
noFill();
  strokeWeight(1);
  beginShape();
  vertex(-100 * scale, -100 * scale, -100 * scale);
  vertex( 100 * scale, -100 * scale, -100 * scale);
  vertex(   0 * scale,    0 * scale,  100 * scale);

  vertex( 100 * scale, -100 * scale, -100 * scale);
  vertex( 100 * scale,  100 * scale, -100 * scale);
  vertex(   0 * scale,    0 * scale,  100 * scale);

  vertex( 100 * scale, 100 * scale, -100 * scale);
  vertex(-100 * scale, 100 * scale, -100 * scale);
  vertex(   0 * scale,   0 * scale,  100 * scale);

  vertex(-100 * scale,  100 * scale, -100 * scale);
  vertex(-100 * scale, -100 * scale, -100 * scale);
  vertex(   0 * scale,    0 * scale,  100 * scale);
  endShape();
  fill(255);
} //prism

function draw() {
  stroke(255);
  background(0); 
  rotateY(angle);
  if (mouseIsPressed)
    rotateY(map(mouseX,0,width,0,TWO_PI));
  rotateX(PI/2);
  prism();
  plotPoints();
  angle += 0.01;
}
