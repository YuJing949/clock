// Initialize variables to store circles and their timestamps
let circles = [];
let isLineClosed = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255); // Set background to white
  noStroke(); // Disable stroke for circles
}

function draw() {
  background(255); // Clear the canvas each frame

  // Draw all circles
  let currentTime = millis();
  for (let i = 0; i < circles.length; i++) {
    let circle = circles[i];

    // Draw the circle if it hasn't expired
    if (!isLineClosed || currentTime < circle.expiryTime) {
      fill(100, 150, 255, 150); // Blue with transparency
      ellipse(circle.x, circle.y, circle.size);
    }
  }

  // Remove expired circles only if the line is closed
  if (isLineClosed) {
    circles = circles.filter(circle => millis() < circle.expiryTime);
  }

  // Check if all circles have disappeared
  if (isLineClosed && circles.length === 0) {
    fill(0); // Black text
    textAlign(CENTER, CENTER);
    textSize(32);
    text("time is up", width / 2, height / 2);
  }

  // Draw a line connecting the first and last circles if possible
  if (circles.length > 1) {
    let firstCircle = circles[0];
    let lastCircle = circles[circles.length - 1];

    stroke(100, 150, 255, 150);
    line(firstCircle.x, firstCircle.y, lastCircle.x, lastCircle.y);

    // Check if the first and last circles are close enough to close the line
    if (dist(firstCircle.x, firstCircle.y, lastCircle.x, lastCircle.y) < 20) {
      isLineClosed = true;
    }
  }

  // Add a new circle when the mouse is pressed
  if (mouseIsPressed && !isLineClosed) {
    let circleSize = 10;
    let expiryTime;

    if (circles.length === 0) {
      // First circle disappears after 30 seconds
      expiryTime = millis() + 30000;
    } else {
      // Later circles disappear 5 seconds after the previous circle
      expiryTime = circles[circles.length - 1].expiryTime + 5000;
    }

    // Add the new circle to the array
    circles.push({ x: mouseX, y: mouseY, size: circleSize, expiryTime });
  }
}
