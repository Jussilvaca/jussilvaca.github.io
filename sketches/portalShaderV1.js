

let press = 0;
let changeCam = 0;
let angle = 0;
let kemonaSilver;
let player1, playerOnPortal1;
let fbo1, fbo1TextPort1;
let portalShader;

// obj models
let fox;
let cat1;
let cat2;
// texture of models
let fox_tex;
let cat1_tex;
let cat2_tex;

let edge = 80;

let cam1, cam2, cam3;
let cam3Pos, cam4Pos;
let onCam1 = true, onCam2 = false;
let dummy;



function preload() {
    kemonaSilver = loadImage('/assets/image/KemonaPlushSilver.jpg');
    fox_tex = loadImage('/assets/models/fox.png');
    fox = loadModel('/assets/models/fox.obj', true);
    cat1_tex = loadImage('/assets/models/cat_plush_01.png');
    cat1 = loadModel('/assets/models/catPlush.obj', true);
    cat2_tex = loadImage('/assets/models/cat_plush_02.png');
    cat2 = loadModel('/assets/models/catPlush.obj', true);
    portalShader = readShader('/assets/shader/portal.frag', { varyings: Tree.NONE });
}
function setup() {
    createCanvas(900, 900, WEBGL);
    dummy = createGraphics(1, 1, WEBGL);
    fbo1 = createGraphics(900, 900, WEBGL);
    fbo1TextPort1 = createGraphics(900, 900, WEBGL);

    player1 = new Player(0, 0, 600);
    playerOnPortal1 = new Player(0, 0, 0);

    portal1Onfbo1 = new Portal(0, 0, edge+80, 0);
    portal2Onfbo1 = new Portal(0, 0, 0, 0);
    portal1Onfbo1.link(portal2Onfbo1);

    cam1 = fbo1.createCamera(); // firts person camera

    cam2 = new Dw.EasyCam(fbo1._renderer, {
        distance: 848.5208406737183, // scalar (optional)
        center: [0, 0, 0],         // vector (optional)
        rotation: [0.9686568165691878, -0.24785495689905887, -0.014390494259618537, -0.008050200592452867],  // quaternion (optional)
    });
    cam2.attachMouseListeners(this._renderer);
    let state2 = cam2.getState();
    cam2.state_reset = state2;   // state to use on reset (double-click/tap)
    cam2.setViewport([0, 0, 900, 900]);

    cam3 = fbo1TextPort1.createCamera(); // camera on portal 1
}

function draw() {
    // 1. compute current main canvas camera params
    let position = fbo1.treeLocation();
    let center = p5.Vector.add(position, fbo1.treeDisplacement());
    let up = fbo1.treeDisplacement(Tree.j);

    fbo1TextPort1.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);
    // 2. set scenes
    scene(fbo1);
    scene(fbo1TextPort1);

    player1.movement();
    player1.render(fbo1);
    if (player1.playerPos != 0) {
        playerOnPortal1.pos = player1.pos
        playerOnPortal1.a = player1.a
        playerOnPortal1.render(fbo1TextPort1);
    }

    portal1Onfbo1.render(fbo1, 0, fbo1TextPort1, portalShader);
    let camCoor = camFovCoordinates(-900, player1.pos, -player1.a, -60, 40);
    cam1.camera(camCoor.xp, camCoor.yp, camCoor.zp, camCoor.xc, camCoor.yc, camCoor.zc, camCoor.xn, camCoor.yn, camCoor.zn)
    if (changeCam) {
        if (onCam1) {
            cam2.setCanvas(dummy._renderer);
            fbo1.setCamera(cam1)
            onCam1 = false;
            onCam2 = true;
        } else {
            if (onCam2) {
                fbo1.reset();
                cam2.setCanvas(fbo1._renderer);
                onCam1 = true;
                onCam2 = false;
            }
        }
        changeCam = 0;
    }
    if (press) {
        console.log({ x: player1.pos.x, y: player1.pos.y, z: player1.pos.z });
        console.log({ angle: player1.a });
        let v = p5.Vector.fromAngle(player1.a);
        console.log({ x: v.x, y: v.y, z: v.z });
        press = 0;
    }

    beginHUD();
    image(fbo1, 0, 0);
    endHUD();
}
class Player {
    constructor(x, y, z) {
        this.pos = createVector(x, y, z);
        this.prevPos = this.pos.copy();
        this.a = 0;
        this.speed = 3;
        this.aspeed = PI / 90;
        this.playerPos = this.pos;
        this.playerDis = 0;
    }

    move(fw) {
        this.prevPos.set(this.pos);
        const vel = p5.Vector.fromAngle(this.a);
        if (fw) {
            vel.mult(this.speed);
            this.pos.add(-vel.x, 0, vel.y);
        } else {
            vel.mult(this.speed);
            this.pos.add(vel.x, 0, -vel.y);
        }
        if (this.pos.x > 600) {
            this.pos.x = 600
        }
        if (this.pos.z > 600) {
            this.pos.z = 600
        }
        if (this.pos.x < -600) {
            this.pos.x = -600
        }
        if (this.pos.z < -610) {
            this.pos.z = -610
        }
    }

    movement() {
        if (keyIsDown(65))
            this.turn(1);
        if (keyIsDown(68))
            this.turn(-1);
        if (keyIsDown(87))
            this.move(true);
        if (keyIsDown(83))
            this.move(false);
    }

    turn(dir) {
        this.a += dir * this.aspeed;
    }

    render(fbo) {
        fbo.push();
        fbo.translate(this.pos.x, this.pos.y, this.pos.z);
        fbo.rotateY(this.a);
        fbo.noStroke();
        fbo.push();
        fbo.rotateZ(PI);
        fbo.rotateY(HALF_PI);
        fbo.texture(fox_tex);
        fbo.model(fox);
        fbo.pop();
        fbo.pop();
    }
}
class Portal {
    constructor(x, y, z, a) {
        this.pos = createVector(x, y, z);
        this.len = 220;
        this.a = a;
        this.portalPos = 0;
        this.linkedPortal = null;
    }

    link(other) {
        this.linkedPortal = other;
        other.linkedPortal = this;
    }

    check_(player) {
        const relativePos = player.playerPos.copy();
        relativePos.sub(this.portalPos);
        relativePos.rotate(-this.a);
        const relativePrevPos = player.prevPos.copy();
        relativePrevPos.sub(this.portalPos);
        relativePrevPos.rotate(-this.a);
        if ((relativePos.z < 28) !== (relativePrevPos.z < 28) && abs(relativePos.x) < this.len / 2) {
            console.log("Teletransportado");
            player.a += this.linkedPortal.a - this.a;
            return true;
        }
        return false;
    }

    check(player) {
        return this.check_(player);
    }

    render(fbo, numberPortal, texElement, portalShader) {
        fbo.push()
        fbo.translate(this.pos.x, this.pos.y, this.pos.z);
        fbo.rotateY(this.a);
        fbo.push()
        fbo.translate(0, 0, -1);
        if (numberPortal === 0) {
            fbo.fill(0, 0, 255)
        } else {
            fbo.fill(255, 158, 0)
        }
        fbo.circle(0, 0, 260)
        fbo.pop()
        if (portalShader) {
            fbo.shader(portalShader);
            fbo.emitResolution(portalShader);
            portalShader.setUniform('texture', texElement);
        } else {
            if (texElement) {
                fbo.texture(texElement);
            }
        }
        fbo.circle(0, 0, 250)
        this.portalPos = fbo.treeLocation(/*[0, 0, 0],*/ { from: Tree.MODEL, to: Tree.WORLD });
        fbo.pop()
    }
}
function scene(fbo) {
    fbo.background(120);
    fbo.reset();
    fbo.rectMode(CENTER);
    fbo.noStroke();
    fbo.push();
    fbo.ambientLight(255);
    fbo.push();
    fbo.rotateZ(angle)
    fbo.rotateX(angle)
    fbo.rotateY(angle)
    fbo.texture(kemonaSilver)
    fbo.box(100)
    fbo.pop();
    fbo.push();
    fbo.translate(-350, 0, -350);
    fbo.rotateZ(angle)
    fbo.rotateX(angle)
    fbo.rotateY(angle)
    fbo.texture(cat1_tex)
    fbo.model(cat1);
    fbo.pop();
    fbo.push();
    fbo.translate(350, 0, 350);
    fbo.rotateZ(angle)
    fbo.rotateX(angle)
    fbo.rotateY(angle)
    fbo.texture(cat2_tex)
    fbo.model(cat2);
    fbo.pop();
    fbo.push();
    fbo.noStroke();
    fbo.ambientLight(255);
    fbo.ambientMaterial(100);
    fbo.translate(0, 100);
    fbo.rotateX(HALF_PI);
    fbo.plane(1200, 1200);
    fbo.pop();
    fbo.pop();
}
function keyPressed() {
    if (keyCode === 67) {
        if (changeCam === 0) {
            changeCam = 1;
        }
    }
    if (keyCode === 73) {
        if (press === 0) {
            press = 1;
        }
    }
}
function camFovCoordinates(radio, posVec, angle, hy, chy) {
    let vecAngle = p5.Vector.fromAngle(angle);
    let radioCam = -10;
    return { xp: (posVec.x + (radioCam * vecAngle.x)), yp: posVec.y + hy, zp: (posVec.z + (radioCam * vecAngle.y)), xc: (posVec.x + (radio * vecAngle.x)), yc: posVec.y + chy, zc: (posVec.z + (radio * vecAngle.y)), xn: 0, yn: 1, zn: 0 };
}