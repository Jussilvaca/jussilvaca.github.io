precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;
// uniform is sent by the sketch
uniform float opacity;

void main() {
  gl_FragColor = vec4(texcoords2.xy, 1.0 - texcoords2.x, opacity);
}