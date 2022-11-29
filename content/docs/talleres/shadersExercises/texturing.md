---
weight: 0
---

## Texturing (Uso de texturas a traves de Shaders)


Como hemos aprendido en el transcurso de este capitulo, sabemos que p5 para renderizar en general hace uso de un shader general, tambien hemos visto que es posible tener un acercamiento hacia la texturizacion de objetos haciendo uso de shaders programados manualmente, en esta seccion mostraremos nuestro acercamiento inicial hacia el texturado con shaders entiendo el espacio de textura que esta dado por el espacio UV, que lo entendemos como un espacio normalizado donde las coordenadas {{< katex >}}0 \leq X \leq 1{{< /katex >}} y {{< katex >}}0 \leq Y \leq 1{{< /katex >}}

## Sketch de UV Texturing

{{< details title="uv.js" open=false >}}
```js
let uvShader;

function preload() {
  // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
  // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
  // see: https://github.com/VisualComputing/p5.treegl#handling
  uvShader = readShader('/sketches/shaders/uv.frag',
                        { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(300, 300, WEBGL);
  noStroke();
  // see: https://p5js.org/reference/#/p5/shader
  shader(uvShader);
  // https://p5js.org/reference/#/p5/textureMode
  // best and simplest is to just always used NORMAL
  textureMode(NORMAL);
}

function draw() {
  background(0);
  /*
  clip-space quad shape, i.e., both x and y vertex coordinates ∈ [-1..1]
  since textureMode is NORMAL, texture coordinates ∈ [-1..1]
  see: https://p5js.org/reference/#/p5/beginShape
       https://p5js.org/reference/#/p5/vertex
        y                  v
        |                  |
  (-1,1)|     (1,1)        (0,1)     (1,1)
  *_____|_____*            *__________*   
  |     |     |            |          |        
  |_____|_____|__x         | texture  |        
  |     |     |            |  space   |
  *_____|_____*            *__________*___ u
  (-1,-1)    (1,-1)       (0,0)    (1,0) 
  */
  beginShape();
  vertex(-1, -1, 0, 0, 0);
  vertex( 1, -1, 0, 1, 0);
  vertex( 1,  1, 0, 1, 1);
  vertex(-1,  1, 0, 0, 1);
  endShape();
  // ✨ it's worth noting (not mentioned in the p5 api docs though)
  // that quad (https://p5js.org/reference/#/p5/quad) also adds the
  // texture coords to each of its vertices. Hence:
  // quad(-1, -1, 1, -1, 1, 1, -1, 1);
  // produce the same results as the above beginShape / endShape
}
```
{{< /details >}}
{{< details title="uv.frag" open=false >}}
```GLSL
precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2.xy, 0.0, 1.0);
}
```
{{< /details >}}

{{< p5-iframe sketch="/sketches/uv.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

## Sketch de UV Texturing (Coordenadas Inversas)

{{< details title="uv.frag" open=false >}}
```GLSL
precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2.x, 1.0 - texcoords2.y, 0.0, 1.0);
}
```
{{< /details >}}

{{< p5-iframe sketch="/sketches/uvInv.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

## Sketch de UV Texturing (Agregando Color Azul)

{{< details title="uvBlueX.frag" open=false >}}
```GLSL
precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2.xy, 1.0 - texcoords2.x, 1.0);
}
```
{{< /details >}}
{{< details title="uvBlueY.frag" open=false >}}
```GLSL
precision mediump float;

// the texture coordinates varying was defined in 
// the vertex shader by treegl readShader()
// open your console and & see!
varying vec2 texcoords2;

void main() {
  // glsl swizzling is both handy and elegant
  // see: https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Swizzling
  gl_FragColor = vec4(texcoords2.xy, 1.0 - texcoords2.y, 1.0);
}
```
{{< /details >}}

{{< p5-iframe sketch="/sketches/uvBlue.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

## Sketch de UV Screen

{{< p5-iframe sketch="/sketches/uv_screen.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="625" >}}