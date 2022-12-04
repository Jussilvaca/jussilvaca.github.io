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

Algunos ejemplos de Blend tomando como base dos colores haciendo uso de Shader.

## Blend Add
Este modo de blend suma los valores de los pixeles de una capa con otra.
En el caso en que los valores sean superiores a {{< katex >}} 1 {{< /katex >}} (En el caso de RGB) éste se mostrará en blanco.

{{< details title="blendAdd.frag" open=false >}}
```GLSL
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = uMaterial1 + uMaterial2;
}
```
{{< /details >}}

## Blend Substract
Este modo de blend resta los valores de píxeles de una capa con la otra.
En caso de valores negativos, se muestra en negro.

{{< details title="blendSubstract.frag" open=false >}}
```GLSL
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = uMaterial1 - uMaterial2;
}
```
{{< /details >}}

## Blend Divide
Este blend divide los valores de píxeles de una capa con la otra. 
Es útil para iluminar imágenes en especial con colores grisáceos.

También es útil para eliminar tintes de color, ya que considerando que cualquier valor dividido por sí mismo es igual a {{< katex >}} 1.0 {{< /katex >}} , es decir, blanco.

{{< details title="blendDivide.frag" open=false >}}
```GLSL
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = uMaterial1 / uMaterial2;
}
```
{{< /details >}}

## Blend Screen
En este modo de blend los valores de los pixeles en las dos capas se invierten, se multiplican y posteriormente se vuelven a invertir.
El resultado es opuesto al blend de multiplicación y como resultado se tendrá un color más brillante (siempre que una de las capas sea más oscura que blanco)

{{< katex >}} f(a,b) = 1 - (1 - a)(1 - b) {{< /katex >}}

Donde {{< katex >}} a{{< /katex >}} es la capa base y {{< katex >}} b{{< /katex >}} es la capa superior.

Este tipo de blend tiene un resultado conmutativo.



{{< details title="blendScreen.frag" open=false >}}
```GLSL
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = vec4(1.0) - (vec4(1.0)- uMaterial1) * (vec4(1.0) - uMaterial2);
}
```
{{< /details >}}

## Blend Overlay
El Overlay Blend es una combinación de Multiply blend y Screen blend.
En donde: si la capa base es clara, la capa superior se vuelve más clara; si la capa base es oscura, la capa superior se vuelve más oscura; y no se ve afectada la capa superior si la capa base es gris.

{{< katex >}} 
f(a,b)= \left\{ \begin{array}{lcc}
             2ab, &   si  & a < 0.5 \\
             \\ 1 - 2(1 - a)(1 - b), &  si & x \geq  0,5 \\
             \end{array}
   \right.
{{< /katex >}}


Donde {{< katex >}} a{{< /katex >}} es la capa base y {{< katex >}} b{{< /katex >}} es la capa superior

{{< details title="blendOverlay.frag" open=false >}}
```GLSL
precision mediump float;

// uniforms are emitted from the sketch
// https://p5js.org/reference/#/p5.Shader/setUniform
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

float rChannel;
float gChannel;
float bChannel;
void main  ()  {
  // gl_FragColor is a special variable that defines the color of the pixel
  // https://p5js.org/reference/#/p5.Shader/setUniform
  if (uMaterial1.x <= 0.5) {
    rChannel = 2.0*uMaterial1.x*uMaterial2.x;
    }else{
    rChannel = 1.0 - 2.0*(1.0-uMaterial1.x)*(1.0-uMaterial2.x);
    }

  if(uMaterial1.y <= 0.5){
    gChannel = 2.0*uMaterial1.y*uMaterial2.y;
    }else{
    gChannel = 1.0 - 2.0*(1.0-uMaterial1.y)*(1.0-uMaterial2.y);
    }

  if(uMaterial1.z <= 0.5){
    bChannel = 2.0*uMaterial1.z*uMaterial2.z;
    }else{
    bChannel = 1.0 - 2.0*(1.0-uMaterial1.z)*(1.0-uMaterial2.z);
    }
  gl_FragColor = vec4(rChannel, gChannel, bChannel, 1.0);
}
```
{{< /details >}}

## Blend SoftLight
Está muy relacionado con Overlay blend y hay múltiples maneras de aplicarlo, en este caso se utiliza la fórmula :

{{< katex >}} f_{pegtop}(a,b) = (1 - 2b)a² + 2ba{{< /katex >}}

que es una interpolación lineal Multiply blend (para {{< katex >}} a = 0{{< /katex >}}) y Screen Blend ( para {{< katex >}} a = 1 {{< /katex >}}).

{{< details title="blendSoftLight.frag" open=false >}}
```GLSL
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = (vec4(1.0)-2.0*uMaterial2)*(uMaterial1*uMaterial1)+2.0*uMaterial2*uMaterial1;
}
```
{{< /details >}}

## Blend Darkness
Sólo se toman los valores de los colores más oscuros, de modo que:

{{< katex >}} C = min(A*factor,B) {{< /katex >}}

{{< details title="blendDarkness.frag" open=false >}}
```GLSL
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = min(uMaterial1, uMaterial2);
}
```
{{< /details >}}

## Blend Lighten
Sólo se toman los valores de los colores más claros, de modo que:

{{< katex >}} C = max(A*factor,B) {{< /katex >}}

{{< details title="blendLighten.frag" open=false >}}
```GLSL
precision mediump float;

uniform float brightness;
uniform vec4 uMaterial1;
uniform vec4 uMaterial2;

void main() {
  gl_FragColor = max(uMaterial1, uMaterial2);
}
```
{{< /details >}}
{{< p5-iframe sketch="/sketches/blendAllModes.js" lib1="https://cdn.jsdelivr.net/gh/VisualComputing/p5.treegl/p5.treegl.js" width="625" height="625" >}}

{{< details title="blendAllModes.js" open=false >}}
```js
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
```
{{< /details >}}

**Referencias**

https://en.wikipedia.org/wiki/Blend_modes
https://p5js.org/reference/#/p5/blendMode
https://visualcomputing.github.io/docs/shaders/coloring/