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

{{< details title="uv_screen.js" open=false >}}
```js
let easycam;
let uvShader;
let opacity;
let mode;

function preload() {
    // Define geometry in world space (i.e., matrices: Tree.pmvMatrix).
    // The projection and modelview matrices may be emitted separately
    // (i.e., matrices: Tree.pMatrix | Tree.mvMatrix), which actually
    // leads to the same gl_Position result.
    // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
    // see: https://github.com/VisualComputing/p5.treegl#handling
    uvShader = readShader('/assets/shader/uv_alpha.frag',
        { matrices: Tree.pmvMatrix, varyings: Tree.texcoords2 });
}

function setup() {
    createCanvas(600, 600, WEBGL);
    // easycam stuff
    let state = {
        distance: 250,           // scalar
        center: [0, 0, 0],       // vector
        rotation: [0, 0, 0, 1],  // quaternion
    };
    easycam = createEasyCam();
    easycam.state_reset = state;   // state to use on reset (double-click/tap)
    easycam.setState(state, 2000); // now animate to that state
    textureMode(NORMAL);
    opacity = createSlider(0, 1, 0.5, 0.01);
    opacity.position(10, 25);
    opacity.style('width', '280px');
    mode = createSelect();
    mode.position(10, 10);
    mode.option('quad');
    mode.option('ellipse');
    mode.option('triangleUP');
    mode.option('triangleDOWN');
    mode.selected('uvShaderBlueX');
    mode.changed(() => { console.log("Change"); });
}

function draw() {
    background(200);
    // reset shader so that the default shader is used to render the 3D scene
    resetShader();
    // world space scene
    axes();
    grid();
    translate(0, -70);
    rotateY(0.5);
    fill(color(255, 0, 255, 125));
    box(30, 50);
    translate(70, 70);
    fill(color(0, 255, 255, 125));
    sphere(30, 50);
    // use custom shader
    shader(uvShader);
    uvShader.setUniform('opacity', opacity.value());
    // screen-space quad (i.e., x ∈ [0..width] and y ∈ [0..height])
    // see: https://github.com/VisualComputing/p5.treegl#heads-up-display
    loadFigure(mode.value());
}

function mouseWheel(event) {
    //comment to enable page scrolling
    return false;
}

function loadFigure(value) {
    if (value == 'quad') {
        beginHUD();
        noStroke();
        quad(0, 0, width, 0, width, height, 0, height);
        endHUD();
    } else if (value == 'ellipse') {
        beginHUD();
        noStroke();
        ellipse(width / 2, height / 2, width, height);
        endHUD()
    } else if (value == 'triangleUP') {
        beginHUD();
        noStroke();
        triangle(0, 0, width, 0, width, height);
        endHUD();
    } else if (value == 'triangleDOWN') {
        beginHUD();
        noStroke();
        triangle(0, 0, 0, height, width, height);
        endHUD();
    }
}
```
{{< /details >}}

{{< details title="uv_alpha.frag" open=false >}}
```GLSL
precision mediump float;

varying vec2 texcoords2;
varying vec4 color4;
// uniform is sent by the sketch
uniform float opacity;

void main() {
  gl_FragColor = vec4(texcoords2.xy, 1.0 - texcoords2.x, opacity);
}
```
{{< /details >}}

{{< p5-iframe sketch="/sketches/uv_screen.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="625" height="625" >}}

## Sketch de Luma y Aritmetic Mean

{{< details title="luma_mena.js" open=false >}}
```js
let lumaShader, meanShader;
let img1, img2;
let grey_scale, mode;

function preload() {
    lumaShader = readShader('/assets/shader/luma.frag', { varyings: Tree.texcoords2 });
    meanShader = readShader('/assets/shader/mean.frag', { varyings: Tree.texcoords2 });
    img1 = loadImage('/assets/image/fire.jpg');
    img2 = loadImage('/assets/image/fire2.jpg');
}

function setup() {
    createCanvas(600, 600, WEBGL);
    noStroke();
    textureMode(NORMAL);
    shader(lumaShader);
    mode = createSelect();
    mode.position(10, 10);
    mode.option('fire 1');
    mode.option('fire 2');
    mode.selected('fire 1');
    mode.changed(() => { console.log("Change"); });
    grey_scale = createSelect();
    grey_scale.position(60, 10);
    grey_scale.option('original');
    grey_scale.option('luma');
    grey_scale.option('average');
    grey_scale.selected('original');
    grey_scale.changed(() => { console.log("Change"); });
}

function draw() {
    background(0);
    loadShaderImage();
}
function loadShaderImage() {
    if (mode.value() == 'fire 1') {
        if (grey_scale.value() == 'luma') {
            resetShader();
            shader(lumaShader);
            lumaShader.setUniform('texture', img1);
            lumaShader.setUniform('grey_scale', true);
        } else if (grey_scale.value() == 'average') {
            resetShader();
            shader(meanShader);
            meanShader.setUniform('texture', img1);
            meanShader.setUniform('grey_scale', true);
        } else {
            resetShader();
            shader(lumaShader);
            lumaShader.setUniform('texture', img1);
            lumaShader.setUniform('grey_scale', false);
        }
    } else if (mode.value() == 'fire 2') {

        if (grey_scale.value() == 'luma') {
            resetShader();
            shader(lumaShader);
            lumaShader.setUniform('texture', img2);
            lumaShader.setUniform('grey_scale', true);
        } else if (grey_scale.value() == 'average') {
            resetShader();
            shader(meanShader);
            meanShader.setUniform('texture', img2);
            meanShader.setUniform('grey_scale', true);
        } else {
            resetShader();
            shader(lumaShader);
            lumaShader.setUniform('texture', img2);
            lumaShader.setUniform('grey_scale', false);
        }
    }
    quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
}
```
{{< /details >}}

{{< details title="luma.frag" open=false >}}
```GLSL
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return 0.299 * texel.r + 0.587 * texel.g + 0.114 * texel.b;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}
{{< details title="mean.frag" open=false >}}
```GLSL
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

// returns luma of given texel
float luma(vec3 texel) {
  return (texel.r + texel.g + texel.b)/3.0;
}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(luma(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}

{{< p5-iframe sketch="/sketches/Luma_Mean.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

## Sketch de HSV

{{< details title="hsv.js" open=false >}}
```js
let hsvShader;
let img1, img2, img3, img4, img5;
let grey_scale, mode;

function preload() {
    hsvShader = readShader('/assets/shader/hsv.frag', { varyings: Tree.texcoords2 });
    img1 = loadImage('/assets/image/landscape1.jpg');
    img2 = loadImage('/assets/image/landscape2.jpg');
    img3 = loadImage('/assets/image/landscape3.jpg');
    img4 = loadImage('/assets/image/landscape4.jpg');
    img5 = loadImage('/assets/image/landscape5.jpg');
    img1.resize(0, height);
    img2.resize(0, height);
    img3.resize(0, height);
    img4.resize(0, height);
    img5.resize(0, height);
}

function setup() {
    createCanvas(600, 600, WEBGL);
    noStroke();
    textureMode(NORMAL);
    mode = createSelect();
    mode.position(10, 10);
    mode.option('landscape 1');
    mode.option('landscape 2');
    mode.option('landscape 3');
    mode.option('landscape 4');
    mode.option('landscape 5');
    mode.selected('landscape 1');
    mode.changed(() => { console.log("Change"); });
    grey_scale = createSelect();
    grey_scale.position(110, 10);
    grey_scale.option('original');
    grey_scale.option('hsv');
    grey_scale.selected('original');
    grey_scale.changed(() => { console.log("Change"); });
}

function draw() {
    background(0);
    loadShaderImage();
}
function loadShaderImage() {
    if (mode.value() == 'landscape 1') {
        if (grey_scale.value() == 'hsv') {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img1);
            hsvShader.setUniform('grey_scale', true);
        } else {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img1);
            hsvShader.setUniform('grey_scale', false);
        }
    } else if (mode.value() == 'landscape 2') {
        if (grey_scale.value() == 'hsv') {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img2);
            hsvShader.setUniform('grey_scale', true);
        } else {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img2);
            hsvShader.setUniform('grey_scale', false);
        }
    } else if (mode.value() == 'landscape 3') {
        if (grey_scale.value() == 'hsv') {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img3);
            hsvShader.setUniform('grey_scale', true);
        } else {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img3);
            hsvShader.setUniform('grey_scale', false);
        }
    } else if (mode.value() == 'landscape 4') {
        if (grey_scale.value() == 'hsv') {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img4);
            hsvShader.setUniform('grey_scale', true);
        } else {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img4);
            hsvShader.setUniform('grey_scale', false);
        }
    } else if (mode.value() == 'landscape 5') {
        if (grey_scale.value() == 'hsv') {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img5);
            hsvShader.setUniform('grey_scale', true);
        } else {
            resetShader();
            shader(hsvShader);
            hsvShader.setUniform('texture', img5);
            hsvShader.setUniform('grey_scale', false);
        }
    }
    quad(-width / 2, -height / 2, width / 2, -height / 2,
        width / 2, height / 2, -width / 2, height / 2);
}
```
{{< /details >}}

{{< details title="hsv.frag" open=false >}}
```GLSL
precision mediump float;

// uniforms are defined and sent by the sketch
uniform bool grey_scale;
uniform sampler2D texture;

// interpolated texcoord (same name and type as in vertex shader)
varying vec2 texcoords2;

float modI(float a,float b) {
    float m=a-floor((a+0.5)/b)*b;
    return floor(m+0.5);
}

vec3 hsv(vec3 c)
{           
    float rValor = c.r;
    float gValor = c.g;
    float bValor = c.b;

    float maximo = max(max(rValor, gValor), bValor);
    float minimo = min(max(rValor, gValor), bValor);

    float h = 0.0;
    if(maximo == rValor){
        h = 60.0 * modI((gValor - bValor)/(maximo - minimo), 6.0);
    }else if (maximo == gValor){
        h = 60.0 * (((bValor - rValor) / (maximo - minimo)) + 2.0);
    }else{
        h = 60.0 * (((rValor - gValor) / (maximo - minimo)) + 4.0);
    }

    float s = 0.0;
    if(maximo != 0.0){
        s = (maximo - minimo) / maximo;
    }else{
        s = 0.0;
    }

    float v = maximo;

    return vec3(h, s, v);

}

void main() {
  // texture2D(texture, texcoords2) samples texture at texcoords2 
  // and returns the normalized texel color
  vec4 texel = texture2D(texture, texcoords2);
  gl_FragColor = grey_scale ? vec4((vec3(hsv(texel.rgb))), 1.0) : texel;
}
```
{{< /details >}}


{{< p5-iframe sketch="/sketches/hsv.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

**Referencias**

https://visualcomputing.github.io/docs/shaders/texturing/
https://vcwork.github.io/project/docs/Entrega3/parte1/
https://en.wikipedia.org/wiki/HSL_and_HSV