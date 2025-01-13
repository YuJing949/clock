function setup() {
    createCanvas(600, 600);
    background(0);
    
    let clearButton = createButton('Clear Canvas');
    clearButton.position(10, 10);
    clearButton.mousePressed(() => {
        background(0); // Clear the canvas
    });
}

function draw () {
    
    noStroke();
    fill(255);
    if (mouseIsPressed && mouseX < 600 && mouseY < 600 && mouseX > 0 && mouseY > 0) {
        circle(mouseX, mouseY, 15);
    };
}