let nParticles = 100;
let particles = [];
let particleSize = 80;
let particleVisSize = 7;
let maxCounter = 200;
let lines = [];

function checkCollisions() {
  lines = [];
  for(let i=0;i<nParticles;i++) {
    for(let j=0;j<nParticles;j++) {
      if(i!=j) {
        let distance = p5.Vector.dist(particles[i].position, particles[j].position);
        
        if(distance < particleSize) {
          lines.push( [particles[i].position, particles[j].position, distance] );          
          if( particles[i].counter == 0) {
            particles[i].direction.rotate(Math.random());
            particles[i].counter = maxCounter;
          }
          if( particles[j].counter == 0) {
            particles[j].direction.rotate(Math.random());   
            particles[j].counter = maxCounter;
          }
        }
      }
    }
  }
}
function createParticle() {
  let particle = {};
  particle.position = createVector(Math.random() * width, Math.random() * height);
  particle.direction = createVector(Math.random(),Math.random());
  
  particle.update = function() {
    this.position.add(this.direction);
    if( this.position.x > width || this.position.x < 0){
      this.position.x = width / 2;
    }
      //this.direction[0] = -this.direction[0];
    if( this.position.y > height || this.position.y < 0){
      this.position.y = height / 2;
    }
      //this.direction[1] = -this.direction[1];
    if( this.counter > 0 ){
      this.counter--;
    }
  };
  particle.counter = 0;
  return( particle);
}
function setup() {
  createCanvas(900,900);
  background(200);
  stroke(0,80);
  fill(0,90);
  
  for(let i=0;i<nParticles;i++){
    particles.push(createParticle());
    
    background(0);
  }
}

function draw() {
  
  checkCollisions();
  for(let i=0;i<nParticles;i++) {
    particles[i].update();
    //ellipse(particles[i].position.x, particles[i].position.y, particleVisSize);
  }
  for(let i=0;i<lines.length;i++) {
    let color = map(lines[i][2], 0, particleSize, 0, 255);
    stroke(color, 4);
    
    line(lines[i][0].x, lines[i][0].y, lines[i][1].x, lines[i][1].y);
  }
}
