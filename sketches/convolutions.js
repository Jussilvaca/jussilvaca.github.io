let gaussianKernel = [1 / 16, 1 / 8, 1 / 16, 1 / 8, 1 / 4, 1 / 8, 1 / 16, 1 / 8, 1 / 16];
let boxKernel = [1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9, 1 / 9];
let edgeKernel = [-1, -1, -1, -1, 8, -1, -1, -1, -1];
let horizontalEdge = [-3, 0, 3, -10, 0, 10, -3, 0, 3];
let sharpenKernel = [0, -1, 0, -1, 5, -1, 0, -1, 0];
let verticalEdge = [-3, -10, -3, 0, 0, 0, 3, 10, 3];
let sobelKernel = [-1, -2, -1, 0, 0, 0, 1, 2, 1];
let imagesNames = [
    '/assets/image/hero.jpeg',
    '/assets/image/cave.jpeg',
    '/assets/image/figth.jpeg',
    '/assets/image/rain.jpeg',
    '/assets/image/sword.jpeg',
];

let histogram;
let showHistogram;
let textMessage;
let currFont;

let kernel = [0, 0, 0, 0, 1, 0, 0, 0, 0];
let files = [];
let images = [];
let canvasSize = 600;
let kernelSelect = 0;
let imageSelector = 0;
let brightness = 1;

function preload() {
    currFont = loadFont("/assets/font/Lato-Regular.ttf");
    textMessage = 'Original';
    showHistogram = false;

    for (let i = 0; i < imagesNames.length; i++) {
        print('Loading image ' + imagesNames[i]);
        files[i] = loadImage(imagesNames[i]);
        images[i] = loadImage(imagesNames[i]);
    }
}

function setup() {
    createCanvas(canvasSize, canvasSize);
    pixelDensity(1);

    for (let i = 0; i < imagesNames.length; i++) {
        files[i].resize(0, canvasSize);
        images[i].resize(0, canvasSize);
    }
    convolveImage();
}

function draw() {
    image(images[imageSelector], 0, 0);
    if (showHistogram) drawHistogram();

    setText();
}

function resetImage() {
    images[imageSelector].copy(files[imageSelector], 0, 0, files[imageSelector].width, files[imageSelector].height, 0, 0, files[imageSelector].width, files[imageSelector].height);
}

function setText() {
    let bounding_box = currFont.textBounds(textMessage, width / 2, 50, 30);
    textSize(20);
    textAlign(CENTER);
    fill(255);

    rect(bounding_box.x, bounding_box.y, bounding_box.w, bounding_box.h);
    fill(0);
    noStroke();
    text(textMessage, width / 2, 50);
}

function drawHistogram() {
    histogram = [];
    for (let i = 0; i < 256; i++) {
        histogram[i] = 0;
    }
    for (let i = 0; i < images[imageSelector].pixels.length; i += 4) {
        let r = images[imageSelector].pixels[i];
        let g = images[imageSelector].pixels[i + 1];
        let b = images[imageSelector].pixels[i + 2];
        let a = images[imageSelector].pixels[i + 3];
        let brightness = (r + g + b) / 3;
        histogram[brightness]++;
    }
    noStroke();
    fill(255, 0, 0);
    for (let i = 0; i < histogram.length; i++) {
        let x = map(i, 0, 255, 0, width);
        let y = map(histogram[i], 0, images[imageSelector].height, 0, height);
        rect(x, height, width / 256, -y);
    }
}

function getConvolution(pixelX, pixelY) {
    let r = 0.0;
    let g = 0.0;
    let b = 0.0;

    for (let i = 0; i < 9; i++) {
        let location = (pixelX + floor(i / 3) + images[imageSelector].width * (pixelY + i % 3)) * 4;

        r += images[imageSelector].pixels[location] * kernel[i];
        g += images[imageSelector].pixels[location + 1] * kernel[i];
        b += images[imageSelector].pixels[location + 2] * kernel[i];
    }


    return {
        r: constrain(r, 0, 255),
        g: constrain(g, 0, 255),
        b: constrain(b, 0, 255),
    };
}

function convolveImage() {
    resetImage();
    images[imageSelector].loadPixels();

    for (let x = 1; x < images[imageSelector].width - 1; x++) {
        for (let y = 1; y < images[imageSelector].height - 1; y++) {
            let operatedPixel = getConvolution(x, y);
            let position = (x + y * images[imageSelector].width) * 4;

            images[imageSelector].pixels[position] = operatedPixel.r;
            images[imageSelector].pixels[position + 1] = operatedPixel.g;
            images[imageSelector].pixels[position + 2] = operatedPixel.b;
            images[imageSelector].pixels[position + 3] = alpha(color(operatedPixel.r, operatedPixel.g, operatedPixel.b));
        }
    }

    stroke(300, 100, 80);
    images[imageSelector].updatePixels();
}

function control_brightness(isDecreasing) {
    if (isDecreasing) {
        brightness = 0.9;
    }
    else {
        brightness = 1.1;
    }

    for (let x = 1; x < images[imageSelector].width - 1; x++) {
        for (let y = 1; y < images[imageSelector].height - 1; y++) {
            let position = (x + y * images[imageSelector].width) * 4;

            images[imageSelector].pixels[position] = images[imageSelector].pixels[position] * brightness;
            images[imageSelector].pixels[position + 1] = images[imageSelector].pixels[position + 1] * brightness;
            images[imageSelector].pixels[position + 2] = images[imageSelector].pixels[position + 2] * brightness;
            images[imageSelector].pixels[position + 3] = images[imageSelector].pixels[position + 3] * brightness;
        }
    }

    images[imageSelector].updatePixels();
}

function switchKernel() {
    kernelSelect++;

    if (kernelSelect >= 8) {
        kernelSelect = 0;
    }

    switch (kernelSelect) {
        case 1:
            kernel = gaussianKernel;
            textMessage = 'Desenfoque Gaussiano';
            break;
        case 2:
            kernel = edgeKernel;
            textMessage = 'Detección de Bordes';
            break;
        case 3:
            kernel = boxKernel;
            textMessage = 'Desenfoque de Caja';
            break;
        case 4:
            kernel = horizontalEdge;
            textMessage = 'Detección horizontal';
            break;
        case 5:
            kernel = sharpenKernel;
            textMessage = 'Transformación de Agudeza';
            break;
        case 6:
            kernel = sobelKernel;
            textMessage = 'Operador de Sobel';
            break;
        case 7:
            kernel = verticalEdge;
            textMessage = 'Detección vertical';
            break;
        default:
            kernel = [0, 0, 0, 0, 1, 0, 0, 0, 0];
            textMessage = 'Original';
            resetImage();
            break;
    }

    convolveImage();
}

function switchImage() {
    imageSelector++;

    if (imageSelector >= imagesNames.length) {
        imageSelector = 0;
    }

    kernel = [0, 0, 0, 0, 1, 0, 0, 0, 0];
    textMessage = 'Original';
    convolveImage();
    resetImage();
}

function switchHistogram() {
    showHistogram = !showHistogram;
}

function keyPressed() {
    switch (key) {
        case 'f':
            switchKernel();
            break;
        case 'g':
            switchHistogram();
            break;
        case 'h':
            switchImage();
            break;
        case 'v':
            control_brightness(true);
            break;
        case 'b':
            control_brightness(false);
            break;
        case 'r':
            resetImage();
            break;
    }
}