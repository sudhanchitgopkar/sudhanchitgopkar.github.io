let angle;
let points = [];
let w;
let vert;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  frameRate(30);
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  colorMode(HSB);

  angle = 0;
  if (windowWidth < 750) w = 4; // mobile
  else if (windowWidth < 1025) w = 5; // tablet
  else w = 8; // desktop
  vert = width / w;

  noFill();

  points.push(createVector(random(-50, 50), random(-50, 50), random(-50, 50)));
} // setup

function plotPoints() {
  while (points.length > 50000) {
    points.shift();
  }

  const temp = points[points.length - 1];
  let curr = floor(random(5));

  switch (curr) {
    case 0:
      points.push(createVector(
        (temp.x - vert) * 0.5,
        (temp.y - vert) * 0.5,
        (temp.z - vert) * 0.5
      ));
      break;
    case 1:
      points.push(createVector(
        (temp.x + vert) * 0.5,
        (temp.y - vert) * 0.5,
        (temp.z - vert) * 0.5
      ));
      break;
    case 2:
      points.push(createVector(
        temp.x * 0.5,
        temp.y * 0.5,
        (temp.z + vert) * 0.5
      ));
      break;
    case 3:
      points.push(createVector(
        (temp.x + vert) * 0.5,
        (temp.y + vert) * 0.5,
        (temp.z - vert) * 0.5
      ));
      break;
    default:
      points.push(createVector(
        (temp.x - vert) * 0.5,
        (temp.y + vert) * 0.5,
        (temp.z - vert) * 0.5
      ));
  } // switch

  strokeWeight(2.5);
  for (let i = 1; i < points.length; i++) {
    const pt = points[i];
    const distance = dist(mouseX - width / 2, mouseY - height / 2, pt.x, pt.y);
    const hue = map(distance, 0, width / 2, 0, 255);
    stroke(hue, 255, 255);
    point(pt.x, pt.y, pt.z);
  }

  if (points.length >= 2) {
    const latestPt = points[points.length - 1];
    const secondLatestPt = points[points.length - 2];
    strokeWeight(1);
    stroke(255);
    line(latestPt.x, latestPt.y, latestPt.z, secondLatestPt.x, secondLatestPt.y, secondLatestPt.z);
  }

} // plotPoints

function draw() {
  angle += 0.01;
  background("#1111");
  translate(0, -height / 20);
  rotateY(angle);
  if (mouseIsPressed)
    rotateY(map(mouseX, 0, width, 0, TWO_PI));
  rotateX(PI / 2);
  stroke(255);
  cube();
  strokeWeight(1);
  plotPoints();
} // draw

function cube() {
  beginShape();
  vertex(-vert, -vert, -vert);
  vertex(vert, -vert, -vert);
  vertex(vert, vert, -vert);
  vertex(-vert, vert, -vert);
  endShape(CLOSE);
}

function base() {
    beginShape();
    // Front face
    vertex(-vert, -vert, -vert);
    vertex(vert, -vert, -vert);
    vertex(vert, vert, -vert);
    vertex(-vert, vert, -vert);
  
    // Back face
    vertex(-vert, -vert, vert);
    vertex(vert, -vert, vert);
    vertex(vert, vert, vert);
    vertex(-vert, vert, vert);
  
    // Connect front and back faces
    vertex(-vert, -vert, -vert);
    vertex(-vert, -vert, vert);
    vertex(vert, -vert, vert);
    vertex(vert, -vert, -vert);
  
    vertex(-vert, vert, -vert);
    vertex(-vert, vert, vert);
    vertex(vert, vert, vert);
    vertex(vert, vert, -vert);
  
    endShape(CLOSE);
}
