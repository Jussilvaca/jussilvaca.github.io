let easycam;
let edge = 80;
let teapot, bunny, dog, fox, cow, cup;
let teapotTex, bunnyTex, dogTex, foxTex, cowTex, cupTex;
let texShader;

function preload() {
    // no varyings need to be emitted from the vertex shader
    texShader = readShader('/assets/shader/non_euclidean.frag',
        { varyings: Tree.NONE });
    teapot = loadModel('/assets/models/teapot.obj', true);
    bunny = loadModel('/assets/models/bunny.obj', true);
    dog = loadModel('/assets/models/dog.obj', true);
    fox = loadModel('/assets/models/fox.obj', true);
    cow = loadModel('/assets/models/cow.obj', true);
    cup = loadModel('/assets/models/cup.obj', true);
}

function setup() {
    createCanvas(600, 600, WEBGL);
    // no need to normalize the texture
    // textureMode(NORMAL);
    shader(texShader);
    // resolution will be used to sample the offscreen textures
    emitResolution(texShader);
    easycam = createEasyCam();
    teapotTex = createGraphics(width, height, WEBGL);
    bunnyTex = createGraphics(width, height, WEBGL);
    dogTex = createGraphics(width, height, WEBGL);
    foxTex = createGraphics(width, height, WEBGL);
    cowTex = createGraphics(width, height, WEBGL);
    cupTex = createGraphics(width, height, WEBGL);
}

function draw() {
    // 1. compute current main canvas camera params
    let position = treeLocation();
    let center = p5.Vector.add(position, treeDisplacement());
    let up = treeDisplacement(Tree.j);
    // in case the current camera projection params are needed check:
    // https://github.com/VisualComputing/p5.treegl#frustum-queries
    // 2. offscreen rendering
    // bunny graphics
    bunnyTex.background(200);
    bunnyTex.reset();
    bunnyTex.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);
    bunnyTex.push();
    bunnyTex.noStroke();
    bunnyTex.fill('red');
    // most models use positive y-coordinates
    bunnyTex.scale(1, -1);
    bunnyTex.scale(0.8);// only bunny
    bunnyTex.model(bunny);
    bunnyTex.pop();
    // teapot graphics
    teapotTex.background(200);
    teapotTex.reset();
    teapotTex.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);
    teapotTex.push();
    teapotTex.noStroke();
    teapotTex.fill('blue');
    teapotTex.scale(1, -1);
    teapotTex.model(teapot);
    teapotTex.pop();
    // dog graphics
    dogTex.background(200);
    dogTex.reset();
    dogTex.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);
    dogTex.push();
    dogTex.noStroke();
    dogTex.fill('green');
    dogTex.scale(1, -1);
    dogTex.model(dog);
    dogTex.pop();
    // fox graphics
    foxTex.background(200);
    foxTex.reset();
    foxTex.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);
    foxTex.push();
    foxTex.noStroke();
    foxTex.fill('yellow');
    foxTex.scale(1, -1);
    foxTex.model(fox);
    foxTex.pop();
    // cow graphics
    cowTex.background(200);
    cowTex.reset();
    cowTex.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);
    cowTex.push();
    cowTex.noStroke();
    cowTex.fill('orange');
    cowTex.scale(1, -1);
    cowTex.model(cow);
    cowTex.pop();
    // cup graphics
    cupTex.background(200);
    cupTex.reset();
    cupTex.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);
    cupTex.push();
    cupTex.noStroke();
    cupTex.fill('purple');
    cupTex.scale(1, -1);
    cupTex.model(cup);
    cupTex.pop();

    // 3. main canvas
    background(0);
    push();
    // front (+z)
    stroke('purple');
    strokeWeight(5);
    texShader.setUniform('texture', bunnyTex);
    beginShape();
    vertex(-edge, -edge, +edge);
    vertex(+edge, -edge, +edge);
    vertex(+edge, +edge, +edge);
    vertex(-edge, +edge, +edge);
    endShape(CLOSE);
    // right (+x)
    texShader.setUniform('texture', teapotTex);
    beginShape();
    vertex(+edge, -edge, +edge);
    vertex(+edge, -edge, -edge);
    vertex(+edge, +edge, -edge);
    vertex(+edge, +edge, +edge);
    endShape(CLOSE);
    // left (-x)
    texShader.setUniform('texture', dogTex);
    beginShape();
    vertex(-edge, -edge, -edge);
    vertex(-edge, -edge, +edge);
    vertex(-edge, +edge, +edge);
    vertex(-edge, +edge, -edge);
    endShape(CLOSE);
    // back (-z)
    texShader.setUniform('texture', foxTex);
    beginShape();
    vertex(+edge, -edge, -edge);
    vertex(-edge, -edge, -edge);
    vertex(-edge, +edge, -edge);
    vertex(+edge, +edge, -edge);
    endShape(CLOSE);
    // top (+y)
    texShader.setUniform('texture', cowTex);
    beginShape();
    vertex(-edge, +edge, +edge);
    vertex(+edge, +edge, +edge);
    vertex(+edge, +edge, -edge);
    vertex(-edge, +edge, -edge);
    endShape(CLOSE);
    // bottom (-y)
    texShader.setUniform('texture', cupTex);
    beginShape();
    vertex(-edge, -edge, -edge);
    vertex(+edge, -edge, -edge);
    vertex(+edge, -edge, +edge);
    vertex(-edge, -edge, +edge);
    endShape(CLOSE);
    pop();
}