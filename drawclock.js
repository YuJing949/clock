let circles = [];

function setup() {
    createCanvas(600, 600);
    background(0);

    let clearButton = createButton('Clear Canvas');
    clearButton.position(10, 10);
    clearButton.mousePressed(() => {
        background(0); // Clear the canvas
        circles = []; // Clear all stored circles
    });
}

function draw() {
    background(0);

    // Draw all circles currently in the array
    noStroke();
    fill(255);
    for (let i = circles.length - 1; i >= 0; i--) {
        let c = circles[i];
        if (millis() - c.time > 3000) {
            circles.splice(i, 1); // Remove circle after 30 seconds
        } else {
            circle(c.x, c.y, 15);
        }
    }

    // Add new circle when mouse is pressed
    if (mouseIsPressed && mouseX < 600 && mouseY < 600 && mouseX > 0 && mouseY > 0) {
        circles.push({ x: mouseX, y: mouseY, time: millis() });
    }
}
