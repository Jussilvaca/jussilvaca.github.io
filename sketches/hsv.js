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