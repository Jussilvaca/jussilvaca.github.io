function setup() {
  createCanvas(770, 570);
  slider = createSlider(0, 255, 255);
  slider.position(10, 10);
  slider.style('width', '200px');
}

let slider;
let bordeLateral =300;
let bordeSuperior =20;

let cambioX = 7;
let cambioY = 11;
let multiplicador = 20;
let desfase = 60;

function draw() {
  background(150);
  let opacidad = slider.value();

      //Dibujar líneas
  strokeWeight(10);

  //Negra
  stroke(0);
  line(width/2-multiplicador*cambioX, height/2-multiplicador*cambioY+(desfase/2), width/2, height/2+(desfase/2));
  //Roja
  stroke('red');
  line(width/2,height/2+(desfase/2), width/2+multiplicador*cambioX,height/2+multiplicador*cambioY+(desfase/2));
  //Azul
  stroke('blue');
  line(width/2,height/2-(desfase/2), width/2+multiplicador*cambioX, height/2+multiplicador*cambioY-(desfase/2));
  //Verde
  stroke('green');
  line(width/2,height/2-(1.5*desfase), width/2+multiplicador*cambioX, height/2+multiplicador*cambioY-(1.5*desfase));




  strokeWeight(1);
  stroke(255);
  fill(0, 0, 0, opacidad);
  rect(bordeLateral,bordeSuperior,width-(2*bordeLateral),height-(2*bordeSuperior));
  //height
  //weight 
}
/*
  Dónde van las líneas?
  -Centro = (385,285)
  -¿Inclinación? tener una pendiente m para modificar y/x
   m= 11/7

  
*/