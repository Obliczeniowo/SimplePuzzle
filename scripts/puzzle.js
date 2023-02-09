let divPuzzle;
let imgPuzzle;
let myCanvas;
let dContext;
let selIndex;
let pos;
let dx;
let dy;
let onPosition;

let tPos = new Array();

function rotateImage(angle, img, x, y, dx, dy) {
	angle = (Math.PI / 180) * angle;

	let p1 = new Point2d(dx, dy);
	dContext.save();
	p1.rotate(angle);
	dContext.translate(-p1.x + x, -p1.y + y);
	dContext.rotate(angle);
	dContext.drawImage(img, 0, 0);
	dContext.restore();
}
class Point2d {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  rotate = (angle) => {
    let ca = Math.cos(angle);
    let sa = Math.sin(angle);
    let x = this.x * ca - this.y * sa;
    let y = this.x * sa + this.y * ca;
    this.x = x;
    this.y = y;
  };
}

class Puzzel {
  constructor(image, index, x, y) {
    this.pos = new Point2d(x, y);
    this.image = image;
    this.index = index;
    this.angle = Math.random() * 360;
    this.onPos = false;
  }

  draw = () => {
    rotateImage(this.angle, this.image, this.pos.x, this.pos.y, dx, dy);
  };
}

let puzzles = new Array();

let indexes = new Array();

function draw() {
  dContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
  if (selIndex == -1) {
    for (let i = 0; i < 16; i++) {
      //
      if (!puzzles[i].onPos) puzzles[i].draw();
    }
  } else {
    rotateImage(0, imgPuzzle[16], pos.x, pos.y, 0, 0);
    for (let i = 0; i < 16; i++) {
      //
      if (puzzles[i].onPos) puzzles[i].draw();
    }
    puzzles[selIndex].draw();
  }
  if (onPosition == 16) {
    for (let i = 0; i < 16; i++) {
      //
      puzzles[i].draw();
    }
  }
}

let mp = new Point2d();

function getMousePos(e) {
  mp.x = window.Event ? e.pageX : event.clientX;
  mp.y = window.Event ? e.pageY : event.clientY;
}

function initialize() {
  divPuzzle = document.getElementById('puzzle');
  imgPuzzle = divPuzzle.getElementsByTagName('img');
  myCanvas = document.getElementById('drawing');
  dContext = myCanvas.getContext('2d');
  selIndex = -1;

  pos = new Point2d((myCanvas.width - 600) / 2, (myCanvas.height - 400) / 2);

  dx = 75;
  dy = 75;
  onPosition = 0;
  let i = 0;
  tPos[i] = new Point2d(pos.x + dx, pos.y + dy);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 143, pos.y + dy);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 271, pos.y + dy);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 450, pos.y + dy);
  i++;
  tPos[i] = new Point2d(pos.x + dx, pos.y + dy + 59);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 150, pos.y + dy + 78);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 288, pos.y + dy + 87);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 450, pos.y + dy + 77);
  i++;
  tPos[i] = new Point2d(pos.x + dx, pos.y + dy + 200);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 113, pos.y + dy + 160);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 290, pos.y + dy + 190);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 439, pos.y + dy + 179);
  i++;
  tPos[i] = new Point2d(pos.x + dx, pos.y + dy + 260);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 141, pos.y + dy + 290);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 264, pos.y + dy + 260);
  i++;
  tPos[i] = new Point2d(pos.x + dx + 411, pos.y + dy + 297);

  for (let i = 0; i < 16; i++) {
    indexes[i] = i;
  }

  for (let i = 0; i < 100; i++) {
    i1 = Math.floor(Math.random() * 15);
    i2 = Math.floor(Math.random() * 15);
    temp = indexes[i1];
    indexes[i1] = indexes[i2];
    indexes[i2] = temp;
  }

  for (let i = 0; i < 16; i++) {
    //
    puzzles[i] = new Puzzel(
      imgPuzzle[indexes[i]],
      indexes[i],
      (i % 6) * 150 + 150,
      Math.floor(i / 6) * 200 + 150
    );
  }

  draw();

  if (window.Event) {
    document.captureEvents(Event.MOUSEMOVE);
  }

  document.onmousemove = getMousePos;

  myCanvas.onclick = (e) => {
    if (onPosition < 16) {
      x =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft -
        Math.floor(myCanvas.offsetLeft);
      y =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop -
        Math.floor(myCanvas.offsetTop) +
        1;

      if (selIndex == -1) {
        let dist = 10000;
        selIndex = -1;
        let dist2;
        for (let i = 0; i < 16; i++) {
          if (!puzzles[i].onPos) {
            dist2 = Math.sqrt(
              Math.pow(x - puzzles[i].pos.x, 2) +
                Math.pow(y - puzzles[i].pos.y, 2)
            );
            if (dist2 < dist) {
              dist = dist2;
              selIndex = i;
            }
          }
        }
        puzzles[selIndex].angle = 0;
      } else {
        if (
          Math.sqrt(
            Math.pow(
              tPos[puzzles[selIndex].index].x - puzzles[selIndex].pos.x,
              2
            ) +
              Math.pow(
                tPos[puzzles[selIndex].index].y - puzzles[selIndex].pos.y,
                2
              )
          ) < 50
        ) {
          puzzles[selIndex].pos.x = tPos[puzzles[selIndex].index].x;
          puzzles[selIndex].pos.y = tPos[puzzles[selIndex].index].y;
          if (!puzzles[selIndex].onPos) {
            puzzles[selIndex].onPos = true;
            onPosition++;
            if (onPosition == 16) {
              alert('Ty draniu wygrałeś!!!');
            }
          }
        } else {
          puzzles[selIndex].pos.x = x;
          puzzles[selIndex].pos.y = y;
        }

        puzzles[selIndex].angle = 0;

        selIndex = -1;
      }

      draw();
    }
  };

  myCanvas.onmousemove = (e) => {
    if (selIndex > -1) {
      x =
        e.clientX +
        document.body.scrollLeft +
        document.documentElement.scrollLeft -
        Math.floor(myCanvas.offsetLeft);
      y =
        e.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop -
        Math.floor(myCanvas.offsetTop) +
        1;
      puzzles[selIndex].pos.x = x;
      puzzles[selIndex].pos.y = y;
    }
    if (onPosition < 16) draw();
  };

  myCanvas.onMouseUp = (e) => {
    selIndex = -1;
  };
}

window.onload = initialize;
