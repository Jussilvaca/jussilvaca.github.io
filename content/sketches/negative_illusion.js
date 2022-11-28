const waitTime = 20;
let timer = waitTime;
var input;
var img;
var lastImg;
let loadOriginal = 0
function setup() { 
  createCanvas(770, 560);
  input = createFileInput(handleFile);
  input.position(6, height+8);
  rectMode(CENTER)
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
      strokeWeight(3)
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
      strokeWeight(3)
      fill('black')
      text("¿Ves colores?", width/2, height*0.84);
    }
    text(timer, width/2, height*0.70);
    push()
    translate(770/2,200)
    rotate(frameCount/60)
    fill('#0007FF')
    noStroke()
    rect(0, 0, 20, 10)
    rect(0, 0, 10, 20)
    pop()
    strokeWeight(10); // Make the points 10 pixels in
    if(loadOriginal){
      image(lastImg, 0, 0, width, height);
      stroke('white')
      strokeWeight(3)
      fill('black')
      text("Imagen Original", width/2, height*0.84);
    }
    
  }
}

function handleFile(file) {
  print(file);
  if (file.type === 'image') {
    img = createImg(file.data,'');
    img.hide();
  }
}
function keyPressed() {
    switch (key) {
        case 'r':
            timer = waitTime;
            loadOriginal = 0;
            break;
        case 'o':
            loadOriginal = 1;
            timer = 0;
            break;
    }
}