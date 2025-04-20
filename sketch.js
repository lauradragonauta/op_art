let pulsado = 0;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  strokeWeight(1);
  frameRate(10); // igual que en Processing
}

function draw() {
  //background(0);

  // Cambio automático cada 4 segundos (240 frames)
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
  if (pulsado === 0) {
    //background(0);
    paletaColorUno();
    pulsado = 1;
  } else if (pulsado === 1) {
    //background(0);
    paletaBlancoNegro();
    pulsado = 0;
  }
}

// Paleta en blanco y negro
function paletaBlancoNegro() {
  for (let i = width / 16; i < width; i += width / 8) {
    for (let j = height / 16; j < height; j += height / 8) {
      let randomOption = int(random(6));

      fill(0);
      noStroke();
      rect(i, j, width / 8, height / 8);

      stroke(255);

      if (randomOption === 0) {
        Lines(i - width / 16, j - height / 16);
      } else if (randomOption === 1) {
        Circles(i, j);
      } else if (randomOption === 2) {
        LinesTriangles(i, j);
      } else if (randomOption === 3) {
        push();
        translate(i, j);
        rotate(radians(180));
        Triangles(0, 0);
        pop();
      } else if (randomOption === 4) {
        Rectangles(i, j);
      } else {
        ConvergingLines(i, j);
      }
    }
  }
}

// Paleta en color
function paletaColorUno() {
  for (let i = width / 16; i < width; i += width / 8) {
    for (let j = height / 16; j < height; j += height / 8) {
      let randomOption = int(random(6));

      noStroke();
      if (randomOption === 0) fill('#dc4c0e');
      else if (randomOption === 1) fill('#dc9c07');
      else if (randomOption === 2) fill('#f5a9a9');
      else if (randomOption === 3) fill('#0365b8');
      else if (randomOption === 4) fill('#5829b2');
      else fill('#29b2a1');

      rect(i, j, width / 8, height / 8);

      stroke(255);
      noFill();

      if (randomOption === 0) {
        Lines(i - width / 16, j - height / 16);
      } else if (randomOption === 1) {
        Circles(i, j);
      } else if (randomOption === 2) {
        LinesTriangles(i, j);
      } else if (randomOption === 3) {
        push();
        translate(i, j);
        rotate(radians(180));
        Triangles(0, 0);
        pop();
      } else if (randomOption === 4) {
        Rectangles(i, j);
      } else {
        ConvergingLines(i, j);
      }
    }
  }
}

// ---------------- Figuras ----------------

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

