let sliderX;
let sliderY;

var backColor =127;
var graphics = [];


function setup() {  
    createCanvas(770,570);
    background(backColor);
  
  //Slider X
  sliderX = createSlider(-5, 5, 3,1);
  sliderX.position(235, 550);
  sliderX.style('width', '300px');
  //Slider Y
  sliderY = createSlider(-5, 5, 0,1);
  sliderY.position(600, 285);
  sliderY.style("transform","rotate(90deg)",'80px');
  sliderY.style('width', '300px');


    graphics[0] = new Graphics(0,-3);
    graphics[1] = new Graphics(0,0);
    graphics[2] = new Graphics(0,3);
}

function draw() {
  let valX =sliderX.value();
  let valY =sliderY.value();
  
    graphics[0] = new Graphics(valY,-valX);
    graphics[2] = new Graphics(-valY,valX);
  
    translate(width/2,height/2);
    background(backColor);
  
  var changeRate = 20;
    var count = frameCount % changeRate;
    var angle = PI / 2;

    push();
    angleMode(RADIANS);
    // Rotate an angle
    rotate(angle);

    var c = map(sin(map(count,0,changeRate-1,0,TWO_PI)+0.5*PI),-1,1,0,255);
    graphics[2].changeColor(c);
    graphics[2].display();

    c = map(sin(map(count,0,changeRate-1,0,TWO_PI)),-1,1,0,255);
    graphics[0].changeColor(c);
    graphics[0].display();
    
    c = map(sin(map(count,0,changeRate-1,0,TWO_PI)+1/2*0.5*PI),-1,1,0,255);
    graphics[1].changeColor(c);
    graphics[1].display();

  
if (keyIsPressed === true) {
    y = height;
  let a =160;
  let b =127;
  line(-a,b+2,a,b+2 );
  line(-a,-(b+2),a,-(b+2) );
  line(b,-a,b,a);
  line(-b,-a,-b,a);  
  
  line(-a,b-56,a,b-56 );
  line(-a,-b+56,a,-b+56 );
  line(b-54,-a,b-54,a);
  line(-b+54,-a,-b+54,a);
 }
  
    
    pop();
}

function Graphics(tempX,tempY) {
    // Central coordinates
    this.x = tempX;
    this.y = tempY;

	// The side length from the center of the triangle to each vertex
    this.l = 50;
    
    // Circular radius size
    this.r = 100;
    
    // Set color, range (0 ~ 255)
    this.black = 255;
    
    // Draw triangles through self built classes
    this.triangle = new Triangle(tempX,tempY,this.l);

    // Define drawing methods
    this.display = function() {
        push();
        stroke(this.black);
        strokeWeight(50); // Sets the thickness of the circular line
        fill(this.black,0); // Make the circle fill completely transparent
        ellipse(this.x,this.y,this.r*2,this.r*2);
        pop();
        
        this.triangle.display(this.black);
    }

    // Define how to change color
    this.changeColor = function(tempC){
    	this.black = tempC;
    }
}

// Self built rounded triangle class
function Triangle(tempX,tempY,tempL) {
    this.x = tempX;
    this.y = tempY;
    this.l = tempL;

    this.display = function(tempC){
        push();
        
        fill(tempC);
        strokeJoin(ROUND); // Make a smooth transition at the connection
        strokeWeight(10);
        stroke(tempC);
        
        // Draw equilateral rounded triangles with custom shapes
        beginShape();
        vertex(this.x,this.y-this.l);
        vertex(this.x+sqrt(3)*this.l/2,this.y+this.l/2);
        vertex(this.x-sqrt(3)*this.l/2,this.y+this.l/2);
        endShape(CLOSE);
        
        pop();
    }
}

function wait(time)
{
  start = millis()
  do
  {
    current = millis();
  }
  while(current < start + time)
}