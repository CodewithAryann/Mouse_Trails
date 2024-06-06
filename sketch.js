let trail = [];

function setup() {
  createCanvas(800, 600);
  colorMode(HSB, 360, 100, 100, 100);
}

function draw() {
  background(0, 0, 100);

  // Update and display the trail
  for (let i = 0; i < trail.length; i++) {
    let shape = trail[i];
    shape.update();
    shape.display();
  }

  // Remove shapes that are faded out
  for (let i = trail.length - 1; i >= 0; i--) {
    if (trail[i].alpha <= 0) {
      trail.splice(i, 1);
    }
  }

  // Add new shape to the trail
  if (mouseIsPressed) {
    let colorHue = random(0, 360);
    let colorSaturation = random(50, 100);
    let colorBrightness = random(80, 100);
    let alpha = random(50, 90);

    let shapeSize = random(20, 50);
    let shapeType = int(random(3));

    let shape = new Shape(mouseX, mouseY, shapeSize, colorHue, colorSaturation, colorBrightness, alpha, shapeType);
    trail.push(shape);
  }
}

class Shape {
  constructor(x, y, size, hue, saturation, brightness, alpha, type) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.hue = hue;
    this.saturation = saturation;
    this.brightness = brightness;
    this.alpha = alpha;
    this.type = type;
    this.lifeSpan = 255;
  }

  update() {
    this.alpha -= 1;
  }

  display() {
    noStroke();
    fill(this.hue, this.saturation, this.brightness, this.alpha);
    switch (this.type) {
      case 0: // Circle
        ellipse(this.x, this.y, this.size);
        break;
      case 1: // Square
        rectMode(CENTER);
        rect(this.x, this.y, this.size, this.size);
        break;
      case 2: // Triangle
        let heightFactor = sqrt(3) / 2;
        beginShape();
        vertex(this.x, this.y - this.size / (2 * heightFactor));
        vertex(this.x - this.size / 2, this.y + this.size / (2 * heightFactor));
        vertex(this.x + this.size / 2, this.y + this.size / (2 * heightFactor));
        endShape(CLOSE);
        break;
    }
  }
}
