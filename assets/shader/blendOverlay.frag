precision mediump float;

// uniforms are emitted from the sketch
// https://p5js.org/reference/#/p5.Shader/setUniform
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

float rChannel;
float gChannel;
float bChannel;
void main  ()  {
  // gl_FragColor is a special variable that defines the color of the pixel
  // https://p5js.org/reference/#/p5.Shader/setUniform
  if (uMaterial1.x <= 0.5) {
    rChannel = 2.0*uMaterial1.x*uMaterial2.x;
    }else{
    rChannel = 1.0 - 2.0*(1.0-uMaterial1.x)*(1.0-uMaterial2.x);
    }

  if(uMaterial1.y <= 0.5){
    gChannel = 2.0*uMaterial1.y*uMaterial2.y;
    }else{
    gChannel = 1.0 - 2.0*(1.0-uMaterial1.y)*(1.0-uMaterial2.y);
    }

    if(uMaterial1.z <= 0.5){
    bChannel = 2.0*uMaterial1.z*uMaterial2.z;
    }else{
    bChannel = 1.0 - 2.0*(1.0-uMaterial1.z)*(1.0-uMaterial2.z);
    }
  gl_FragColor = vec4(rChannel, gChannel, bChannel, 1.0);
}