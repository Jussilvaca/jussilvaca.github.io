---
weight: 0
---

## Blend Modes (Operaciones con Colores)


Blend Modes es la manera en la que P5 mostrara la combinacion de dos colores.

## Sketch de Blend (Multiplicacion)

Blend de dos colores haciendo uso de Shader (Multiplicacion)
A traves del Fragment shader se realiza la operacion de {{< katex >}}rgb1 * rgb2{{< /katex >}}

{{< details title="blend.js" open=false >}}
```js
let myShader;
let c1, c2;

function preload() {
    myShader = readShader('/assets/shader/blend.frag',
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
    shader(myShader);
}
function draw() {
    background(0);

    myShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
    myShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);
    beginShape();
    vertex(-0.1, 0.1, 0);
    vertex(-0.1, 0.9, 0);
    vertex(-0.9, 0.9, 0);
    vertex(-0.9, 0.1, 0);
    endShape();

    myShader.setUniform('uMaterial1', [1.0, 1.0, 1.0, 1.0]);
    myShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
    beginShape();
    vertex(0.1, 0.1, 0);
    vertex(0.1, 0.9, 0);
    vertex(0.9, 0.9, 0);
    vertex(0.9, 0.1, 0);
    endShape();

    myShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
    myShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
    beginShape();
    vertex(0.45, -0.1, 0);
    vertex(0.45, -0.9, 0);
    vertex(-0.45, -0.9, 0);
    vertex(-0.45, -0.1, 0);
    endShape();
}
```
{{< /details >}}
{{< details title="blend.frag" open=false >}}
```GLSL
precision mediump float;

// uniforms are emitted from the sketch
// https://p5js.org/reference/#/p5.Shader/setUniform
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = uMaterial1 * uMaterial2;
}
```
{{< /details >}}
{{< p5-iframe sketch="/sketches/blend.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

## Sketch Blend con Brillo (Multiplicacion)

Blend de dos colores haciendo uso de Shader con valor de brillo (Multiplicacion)

A traves del Fragment shader se realiza la operacion de {{< katex >}}brillo * rgb1 * rgb2{{< /katex >}}

{{< details title="blendBright.js" open=false >}}
```js
let myShader;
let c1, c2, brightBar;

function preload() {
    myShader = readShader('/assets/shader/blendBright.frag',
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
    shader(myShader);
}
function draw() {
    background(0);

    myShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
    myShader.setUniform('uMaterial2', [1.0, 1.0, 1.0, 1.0]);
    myShader.setUniform('brightness', 1.0);
    beginShape();
    vertex(-0.1, 0.1, 0);
    vertex(-0.1, 0.9, 0);
    vertex(-0.9, 0.9, 0);
    vertex(-0.9, 0.1, 0);
    endShape();

    myShader.setUniform('uMaterial1', [1.0, 1.0, 1.0, 1.0]);
    myShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
    myShader.setUniform('brightness', 1.0);
    beginShape();
    vertex(0.1, 0.1, 0);
    vertex(0.1, 0.9, 0);
    vertex(0.9, 0.9, 0);
    vertex(0.9, 0.1, 0);
    endShape();

    myShader.setUniform('uMaterial1', [red(c1.color()), green(c1.color()), blue(c1.color()), 1.0]);
    myShader.setUniform('uMaterial2', [red(c2.color()), green(c2.color()), blue(c2.color()), 1.0]);
    myShader.setUniform('brightness', brightBar.value());
    beginShape();
    vertex(0.45, -0.1, 0);
    vertex(0.45, -0.9, 0);
    vertex(-0.45, -0.9, 0);
    vertex(-0.45, -0.1, 0);
    endShape();
}
```
{{< /details >}}
{{< details title="blendBright.frag" open=false >}}
```GLSL
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = brightness * uMaterial1 * uMaterial2;
}
```
{{< /details >}}
{{< p5-iframe sketch="/sketches/blendBright.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

## Sketch Blend AllModes

Blend de dos colores haciendo uso de Shader (Todos los modos de Blend que hayamos podido implementar)

{{< p5-iframe sketch="/sketches/blendAllModes.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}