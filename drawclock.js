let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    noStroke();

    let clearButton = createButton('Clear Canvas');
    clearButton.position(10, 10);
    clearButton.mousePressed(() => {
        background(255); // Clear the canvas
        circles = []; // Clear all stored circles
    });
}

function draw() {
    background(255); // Clear the canvas each frame

    // Draw all circles and handle their lifetimes
    let currentTime = millis();
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];

        // Draw the circle if it hasn't expired
        if (currentTime < circle.expiryTime) {
            fill(100, 150, 255, 150); // Blue with transparency
            ellipse(circle.x, circle.y, circle.size);
        }
    }

    // Remove expired circles
    circles = circles.filter(circle => millis() < circle.expiryTime);


    if (mouseIsPressed) {
        let circleSize = 10;
        let expiryTime;

        if (circles.length === 0) {
            expiryTime = millis() + 5000;
        } else {
            expiryTime = circles[circles.length - 1].expiryTime + 1000;
        }

        circles.push({ x: mouseX, y: mouseY, size: circleSize, expiryTime });
    }
}
