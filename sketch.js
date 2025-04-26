let pulsado = 0;

function setup() {
  let canvas = createCanvas(windowWidth, windowWidth); // cuadrado 1:1 basado en ancho
  canvas.parent('p5-container');
  rectMode(CENTER);
  strokeWeight(1);
  frameRate(10);
}

function draw() {
  background(255);

  if (frameCount % (480 * 2) === 0) {
    pulsado *= -1;
  }

  if (pulsado === 0) {
    paletaBlancoNegro();
  } else {
    paletaColorUno();
  }
}

function mousePressed() {
  pulsado = pulsado === 0 ? 1 : 0;
}

function windowResized() {
  resizeCanvas(windowWidth, windowWidth); // siempre cuadrado
}

// ---------------- PALETAS ----------------

function paletaBlancoNegro() {
  for (let i = width / 16; i < width; i += width / 8) {
    for (let j = height / 16; j < height; j += height / 8) {
      let randomOption = int(random(6));

      fill(0);
      noStroke();
      rect(i, j, width / 8, height / 8);

      stroke(255);
      switch (randomOption) {
        case 0: Lines(i - width / 16, j - height / 16); break;
        case 1: Circles(i, j); break;
        case 2: LinesTriangles(i, j); break;
        case 3:
          push();
          translate(i, j);
          rotate(radians(180));
          Triangles(0, 0);
          pop();
          break;
        case 4: Rectangles(i, j); break;
        default: ConvergingLines(i, j); break;
      }
    }
  }
}

function paletaColorUno() {
  for (let i = width / 16; i < width; i += width / 8) {
    for (let j = height / 16; j < height; j += height / 8) {
      let randomOption = int(random(6));

      noStroke();
      fill(['#dc4c0e', '#dc9c07', '#f5a9a9', '#0365b8', '#5829b2', '#29b2a1'][randomOption]);
      rect(i, j, width / 8, height / 8);

      stroke(255);
      noFill();
      switch (randomOption) {
        case 0: Lines(i - width / 16, j - height / 16); break;
        case 1: Circles(i, j); break;
        case 2: LinesTriangles(i, j); break;
        case 3:
          push();
          translate(i, j);
          rotate(radians(180));
          Triangles(0, 0);
          pop();
          break;
        case 4: Rectangles(i, j); break;
        default: ConvergingLines(i, j); break;
      }
    }
  }
}

// ---------------- FIGURAS ----------------

function Circles(x, y) {
  for (let i = 0; i < 20; i++) {
    let radius = 5 + i * 5;
    noFill();
    stroke(255);
    ellipse(x, y, radius, radius);
  }
}

function Lines(x, y) {
  for (let i = 0; i < 10; i++) {
    let offset = i * (width / 80);
    stroke(255);
    line(x + offset, y, x + width / 8 - offset, y + height / 8);
    line(x, y + offset, x + width / 8, y + height / 8 - offset);
  }
}

function LinesTriangles(x, y) {
  let cellSize = width / 8;
  stroke(255);
  noFill();
  for (let k = 0; k < cellSize / 2; k += cellSize / 20) {
    line(x + cellSize / 2 - k, y - cellSize / 2, x - cellSize / 2 + k, y + cellSize / 2);
    line(x - cellSize / 2 + k, y - cellSize / 2, x + cellSize / 2 - k, y + cellSize / 2);
  }
}

function Triangles(x, y) {
  for (let i = 0; i < 16; i++) {
    let size = 10 + i * 20;
    let h = size * sqrt(3) / 2;

    let x1 = x - size / 6;
    let y1 = y + h / 6;
    let x2 = x + size / 6;
    let y2 = y1;
    let x3 = x;
    let y3 = y - h / 6;

    noFill();
    stroke(255);
    triangle(x1, y1, x2, y2, x3, y3);
  }
}

function Rectangles(x, y) {
  let cellSize = width / 8;
  for (let i = 0; i < 48; i++) {
    let size = 5 + i * 2;
    noFill();
    stroke(255);
    rect(x + cellSize - size, y + cellSize - size, size, size);
  }
}

function ConvergingLines(x, y) {
  for (let i = 0; i < 10; i++) {
    let offset = i * (width / 160);
    stroke(255);
    line(x, y - offset, x + width / 16, y + height / 16);
    line(x, y + offset, x + width / 16, y + height / 16);
    line(x, y + offset, x - width / 16, y + height / 16);
    line(x, y - offset, x - width / 16, y + height / 16);
  }
}
