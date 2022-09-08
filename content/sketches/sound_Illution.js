let song;


let flag = 0;

function setup(){
  createCanvas(770,570);
  fill(0);

  song = loadSound('/assets/sound/sound.mp3');
  background(255, 0, 0);
  //text('Click to Play!', width / 2-(30), height / 2);
 
}


function draw(){
 
if(mouseIsPressed){
  song.play();
  wait(2000); 
  redraw(5);
  circle(width / 2, height / 2, 50);
  redraw(5);
  wait(2000);
  redraw(5);
  circle(width / 2, height / 2, 70);
 
  
}

  

/*
 

  if (song.isPlaying()) {
    song.stop();
    background(255, 0, 0);
    text('Click to Play!', width / 2-(30), height / 2);
  } else {
    background(0, 255, 0);
    song.play();
    
    wait(2000);
    background(0, 255, 0);
    wait(2000);
    circle(width / 2, height / 2, 50);
    wait(2000);
    circle(width / 2, height / 2, 50);
  }
*/

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

  



  