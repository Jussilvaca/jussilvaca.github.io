let multiR = 0;
let multiG = 0;
let multiB = 0;
let slider
function setup() {
  createCanvas(400, 400);
  colorSelectA = createColorPicker('yellow');
  colorSelectA.position(0, height);
  colorSelectA.style('width','100px');
  colorSelectB = createColorPicker('rgb(0,255,255)');
  colorSelectB.position(100, height);
  colorSelectB.style('width','100px');
  colorSelectC = createColorPicker('rgb(255,0,255)');
  colorSelectC.position(200, height);
  colorSelectC.style('width','100px');
}

function draw() {
  blendMode(BLEND)
  background('white');
  blendMode(MULTIPLY);
  fill(colorSelectA.color())
  circle(150, 280, 180);
  fill(colorSelectB.color())
  circle(250, 280, 180);
  fill(colorSelectC.color())
  circle(200, 200, 180);
}
function colorMultiply(color1, color2){
  let sumRGB1 = red(color1)+green(color1)+blue(color1);
  let sumRGB2 = red(color2)+green(color2)+blue(color2);
  multiR = (red(color1)/sumRGB1)*(red(color2)/sumRGB2)
  multiG = (green(color1)/sumRGB1)*(green(color2)/sumRGB2)
  multiB = (blue(color1)/sumRGB1)*(blue(color2)/sumRGB2)
}