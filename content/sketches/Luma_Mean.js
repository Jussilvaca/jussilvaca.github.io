let lumaShader, meanShader;
let img1, img2;
let grey_scale, mode;

function preload() {
    lumaShader = readShader('/assets/shader/luma.frag', { varyings: Tree.texcoords2 });
    meanShader = readShader('/assets/shader/mean.frag', { varyings: Tree.texcoords2 });
    img1 = loadImage('/assets/image/fire.jpg');
    img2 = loadImage('/assets/image/fire2.jpg');
    img1.resize(0, height);
    img2.resize(0, height);
}

function setup() {
    createCanvas(600, 600, WEBGL);
    noStroke();
    textureMode(NORMAL);
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