

let angle;
let points;
let w, y;
let vert;
let currRow;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight, WEBGL);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');


  if (windowWidth < 750) w = 6; // mobile
  else if (windowWidth < 1025) w = 8; // tablet
  else w = 12; // desktop

  y = 0;
  currRow = 0;

  points = new Array();
  for (let i = 0; i < w; i++) {
    points[i] = new Array();
    for (let j = 0; j < w; j++) {
      points[i][j] = new Array();
      for (let k = 0; k < w; k++) {
        points[i][j][k] = Math.floor(random(2)) == 0 ? true : false;
      } //for
    } //for
  } //for
  
} //setup

function draw() {
  background(0);
  if (frameCount % 10 == 0) updateSeed();
  let boxWidth = width/(w + 2);
  push();
  translate(0,0, - height - (w/2 * boxWidth));
  rotateY(radians(y++));
  drawCube();
  pop();
} //draw

function drawCube() {
  let boxWidth = width/(w + 2);
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < w; j++) {
      for (let k = 0; k < w; k++) {
        if (currRow == j) stroke("#ff6d6d");
        else noStroke()
        push();
        translate(-w/2 * boxWidth + boxWidth/2,-w/2 * boxWidth + boxWidth/2, height + (w/2 * boxWidth));
        translate(i * boxWidth, j * boxWidth, - height - (k * boxWidth));
        if(points[i][j][k]) {
          fill(color(map(i,0,w,0,255),map(j,0,w,0,255), map(k,0,w,0,255),50));
        }
        else noFill();
        box(boxWidth);
        pop();
      } //for
    } //for
  } //for 
} //drawCube

function updateCube() {
  for (let i = 0; i < w; i++) {
    for (let j = 0; j < w; j++) {
      for (let k = 0; k < w; k++) {
        let nn = countneighbors(i,j,k);
        if (points[i][j][k] && nn < 10) {
          points[i][j][k] = false;
        } else if (!points[i][j][k] && nn >= 15 && nn < 20) {
          points[i][j][k] = true;
        } else if (Math.floor(random(1000)) == 0) {
          points[i][j][k] = !points[i][j][k];
        } //if
      } //for
    } //for
  } //for
} //updateCube

function updateHistory() {
  let prevRow = currRow - 1 >= 0 ? currRow - 1 : w - 1;
  for (let i = 0; i < w; i++) {
    for (let k = 0; k < w; k++) {
      let nn = countPlaneNeighbors(i, prevRow, k);
      if (!points[i][prevRow][k]) {
        if (nn == 3) points[i][currRow][k] = true;
        else points[i][currRow][k] = false;
      } else {
        if (nn <= 1 || nn >= 4) points[i][currRow][k] = false;
        else points[i][currRow][k] = true;
      } //if
    } //for
  } //for
  currRow = (currRow + 1) % w;
} //function

function updateSeed() {
  let prevRow = currRow - 1 >= 0 ? currRow - 1 : w - 1;
  for (let i = 0; i < w; i++) {
    for (let k = 0; k < w; k++) {
      let nn = countPlaneNeighbors(i, prevRow, k);
      if (!points[i][prevRow][k]) {
        if (nn == 2) points[i][currRow][k] = true;
        else points[i][currRow][k] = false;
      } else {
        points[i][currRow][k] = false;
      } //if
    } //for
  } //for
  currRow = (currRow + 1) % w;
} //function

function countneighbors(i, j, k) {
  neighbors = 0;
  for (let ni = -1; ni <= 1; ni++) {
    for (let nj = -1; nj <= 1; nj++) {
      for (let nk = -1; nk <= 1; nk++) {
        if (inbounds(i + ni, j + nj, k + nk)) {
          neighbors += points[i + ni][j + nj][k + nk] ? 1 : 0;
        } //if
      } //for
    } //for
  } //for
  return neighbors;
} //countneighbors

function countPlaneNeighbors(i, j, k) {
  neighbors = 0;
  for (let ni = -1; ni <= 1; ni++) {
    for (let nk = -1; nk <= 1; nk++) {
      if (inbounds(i + ni, j, k + nk)) {
        neighbors += points[i + ni][j][k + nk] ? 1 : 0;
      } //if
    } //for
  } //for
  return neighbors;
} //countPlaneNeighbors

function inbounds(i, j, k) {
  return i >= 0 && j >= 0 && k >= 0 && i < w && j < w && k < w;
}