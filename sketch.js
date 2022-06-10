function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Mover{
    constructor() {
      this.position = createVector(random(width), random());
      this.velocity = createVector();
      this.acceleration = createVector();
      this.topspeed = 7;
      this.midpoint = createVector(width/2,height/2);
    }
  
    update(target) {
        this.acceleration = p5.Vector.sub(target,this.position);
        this.acceleration.setMag(random(0.15,0.21));
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.topspeed);
        this.position.add(this.velocity);
        return this.position;
    }

    display() {
      ellipse(this.position.x, this.position.y, 1, 1);
    }
  }

 m = new Array(200);  
 var target;
 var perX;
 var perY;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0,0);
  canvas.style('z-index', '-1');
  background(0);
  colorMode(HSB);

  perX = 0.5;
  perY = 0.1;
  for (let i = 0; i < m.length; i++) {
    m[i] = new Mover();
  } //for
 } //seup

 function draw() {
      background(0,0.05);
      if (mouseX <= 0 || mouseY <= 0 || mouseX >= width || mouseY >= height) {
        target = createVector(map(noise(perX),1,0,0,width),map(noise(perY),1,0,0,height));
        perX+=random(0.005,0.007);
        perY+=random(0.005,0.007);
      } else {
        target = createVector(mouseX,mouseY);
      } //if
    noFill(); stroke(255);
    //circle(target.x,target.y,7);
      for (let i = 0; i < m.length; i++) {
        stroke(map(m[i].update(target).x,0,width,0,255),255,255);
        m[i].display();
      } //for  
 }

 function mouseClicked() {
     background(0);
     m = new Array(100);  
     for (let i = 0; i < m.length; i++) {
        m[i] = new Mover();
      } //for
 }