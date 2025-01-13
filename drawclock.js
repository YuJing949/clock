function setup() {
    createCanvas(600, 600);
    background(0);
}

function draw () {
    
    noStroke();
    fill(255);
    if (mouseIsPressed && mouseX < 600 && mouseY < 600 && mouseX > 0 && mouseY > 0) {
        circle(mouseX, mouseY, 15);
    };
}