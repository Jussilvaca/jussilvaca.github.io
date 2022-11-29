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