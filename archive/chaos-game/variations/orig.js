let angle;
let prev;
let curr;
let points = [];
let colors = [];
let w;
let vert;

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  frameRate(30);
  canvas = createCanvas(windowWidth, windowHeight,WEBGL);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  colorMode(HSB);

  angle = 0;
  if (windowWidth < 750) w = 4; //mobile
  else if (windowWidth < 1025) w = 5; //tablet
  else w = 8; //desktop
  vert = width/w;
  prev = -1;


  noFill();
  
  points.push(createVector(random(-50,50),random(-50,50),random(-50,50)));
  let c = color(255,0,0);
  colors.push(c)
} //setup

function plotPoints() {
    if (points.length > 50000) {
	points = [];
	points.push(createVector(random(-50,50),random(-50,50),random(-50,50)));
    } //if

    curr = floor(random(5));
  
    temp = points[points.length-1];
  
  if (curr === 0) {
    //let c = color(255,0,0);
    //colors.push(c);
    points.push(createVector(
      (temp.x + (-vert ))/2,
      (temp.y + (-vert ))/2,
      (temp.z + (-vert ))/2
    ));   
  } else if (curr === 1) {
    //let c = color(0,255,0);
    //colors.push(c);
    points.push(createVector(
      (temp.x + (vert))/2,
      (temp.y + (-vert))/2,
      (temp.z + (-vert))/2
    ));   
  } else if (curr === 2) {
    //let c = color(0,255,255);
    //colors.push(c);
    points.push(createVector(
      (temp.x + (0))/2,
      (temp.y + (0))/2,
      (temp.z + (vert))/2
    ));   
  } else if (curr === 3) {
    //let c = color(255,255,0);
    //colors.push(c);
    points.push(createVector(
      (temp.x + (vert))/2,
      (temp.y + (vert))/2,
      (temp.z + (-vert))/2
    ));   
  } else {
    //let c = color(255,0,255);
   //colors.push(c);
    points.push(createVector(
      (temp.x + (-vert))/2,
      (temp.y + (vert))/2,
      (temp.z + (-vert))/2
    ));   
  } //if
  
  prev = curr;
  
  stroke(100,0,50);
  line(temp.x,temp.y,temp.z,points[points.length-1].x,points[points.length-1].y,points[points.length-1].z);
  //line(0,0,100 ,points[points.length-1].x,points[points.length-1].y,points[points.length-1].z)
  
  strokeWeight(3);
  for (let i = 1; i < points.length; i++) {
    //stroke(colors[i]);
    stroke(map(points[i].z,-vert ,vert ,150,220),170,255)
    point(points[i].x,points[i].y,points[i].z);
  } //for
  
} //plotPoints

function prism() {
noFill();
  strokeWeight(0.5);
  beginShape();
  vertex(-vert, -vert, -vert);
  vertex(vert, -vert, -vert);
  vertex(0, 0, vert);

  vertex(vert, -vert, -vert );
  vertex(vert, vert, -vert );
  vertex(0, 0, vert);

  vertex(vert, vert, -vert);
  vertex(-vert, vert, -vert);
  vertex(0, 0, vert);

  vertex(-vert, vert, -vert);
  vertex(-vert, -vert, -vert);
  vertex(0, 0, vert);
  endShape();
} //prism

function cube() {
  strokeWeight(0.5);
  beginShape();
  vertex(-vert, -vert, -vert);
  vertex(vert, -vert, -vert);
  vertex(vert, vert, -vert);
  vertex(-vert, vert, -vert);
  vertex(-vert, -vert, -vert);
  endShape();
}

function draw() {
  stroke(255);
  background(0);
  translate(0,-height/20); 
  rotateY(angle);
  if (mouseIsPressed)
    rotateY(map(mouseX,0,width,0,TWO_PI));
  rotateX(PI/2);
  //prism();
  cube();
  strokeWeight(2);
  plotPoints();
  angle += 0.01;
} //draw
