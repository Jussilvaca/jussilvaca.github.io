function setup() {
  createCanvas(770,570);
 
  strokeWeight(54);
  strokeCap(SQUARE);
  noFill();
}

function draw() {
  background(100);
 
  stroke(147,253,199);
  arc(width/2-(30),height*1/4-(100),500,500, PI * 2 / 10, PI * 6 / 10);

  stroke(181,75,184);
  arc(width/2-(24)-(30),height*1/4+(100)-(100),500,500, PI * 2 / 10, PI * 6 / 10);
 
  
  if(mouseIsPressed === true){
  stroke(51,177,68);
  arc(mouseX,mouseY-280,500,500, PI * 2 / 10, PI * 6 / 10);
  
  }
}