let AddShader;
let c1, c2, brightBar;

function preload() {
    AddShader = readShader('/assets/shader/blendBright.frag',
        { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
    createCanvas(600, 600, WEBGL);
    colorMode(RGB, 1);
    noStroke();
    c1 = createColorPicker(color(0.8, 0.5, 0.3));
    c1.position(10, 10);
    c2 = createColorPicker(color(0.9, 0.1, 0.4));
    c2.position(width / 2 + 10, 10);
    brightBar = createSlider(0, 1, 0.5, 0.05);
    brightBar.position(width / 2 - 35, height / 2);
    brightBar.style('width', '80px');
    shader(AddShader);
}
function draw() {
    background(0);

    AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
    AddShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);
    AddShader.setUniform('brightness', 1.0);
    beginShape();
    vertex(-0.1, 0.1, 0);
    vertex(-0.1, 0.9, 0);
    vertex(-0.9, 0.9, 0);
    vertex(-0.9, 0.1, 0);
    endShape();

    AddShader.setUniform('uMaterial1', [1.0, 1.0, 1.0, 1.0]);
    AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
    AddShader.setUniform('brightness', 1.0);
    beginShape();
    vertex(0.1, 0.1, 0);
    vertex(0.1, 0.9, 0);
    vertex(0.9, 0.9, 0);
    vertex(0.9, 0.1, 0);
    endShape();

    AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
    AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
    AddShader.setUniform('brightness', brightBar.value());
    beginShape();
    vertex(0.45, -0.1, 0);
    vertex(0.45, -0.9, 0);
    vertex(-0.45, -0.9, 0);
    vertex(-0.45, -0.1, 0);
    endShape();
}