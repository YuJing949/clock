let port;
let connectBtn;
let readOnceBtn;
let Distance = 0;
let readOnce = false;

function setup() {
  createCanvas(400, 400);

  port = createSerial();

  connectBtn = createButton('Connect to Arduino');
  connectBtn.position(20, 360);
  connectBtn.mousePressed(connectBtnClick);

  readOnceBtn = createButton('Read Once');
  readOnceBtn.position(150, 360);
  readOnceBtn.mousePressed(() => {
    readOnce = true; // Set flag to true when the button is pressed
  });
}

function draw() {
  background(220);
  fill(50);

  // Only read one value if readOnce is true
  if (readOnce) {
    let val = port.readUntil("\n"); // Read one line from the port

    if (val.length > 0) {
      Distance = val; // Update circle size with new value
      text(val, 20, 20);
      readOnce = false; // Reset the flag after reading one value
    }
  }

  circle(200, 200, Distance);
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 115200);
  } else {
    port.close();
  }
}
