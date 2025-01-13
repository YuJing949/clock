let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(255);
    noStroke();

    let clearButton = createButton('Clear Canvas');
    clearButton.position(10, 10);
    clearButton.mousePressed(() => {
        background(255);
        circles = [];
    });
}

function draw() {
    background(255); // Clear the canvas each frame

    // Draw all circles and handle their lifetimes
    let currentTime = millis();
    for (let i = 0; i < circles.length; i++) {
        let circle = circles[i];

        
        if (currentTime < circle.expiryTime) {
            fill(100, 150, 255, 100);
            ellipse(circle.x, circle.y, circle.size);
        }
    }

    // Remove expired circles
    circles = circles.filter(circle => millis() < circle.expiryTime);

    if (circles.length === 0) {
        fill(0); // Black text
        textAlign(CENTER, CENTER);
        textSize(32);
        text("time is up", width / 2, height / 2);
    }


    if (mouseIsPressed) {
        let circleSize = 20;
        let expiryTime;

        if (circles.length === 0) {
            expiryTime = millis() + 5000;
        } else {
            expiryTime = circles[circles.length - 1].expiryTime + 1000;
        }

        circles.push({ x: mouseX, y: mouseY, size: circleSize, expiryTime });
    }
}
