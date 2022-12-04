precision mediump float;

// uniforms are emitted from the sketch
// https://p5js.org/reference/#/p5.Shader/setUniform
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = (vec4(1.0)-2.0*uMaterial2)*(uMaterial1*uMaterial1)+2.0*uMaterial2*uMaterial1;
}