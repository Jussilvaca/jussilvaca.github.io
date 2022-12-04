let uvShaderX, uvShaderY;	// shader objects
let mode;

function preload() {
    // Define geometry directly in clip space (i.e., matrices: Tree.NONE).
    // Interpolate only texture coordinates (i.e., varyings: Tree.texcoords2).
    // see: https://github.com/VisualComputing/p5.treegl#handling
    uvShaderBlueX = readShader('/assets/shader/uvBlueX.frag',
        { matrices: Tree.NONE, varyings: Tree.texcoords2 });
    uvShaderBlueY = readShader('/assets/shader/uvBlueY.frag',
        { matrices: Tree.NONE, varyings: Tree.texcoords2 });
}

function setup() {
    // shaders require WEBGL mode to work
    createCanvas(600, 600, WEBGL);
    noStroke();
    // see: https://p5js.org/reference/#/p5/shader
    // shader(uvShader);
    // https://p5js.org/reference/#/p5/textureMode
    // best and simplest is to just always used NORMAL
    mode = createSelect();
    mode.position(10, 10);
    mode.option('uvShaderBlueX');
    mode.option('uvShaderBlueY');
    mode.selected('uvShaderBlueX');
    mode.changed(() => { console.log("Change"); });
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
    loadAShader(mode.value());
}
function loadAShader(value) {
    if (value == 'uvShaderBlueX') {
        resetShader();
        shader(uvShaderBlueX);
        beginShape();
        vertex(-1, -1, 0, 0, 0);
        vertex(1, -1, 0, 1, 0);
        vertex(1, 1, 0, 1, 1);
        vertex(-1, 1, 0, 0, 1);
        endShape();
    } else if (value == 'uvShaderBlueY') {
        resetShader();
        shader(uvShaderBlueY);
        beginShape();
        vertex(-1, -1, 0, 0, 0);
        vertex(1, -1, 0, 1, 0);
        vertex(1, 1, 0, 1, 1);
        vertex(-1, 1, 0, 0, 1);
        endShape();
    }
}