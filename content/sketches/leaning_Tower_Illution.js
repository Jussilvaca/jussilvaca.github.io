let img;
let imageSelector;
let images = [];

let imagesNames = [
  '/assets/image/lti1.jpg',
  '/assets/image/lti2.bmp',
  '/assets/image/lti3.jpg',
]

function preload(){

  for (let i = 0; i < imagesNames.length; i++) {
    print('Loading image ' + imagesNames[i]);
    images[i] = loadImage(imagesNames[i]);
}
  //img = loadImage('/assets/image/lti1.jpg');

}



function setup(){
  createCanvas(770,570);
  imageSelector=0;
 
}


function draw(){

  background(220);
  image(images[imageSelector], 0, 0,width,height);
  //image(img,0,0,width,height);
  if (keyIsPressed === true) {
    imageSelector = (imageSelector+1) % 3;
    wait(200);
  }

  if (mouseIsPressed === true) {
    strokeWeight(10);
    line(width/2,0,width/2,height);
    wait(200);
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
