---
weight: 0
---
## Portal Shaders Con Múltiples reflejos

En esta última etapa se incorporan los dos objetivos faltantes en la etapa anterior.

Primero, se corrigen las colisiones y la cantidad de veces que puede entrar el personaje al portal. 

Y por último, se adiciona dentro del portal los reflejos creados en el portal opuesto, de modo que dentro del portal se visualizan hasta 5 proyecciones de sí mismo para dar un efecto más realista y que acate los conceptos postulados por el juego original.

{{< details title="portal.frag" open=false >}}
```GLSL
precision mediump float;

// uniforms are defined and sent by the sketch
uniform sampler2D texture;
// see emitResolution: https://github.com/VisualComputing/p5.treegl#macros
uniform vec2 u_resolution;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution; // normalized pixel coordinates. gl_FragCoord (Screen Space), u_resolution (Screen Space)
  gl_FragColor = texture2D(texture, vec2(uv.x, 1.0 - uv.y)); // Mapping texels to screen pixels. Flip Y axis.
}
```
{{< /details >}}
{{< details title="portalShaderV3.js" open=false >}}
```js

let press = 0;  // variable get info funcions
let changeCam = 0; //variable that indicate the position of the camera
let angle = 0; // angle of rotation of some objects
let kemonaSilver; // Textura del cubo central
let player1, playerOnPortal1, playerOnPortal2;
let fbo1, fbo1TextPort1, fbo1TextPort2;
let fbo1Off1, fbo1Off2, fbo1Off3, fbo1Off4, fbo2Off1, fbo2Off2, fbo2Off3, fbo2Off4;
let portalShader, shader1Aux1, shader1Aux2, shader1Aux3, shader1Aux4, shader2Aux1, shader2Aux2, shader2Aux3, shader2Aux4;
let portal1Onfbo1, portal2Onfbo1;
let portal1Onfbo1Off, portal2Onfbo1Off;
let portal1Off1, portal1Off2, portal1Off3, portal2Off1, portal2Off2, portal2Off3;

// obj models
let fox;
let cat1;
let cat2;
// texture of models
let fox_tex;
let cat1_tex;
let cat2_tex;

let set1 = 0, set2 = 0;
let starCheck1 = 0, starCheck2 = 0, restart = 0;
let teleportedFbo1 = false, teleportedFbo2 = true;

let cam1, cam2;
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
    portalShader = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
    shader1Aux1 = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
    shader1Aux2 = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
    shader1Aux3 = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
    shader1Aux4 = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
    shader2Aux1 = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
    shader2Aux2 = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
    shader2Aux3 = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
    shader2Aux4 = readShader('/assets/shader/portal2.frag', { varyings: Tree.NONE });
}
function setup() {
    createCanvas(900, 900, WEBGL);
    dummy = createGraphics(1, 1, WEBGL);
    fbo1 = createGraphics(900, 900, WEBGL);
    fbo1Off1 = createGraphics(900, 900, WEBGL);
    fbo1Off2 = createGraphics(900, 900, WEBGL);
    fbo1Off3 = createGraphics(900, 900, WEBGL);
    fbo1Off4 = createGraphics(900, 900, WEBGL);
    fbo2Off1 = createGraphics(900, 900, WEBGL);
    fbo2Off2 = createGraphics(900, 900, WEBGL);
    fbo2Off3 = createGraphics(900, 900, WEBGL);
    fbo2Off4 = createGraphics(900, 900, WEBGL);

    fbo1TextPort1 = createGraphics(900, 900, WEBGL);
    fbo1TextPort2 = createGraphics(900, 900, WEBGL);

    player1 = new Player(0, 0, 100);
    playerOnPortal1 = new Player(0, 0, 0);
    playerOnPortal2 = new Player(0, 0, 0);
    portal1Onfbo1 = new Portal(0, 0, -437, 0);
    portal2Onfbo1 = new Portal(0, 0, 437, PI);
    portal2Onfbo1.link(portal1Onfbo1);

    portal1Onfbo1Off = new Portal(0, 0, -(437 + (1 * 880)), 0);
    portal1Off1 = new Portal(0, 0, -(437 + (2 * 880)), 0);
    portal1Off2 = new Portal(0, 0, -(437 + (3 * 880)), 0);
    portal1Off3 = new Portal(0, 0, -(437 + (4 * 880)), 0);
    
    portal2Onfbo1Off = new Portal(0, 0, (437 + (1 * 880)), PI);
    portal2Off1 = new Portal(0, 0, (437 + (2 * 880)), PI);
    portal2Off2 = new Portal(0, 0, (437 + (3 * 880)), PI);
    portal2Off3 = new Portal(0, 0, (437 + (4 * 880)), PI);

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
    console.log("XD");
}

function draw() {
    // 1. compute current main canvas camera params
    let position = fbo1.treeLocation();
    let center = p5.Vector.add(position, fbo1.treeDisplacement());
    let up = fbo1.treeDisplacement(Tree.j);

    fbo1TextPort1.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo1TextPort2.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo1Off1.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo1Off2.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo1Off3.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo1Off4.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo2Off1.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo2Off2.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo2Off3.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    fbo2Off4.camera(position.x, position.y, position.z,
        center.x, center.y, center.z,
        up.x, up.y, up.z);

    // 2. set scenes
    scene(fbo1, 0, 1, 1); // Escena Principal

    scene(fbo1TextPort1, -(1 * 880), 0, 1); // Escena Portal 1 de la escena principal
    scene(fbo1Off1, -(2 * 880), 0, 1); // Escena Portal 1 de la escena Off 1
    scene(fbo1Off2, -(3 * 880), 0, 1); // Escena Portal 1 de la escena Off 2
    scene(fbo1Off3, -(4 * 880), 0, 1); // Escena Portal 1 de la escena Off 3
    scene(fbo1Off4, -(5 * 880), 0, 1); // Escena Portal 1 de la escena Off 4

    scene(fbo1TextPort2, (1 * 880), 1, 0); // Escena Portal 2 de la escena principal
    scene(fbo2Off1, (2 * 880), 1, 0); // Escena Portal 2 de la escena Off 1
    scene(fbo2Off2, (3 * 880), 1, 0); // Escena Portal 2 de la escena Off 2
    scene(fbo2Off3, (4 * 880), 1, 0); // Escena Portal 2 de la escena Off 3
    scene(fbo2Off4, (5 * 880), 1, 0); // Escena Portal 2 de la escena Off 4
 

    player1.movement();
    player1.render(fbo1, 0);

    if (teleportedFbo1 && !teleportedFbo2) {

        if (abs(player1.playerPos.z) < (abs(portal1Onfbo1.portalPos.z) - 40)) {
            starCheck1 = 1;
        }

        if (abs(player1.playerPos.z) < (abs(portal2Onfbo1.portalPos.z) - 40)) {
            starCheck2 = 1;
        }

        if (starCheck1) {
            teleportedFbo1 = portal1Onfbo1.check(player1)
        }

        if (starCheck2) {
            teleportedFbo2 = portal2Onfbo1.check(player1)
        }
    }

    if (!teleportedFbo1 && teleportedFbo2) {

        if (abs(player1.playerPos.z) < (abs(portal1Onfbo1.portalPos.z) - 40)) {
            starCheck1 = 1;
        }

        if (abs(player1.playerPos.z) < (abs(portal2Onfbo1.portalPos.z) - 40)) {
            starCheck2 = 1;
        }

        if (starCheck1) {
            teleportedFbo1 = portal1Onfbo1.check(player1)
        }

        if (starCheck2) {
            teleportedFbo2 = portal2Onfbo1.check(player1)
        }
    }

    if ((!teleportedFbo1 && !teleportedFbo2)) {

        if (abs(player1.playerPos.z) < (abs(portal1Onfbo1.portalPos.z) - 40)) {
            starCheck1 = 1;
        }

        if (abs(player1.playerPos.z) < (abs(portal2Onfbo1.portalPos.z) - 40)) {
            starCheck2 = 1;
        }

        if (starCheck1) {
            teleportedFbo1 = portal1Onfbo1.check(player1)
        }

        if (starCheck2) {
            teleportedFbo2 = portal2Onfbo1.check(player1)
        }

        if (teleportedFbo1) {
            set1 = 1;
        }

        if (teleportedFbo2) {
            set2 = 1;
        }

        if (set1) {
            player1.pos = portal2Onfbo1.portalPos;
            starCheck2 = 0;
            set1 = 0;
        }

        if (set2) {
            player1.pos = portal1Onfbo1.portalPos;
            starCheck1 = 0;
            set2 = 0;
        }
    }


    if (player1.playerPos != 0) {
        playerOnPortal1.pos = player1.pos
        playerOnPortal1.a = player1.a
        playerOnPortal1.render(fbo1TextPort1, -(1 * 880));
        playerOnPortal1.render(fbo1Off1, -(2 * 880));
        playerOnPortal1.render(fbo1Off2, -(3 * 880));
        playerOnPortal1.render(fbo1Off3, -(4 * 880));
        playerOnPortal1.render(fbo1Off4, -(5 * 880));

        playerOnPortal2.pos = player1.pos
        playerOnPortal2.a = player1.a
        playerOnPortal2.render(fbo1TextPort2, (1 * 880));
        playerOnPortal2.render(fbo2Off1, (2 * 880));
        playerOnPortal2.render(fbo2Off2, (3 * 880));
        playerOnPortal2.render(fbo2Off3, (4 * 880));
        playerOnPortal2.render(fbo2Off4, (5 * 880));
    }


    angle += 0.007


    portal1Off3.render(fbo1Off3, 0, fbo1Off4, shader1Aux4);
    portal1Off2.render(fbo1Off2, 0, fbo1Off3, shader1Aux3);
    portal1Off1.render(fbo1Off1, 0, fbo1Off2, shader1Aux2);
    portal1Onfbo1Off.render(fbo1TextPort1, 0, fbo1Off1, shader1Aux1);
    portal1Onfbo1.render(fbo1, 0, fbo1TextPort1, portalShader);

    portal2Off3.render(fbo2Off3, 1, fbo2Off4, shader2Aux4);
    portal2Off2.render(fbo2Off2, 1, fbo2Off3, shader2Aux3);
    portal2Off1.render(fbo2Off1, 1, fbo2Off2, shader2Aux2);
    portal2Onfbo1Off.render(fbo1TextPort2, 1, fbo2Off1, shader2Aux1);
    portal2Onfbo1.render(fbo1, 1, fbo1TextPort2, portalShader);
    
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
        this.playerPos = 0;
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
        if (this.pos.x > 400) {
            this.pos.x = 400
        }
        if (this.pos.z > 400) {
            this.pos.z = 400
        }
        if (this.pos.x < -400) {
            this.pos.x = -400
        }
        if (this.pos.z < -410) {
            this.pos.z = -410
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

    render(fbo, displacement) {
        fbo.push();
        fbo.translate(0, 0, displacement);
        fbo.translate(this.pos.x, this.pos.y, this.pos.z);
        fbo.rotateY(this.a);
        fbo.noStroke();
        fbo.push();
        fbo.rotateZ(PI);
        fbo.rotateY(HALF_PI);
        fbo.texture(fox_tex);
        fbo.model(fox);
        this.playerPos = fbo.treeLocation(/*[0, 0, 0],*/ { from: Tree.MODEL, to: Tree.WORLD });
        this.playerDis = fbo.treeDisplacement(/*[0, 0, 0],*/ { from: Tree.MODEL, to: Tree.WORLD });
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
        if ((abs(relativePos.z) < 38) !== (abs(relativePrevPos.z) < 38) && abs(relativePos.x) < this.len / 2) {
            console.log("Teletransportado");
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
            fbo.resetShader();
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
function scene(fbo, displacement, frontWall, backWall) {
    fbo.background(120);
    fbo.reset();
    fbo.rectMode(CENTER);
    fbo.noStroke();
    fbo.push();
    fbo.translate(0, 0, displacement);
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
    // PISO
    fbo.push();
    fbo.stroke(2);
    fbo.ambientLight(255);
    fbo.ambientMaterial(100);
    fbo.translate(0, 110);
    fbo.rotateX(HALF_PI);
    fbo.box(900, 900, 20);
    fbo.pop();
    // PAREDES
    if (frontWall) {
        // Frontal Z+
        fbo.push();
        fbo.stroke(2);
        fbo.ambientLight(255);
        fbo.ambientMaterial(100);
        fbo.translate(0, -25, 450);
        fbo.box(900, 250, 20);
        fbo.pop();
    }
    if (backWall) {
        // Trasera Z-
        fbo.push();
        fbo.stroke(2);
        fbo.ambientLight(255);
        fbo.ambientMaterial(100);
        fbo.translate(0, -25, -450);
        fbo.box(900, 250, 20);
        fbo.pop();
    }
    // Lateral Derecha X+
    fbo.push();
    fbo.stroke(2);
    fbo.ambientLight(255);
    fbo.ambientMaterial(100);
    fbo.translate(450, -25, 0);
    fbo.rotateY(HALF_PI);
    fbo.box(900, 250, 20);
    fbo.pop();
    // Trasera Izquierda X-
    fbo.push();
    fbo.stroke(2);
    fbo.ambientLight(255);
    fbo.ambientMaterial(100);
    fbo.translate(-450, -25, 0);
    fbo.rotateY(HALF_PI);
    fbo.box(900, 250, 20);
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
```
{{< /details >}}

{{< details "Comandos" >}}
| Tecla | Descripción |
| -------- | ----------- |
| W | Mover hacia adelante |
| A | Girar hacia la izquierda |
| D | Girar hacia la derecha |
| S | Mover hacia atrás |
| C | Cambiar vista primera/tercera persona |
{{< /details >}}

{{< p5-iframe sketch="/sketches/portalShaderV3.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" lib2="https://cdn.jsdelivr.net/gh/freshfork/p5.EasyCam@1.2.1/p5.easycam.js" width="925" height="925" >}}


**Referencias**

https://visualcomputing.github.io/docs/shaders/non-euclidean_geometry/
https://es.wikipedia.org/wiki/Geometr%C3%ADa_no_euclidiana