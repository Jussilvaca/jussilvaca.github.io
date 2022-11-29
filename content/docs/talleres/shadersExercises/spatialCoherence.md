---
weight: 0
---

## Spatial coherence

El shader que se muestra a continuación utiliza la coherencia espacial para reducir el área de baja resolución a un solo texel. El programa toma una imagen como fuente de textura.

## Sketch Pixelator (Shader)
{{< details title="pixelator.js" open=false >}}
```js
'use strict';

let img1, img2, img3;
let mosaic;
// ui
let resolution;
let mode, image_select;

function preload() {

    mosaic = readShader('/assets/shader/pixelator.frag',
        { matrices: Tree.NONE, varyings: Tree.texcoords2 });
    img1 = loadImage('/assets/image/slav_cheems.jpg');
    img2 = loadImage('/assets/image/dark_cheems.jpg');
    img3 = loadImage('/assets/image/cheems.jpg');
    img1.resize(0, height);
    img2.resize(0, height);
    img3.resize(0, height);
}

function setup() {
    createCanvas(600, 600, WEBGL);
    textureMode(NORMAL);
    noStroke();

    resolution = createSlider(1, 200, 30, 1);
    resolution.position(10, 35);
    resolution.style('width', '120px');

    image_select = createSelect();
    image_select.position(10, 10);
    image_select.option('slav cheems');
    image_select.option('dark cheems');
    image_select.option('cheems');
    image_select.selected('slav cheems');
    image_select.changed(() => { console.log("Change"); });

    mode = createSelect();
    mode.position(120, 10);
    mode.option('original');
    mode.option('pixelator');
    mode.selected('original');
    mode.changed(() => { console.log("Change"); });
}

function draw() {
    background(0);
    // which previous exercise does this code actually solve?
    /*
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
    // texture coordinates are in the range 0..1
    // so we need to map the coordinates to the range -1..1
    // to get the correct texture mapping
    loadPixelImage();
}
function loadPixelImage() {
    if (image_select.value() == 'slav cheems') {
        if (mode.value() == 'pixelator') {
            resetShader();
            shader(mosaic);
            mosaic.setUniform('resolution', resolution.value());
            mosaic.setUniform('source', img1);
            mosaic.setUniform('original', false);
        } else {
            resetShader();
            shader(mosaic);
            mosaic.setUniform('resolution', resolution.value());
            mosaic.setUniform('source', img1);
            mosaic.setUniform('original', true);
        }
    } else if (image_select.value() == 'dark cheems') {
        if (mode.value() == 'pixelator') {
            resetShader();
            shader(mosaic);
            mosaic.setUniform('resolution', resolution.value());
            mosaic.setUniform('source', img2);
            mosaic.setUniform('original', false);
        } else {
            resetShader();
            shader(mosaic);
            mosaic.setUniform('resolution', resolution.value());
            mosaic.setUniform('source', img2);
            mosaic.setUniform('original', true);
        }
    } else if (image_select.value() == 'cheems') {
        if (mode.value() == 'pixelator') {
            resetShader();
            shader(mosaic);
            mosaic.setUniform('resolution', resolution.value());
            mosaic.setUniform('source', img3);
            mosaic.setUniform('original', false);
        } else {
            resetShader();
            shader(mosaic);
            mosaic.setUniform('resolution', resolution.value());
            mosaic.setUniform('source', img3);
            mosaic.setUniform('original', true);
        }
    }
    beginShape();
    vertex(-1, -1, 0, 0, 1);
    vertex(1, -1, 0, 1, 1);
    vertex(1, 1, 0, 1, 0);
    vertex(-1, 1, 0, 0, 0);
    endShape();
}
```
{{< /details >}}

{{< details title="pixelator.frag" open=false >}}
```GLSL
precision mediump float;

// source (image or video) is sent by the sketch
uniform sampler2D source;
// displays original
uniform bool original;
// target horizontal & vertical resolution
uniform float resolution;

// interpolated texcoord (same name and type as in vertex shader)
// defined as a (normalized) vec2 in [0..1]
varying vec2 texcoords2;

void main() {
  if (original) {
    gl_FragColor = texture2D(source, texcoords2);
  }
  else {
    // define stepCoord to sample the texture source as a 3-step process:
    // i. define stepCoord as a texcoords2 remapping in [0.0, resolution] ∈ R
    vec2 stepCoord = texcoords2 * resolution;
    // ii. remap stepCoord in [0.0, resolution] ∈ Z
    // see: https://thebookofshaders.com/glossary/?search=floor
    stepCoord = floor(stepCoord);
    // iii. remap stepCoord in [0.0, 1.0] ∈ R
    stepCoord = stepCoord / vec2(resolution);
    // source texel
    gl_FragColor = texture2D(source, stepCoord);
    // ✨ source texels may be used to compute image palette lookup keys,
    // such as in video & photographic mosaics or ascii art visualizations.
  }
}
```
{{< /details >}}

{{< p5-iframe sketch="/sketches/pixelator.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

## Sketch Pixelator (Software)

{{< details title="pixelatorSW.js" open=false >}}
```js
let img1, img2, img3; // creates image variable
let resolution, image_select, mode;
let size; // element size
let loadOnce = false;


function preload() {
    img1 = loadImage('/assets/image/slav_cheems.jpg');
    img2 = loadImage('/assets/image/dark_cheems.jpg');
    img3 = loadImage('/assets/image/cheems.jpg');
    img1.resize(0, height);
    img2.resize(0, height);
    img3.resize(0, height);
}

function setup() {
    createCanvas(600, 600);

    resolution = createSlider(1, 200, 30, 1);
    resolution.position(10, 35);
    resolution.style('width', '120px');

    image_select = createSelect();
    image_select.position(10, 10);
    image_select.option('slav cheems');
    image_select.option('dark cheems');
    image_select.option('cheems');
    image_select.selected('slav cheems');
    image_select.changed(() => { console.log("Change"); });

    mode = createSelect();
    mode.position(120, 10);
    mode.option('original');
    mode.option('pixelator');
    mode.selected('original');
    mode.changed(() => { console.log("Change"); });
}


function draw() {
    background(0);
    size = floor(height / resolution.value());
    loadPixelImage();
}
function loadPixelImage() {
    if (image_select.value() == 'slav cheems') {
        image(img1, 0, 0, width, height);
        if (mode.value() == 'pixelator') {
            pixelator();
        }
    } else if (image_select.value() == 'dark cheems') {
        image(img2, 0, 0, width, height);
        if (mode.value() == 'pixelator') {
            pixelator();
        }
    } else if (image_select.value() == 'cheems') {
        image(img3, 0, 0, width, height);
        if (mode.value() == 'pixelator') {
            pixelator();
        }
    }
}
function pixelator() {
    loadPixels();
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;
            var r = pixels[index + 0];
            var g = pixels[index + 1];
            var b = pixels[index + 2];
            var a = pixels[index + 3];

            noStroke();
            fill(r, g, b, a);
            rect(x, y, size, size);

            x = x + size - 1 
        }
        y = y + size - 1 
    }
}
```
{{< /details >}}

{{< p5-iframe sketch="/sketches/pixelatorSW.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}