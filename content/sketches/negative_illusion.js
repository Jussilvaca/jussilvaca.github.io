const waitTime = 15;
let timer = waitTime;
var input;
var img;
var lastImg;
function setup() { 
  createCanvas(800, 800);
  input = createFileInput(handleFile);
  input.position(0, 0);
} 

function draw() { 
  background(220);
  if(img){
    if(lastImg != img){
      lastImg = img;
      timer = waitTime
    }  
  }
  if (img) {
    strokeWeight(0);
    image(img, 0, 0, width, height);
    textAlign(CENTER, CENTER);
    textSize(48);
      if (frameCount % 60 == 0 && timer > 0) {
        timer --;
      }
    if(timer > 0){
      loadPixels();
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
              var index = (x + y * width)*4;
              var r = pixels[index+0];
              var g = pixels[index+1];
              var b = pixels[index+2];
              var a = pixels[index+3];     
              
              pixels[index+0] = 255 - r;
              pixels[index+1] = 255 - g;
              pixels[index+2] = 255 - b;
            }
        }
      updatePixels();
      stroke('black')
      strokeWeight(2)
      fill('white')
      text("Mira el punto fijamente", width/2, height*0.9);
    }
    if (timer == 0) {
      loadPixels();
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
              var index = (x + y * width)*4;
              var r = pixels[index+0];
              var g = pixels[index+1];
              var b = pixels[index+2];
              var a = pixels[index+3];     
              
              var luma = r *.299 + g *.587 + b *.0114;
              
              pixels[index+0] = luma;
              pixels[index+1] = luma;
              pixels[index+2] = luma;
        }
      }
      updatePixels();
      stroke('white')
      strokeWeight(2)
      fill('black')
      text("¿Vez colores?\nEsta imagen es en blanco y negro", width/2, height*0.9);
    }
    text(timer, width/2, height*0.8);
    let colorPoint = inverseColor(color(get (width/2, height*0.3)))
    stroke('colorPoint'); // Change the color
    strokeWeight(10); // Make the points 10 pixels in
    point(width/2, height*0.3)
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data);
    img.hide();
  }
}

function inverseColor(r,g,b){
  
  r = 255 - r; //get the mathmatical inverse
  g = 255 - g; //get the mathmatical inverse
  b = 255 - b; //get the mathmatical inverse
  
  return color(r,g,b); //return a p5 color function containing our inverse color!
}