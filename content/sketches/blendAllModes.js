let AddShader, SubstractShader, DivideShader, ScreenShader, OverlayShader, SoftLightShader, DarknessShader, LightenShader;
let c1, c2;
let mode;

function preload() {
    AddShader = readShader('/assets/shader/blendAdd.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
    SubstractShader = readShader('/assets/shader/blendSubstract.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
    DivideShader = readShader('/assets/shader/blendDivide.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
    ScreenShader = readShader('/assets/shader/blendScreen.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
    OverlayShader = readShader('/assets/shader/blendOverlay.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
    SoftLightShader = readShader('/assets/shader/blendSoftLight.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
    DarknessShader = readShader('/assets/shader/blendDarkness.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
    LightenShader = readShader('/assets/shader/blendLighten.frag', { matrices: Tree.NONE, varyings: Tree.NONE });
}

function setup() {
    createCanvas(600, 600, WEBGL);
    colorMode(RGB, 1);
    noStroke();
    c1 = createColorPicker(color(0.8, 0.5, 0.3));
    c1.position(10, 10);
    c2 = createColorPicker(color(0.9, 0.1, 0.4));
    c2.position(width / 2 + 10, 10);
    mode = createSelect();
    mode.position(10, 40);
    mode.option('AddShader');
    mode.option('SubstractShader');
    mode.option('DivideShader');
    mode.option('ScreenShader');
    mode.option('OverlayShader');
    mode.option('SoftLightShader');
    mode.option('DarknessShader');
    mode.option('LightenShader');
    mode.selected('AddShader');
    mode.changed(() => { console.log("Change"); });
}
function draw() {
    background(0);
    loadAShader(mode.value());
}
function loadAShader(value) {
    if (value == 'AddShader') {
        resetShader();
        shader(AddShader);
        AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        AddShader.setUniform('uMaterial2', [0.0, 0.0, 0.0, 0.0]);

        beginShape();
        vertex(-0.1, 0.1, 0);
        vertex(-0.1, 0.9, 0);
        vertex(-0.9, 0.9, 0);
        vertex(-0.9, 0.1, 0);
        endShape();

        AddShader.setUniform('uMaterial1', [0.0, 0.0, 0.0, 0.0]);
        AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.1, 0.1, 0);
        vertex(0.1, 0.9, 0);
        vertex(0.9, 0.9, 0);
        vertex(0.9, 0.1, 0);
        endShape();

        AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.45, -0.1, 0);
        vertex(0.45, -0.9, 0);
        vertex(-0.45, -0.9, 0);
        vertex(-0.45, -0.1, 0);
        endShape();
    }else if (value == 'SubstractShader') {
        resetShader();
        shader(SubstractShader);
        SubstractShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        SubstractShader.setUniform('uMaterial2', [0.0, 0.0, 0.0, 0.0]);

        beginShape();
        vertex(-0.1, 0.1, 0);
        vertex(-0.1, 0.9, 0);
        vertex(-0.9, 0.9, 0);
        vertex(-0.9, 0.1, 0);
        endShape();

        SubstractShader.setUniform('uMaterial1', [0.0, 0.0, 0.0, 0.0]);
        SubstractShader.setUniform('uMaterial2', [-red(c2.color()), -green(c2.color()), -blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.1, 0.1, 0);
        vertex(0.1, 0.9, 0);
        vertex(0.9, 0.9, 0);
        vertex(0.9, 0.1, 0);
        endShape();

        SubstractShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        SubstractShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.45, -0.1, 0);
        vertex(0.45, -0.9, 0);
        vertex(-0.45, -0.9, 0);
        vertex(-0.45, -0.1, 0);
        endShape();
    }else if(value == 'DivideShader'){
        resetShader();
        shader(DivideShader);

        DivideShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        DivideShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);

        beginShape();
        vertex(-0.1, 0.1, 0);
        vertex(-0.1, 0.9, 0);
        vertex(-0.9, 0.9, 0);
        vertex(-0.9, 0.1, 0);
        endShape();

        DivideShader.setUniform('uMaterial1', [red(c2.color())**2, green(c2.color())**2, blue(c2.color())**2, 1.0]);
        DivideShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.1, 0.1, 0);
        vertex(0.1, 0.9, 0);
        vertex(0.9, 0.9, 0);
        vertex(0.9, 0.1, 0);
        endShape();

        DivideShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        DivideShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.45, -0.1, 0);
        vertex(0.45, -0.9, 0);
        vertex(-0.45, -0.9, 0);
        vertex(-0.45, -0.1, 0);
        endShape();
    }else if(value == 'ScreenShader'){
        resetShader();
        shader(AddShader);

        AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        AddShader.setUniform('uMaterial2', [0.0, 0.0, 0.0, 0.0]);

        beginShape();
        vertex(-0.1, 0.1, 0);
        vertex(-0.1, 0.9, 0);
        vertex(-0.9, 0.9, 0);
        vertex(-0.9, 0.1, 0);
        endShape();

        AddShader.setUniform('uMaterial1', [0.0, 0.0, 0.0, 0.0]);
        AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.1, 0.1, 0);
        vertex(0.1, 0.9, 0);
        vertex(0.9, 0.9, 0);
        vertex(0.9, 0.1, 0);
        endShape();

        resetShader();
        shader(ScreenShader);

        ScreenShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        ScreenShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.45, -0.1, 0);
        vertex(0.45, -0.9, 0);
        vertex(-0.45, -0.9, 0);
        vertex(-0.45, -0.1, 0);
        endShape();
    }else if(value == 'OverlayShader'){
        resetShader();
        shader(AddShader);

        AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        AddShader.setUniform('uMaterial2', [0.0, 0.0, 0.0, 0.0]);

        beginShape();
        vertex(-0.1, 0.1, 0);
        vertex(-0.1, 0.9, 0);
        vertex(-0.9, 0.9, 0);
        vertex(-0.9, 0.1, 0);
        endShape();

        AddShader.setUniform('uMaterial1', [0.0, 0.0, 0.0, 0.0]);
        AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.1, 0.1, 0);
        vertex(0.1, 0.9, 0);
        vertex(0.9, 0.9, 0);
        vertex(0.9, 0.1, 0);
        endShape();

        resetShader();
        shader(OverlayShader);

        OverlayShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        OverlayShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
        
        beginShape();
        vertex(0.45, -0.1, 0);
        vertex(0.45, -0.9, 0);
        vertex(-0.45, -0.9, 0);
        vertex(-0.45, -0.1, 0);
        endShape();
    }else if(value == 'SoftLightShader'){
        resetShader();
        shader(AddShader);

        AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        AddShader.setUniform('uMaterial2', [0.0, 0.0, 0.0, 0.0]);

        beginShape();
        vertex(-0.1, 0.1, 0);
        vertex(-0.1, 0.9, 0);
        vertex(-0.9, 0.9, 0);
        vertex(-0.9, 0.1, 0);
        endShape();

        AddShader.setUniform('uMaterial1', [0.0, 0.0, 0.0, 0.0]);
        AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.1, 0.1, 0);
        vertex(0.1, 0.9, 0);
        vertex(0.9, 0.9, 0);
        vertex(0.9, 0.1, 0);
        endShape();

        resetShader();
        shader(SoftLightShader);

        SoftLightShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        SoftLightShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
        
        beginShape();
        vertex(0.45, -0.1, 0);
        vertex(0.45, -0.9, 0);
        vertex(-0.45, -0.9, 0);
        vertex(-0.45, -0.1, 0);
        endShape();
    }else if(value == 'DarknessShader'){
        resetShader();
        shader(AddShader);

        AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        AddShader.setUniform('uMaterial2', [0.0, 0.0, 0.0, 0.0]);

        beginShape();
        vertex(-0.1, 0.1, 0);
        vertex(-0.1, 0.9, 0);
        vertex(-0.9, 0.9, 0);
        vertex(-0.9, 0.1, 0);
        endShape();

        AddShader.setUniform('uMaterial1', [0.0, 0.0, 0.0, 0.0]);
        AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.1, 0.1, 0);
        vertex(0.1, 0.9, 0);
        vertex(0.9, 0.9, 0);
        vertex(0.9, 0.1, 0);
        endShape();

        resetShader();
        shader(DarknessShader);

        DarknessShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        DarknessShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
        
        beginShape();
        vertex(0.45, -0.1, 0);
        vertex(0.45, -0.9, 0);
        vertex(-0.45, -0.9, 0);
        vertex(-0.45, -0.1, 0);
        endShape();
    }else if(value == 'LightenShader'){
        resetShader();
        shader(AddShader);

        AddShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        AddShader.setUniform('uMaterial2', [0.0, 0.0, 0.0, 0.0]);

        beginShape();
        vertex(-0.1, 0.1, 0);
        vertex(-0.1, 0.9, 0);
        vertex(-0.9, 0.9, 0);
        vertex(-0.9, 0.1, 0);
        endShape();

        AddShader.setUniform('uMaterial1', [0.0, 0.0, 0.0, 0.0]);
        AddShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);

        beginShape();
        vertex(0.1, 0.1, 0);
        vertex(0.1, 0.9, 0);
        vertex(0.9, 0.9, 0);
        vertex(0.9, 0.1, 0);
        endShape();

        resetShader();
        shader(LightenShader);

        LightenShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
        LightenShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
        
        beginShape();
        vertex(0.45, -0.1, 0);
        vertex(0.45, -0.9, 0);
        vertex(-0.45, -0.9, 0);
        vertex(-0.45, -0.1, 0);
        endShape();
    }
}