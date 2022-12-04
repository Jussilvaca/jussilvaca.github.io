let img1, img2, img3; // creates image variable
let resolution, image_select, mode;
let size; // element size
let loadOnce = false;


function preload() {
    img1 = loadImage('/assets/image/slav_cheems.jpg');
    img2 = loadImage('/assets/image/dark_cheems.jpg');
    img3 = loadImage('/assets/image/cheems.jpg');
    img1.resize(0, height);
    img2.resize(0, height);
    img3.resize(0, height);
}

function setup() {
    createCanvas(600, 600);

    resolution = createSlider(1, 200, 30, 1);
    resolution.position(10, 35);
    resolution.style('width', '120px');

    image_select = createSelect();
    image_select.position(10, 10);
    image_select.option('slav cheems');
    image_select.option('dark cheems');
    image_select.option('cheems');
    image_select.selected('slav cheems');
    image_select.changed(() => { console.log("Change"); });

    mode = createSelect();
    mode.position(120, 10);
    mode.option('original');
    mode.option('pixelator');
    mode.selected('original');
    mode.changed(() => { console.log("Change"); });
}


function draw() {
    background(0);
    size = floor(height / resolution.value());
    loadPixelImage();
}
function loadPixelImage() {
    if (image_select.value() == 'slav cheems') {
        image(img1, 0, 0, width, height);
        if (mode.value() == 'pixelator') {
            pixelator();
        }
    } else if (image_select.value() == 'dark cheems') {
        image(img2, 0, 0, width, height);
        if (mode.value() == 'pixelator') {
            pixelator();
        }
    } else if (image_select.value() == 'cheems') {
        image(img3, 0, 0, width, height);
        if (mode.value() == 'pixelator') {
            pixelator();
        }
    }
}
function pixelator() {
    loadPixels();
    for (var y = 0; y < height; y++) {
        for (var x = 0; x < width; x++) {
            var index = (x + y * width) * 4;
            var r = pixels[index + 0];
            var g = pixels[index + 1];
            var b = pixels[index + 2];
            var a = pixels[index + 3];

            noStroke();
            fill(r, g, b, a);
            rect(x, y, size, size);

            x = x + size - 1 // set new x value
        }
        y = y + size - 1 // set new y value
    }
}