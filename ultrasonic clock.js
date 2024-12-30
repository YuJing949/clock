let port;
let connectBtn;
let readOnceBtn;
let Distance = 0;
let readOnce = false;
let shrinking = false;

function setup() {
  createCanvas(400, 400);

  port = createSerial();

  connectBtn = createButton('Connect to Arduino'); 
  connectBtn.position(20, 360);
  connectBtn.mousePressed(connectBtnClick);

  readOnceBtn = createButton('Read Once');
  readOnceBtn.position(150, 360);
  readOnceBtn.mousePressed(() => {
    readOnce = true;
  });
}

function draw() {
  background(220);
  fill(50);

  if (readOnce) {
    let val = port.readUntil("\n");

    if (val.length > 0) {
      Distance = float(val);
      shrinking = true;
      readOnce = false;
    }
  }

  if (shrinking) {
    circle(200, 200, Distance);
    if (Distance > 0) {
      Distance = max(0, Distance - 1);
    } else {
      shrinking = false;
    }
  }
}

function connectBtnClick() {
  if (!port.opened()) {
    port.open('Arduino', 115200);
  } else {
    port.close();
  }
}
