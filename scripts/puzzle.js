function Point2d(x, y) {
	this.x = x;
	this.y = y;
	this.Rotate = function (angle) {
		let ca = Math.cos(angle);
		let sa = Math.sin(angle);
		let x = this.x * ca - this.y * sa;
		let y = this.x * sa + this.y * ca;
		this.x = x;
		this.y = y;
	};
}

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

function RotateImage(angle, img, x, y, dx, dy) {

	angle = Math.PI / 180 * angle;

	let p1 = new Point2d(dx, dy);
	dContext.save();
	p1.Rotate(angle);
	dContext.translate(-p1.x + x, -p1.y + y);
	dContext.rotate(angle);
	dContext.drawImage(img, 0, 0);
	dContext.restore();
}

function puzel(image, index, x, y) {
	this.pos = new Point2d(x, y);
	this.image = image;
	this.index = index;
	this.angle = Math.random() * 360;
	this.onPos = false;

	this.draw = function () {
		RotateImage(this.angle, this.image, this.pos.x, this.pos.y, dx, dy);
	}
}

let puzzle = new Array();

let index = new Array();

function draw() {
	dContext.clearRect(0, 0, myCanvas.width, myCanvas.height);
	if (selIndex == -1) {
		for (let i = 0; i < 16; i++) { //
			if (!puzzle[i].onPos)
				puzzle[i].draw();
		}
	} else {
		RotateImage(0, imgPuzzle[16], pos.x, pos.y, 0, 0);
		for (let i = 0; i < 16; i++) { //
			if (puzzle[i].onPos)
				puzzle[i].draw();
		}
		puzzle[selIndex].draw();

	}
	if (onPosition == 16) {
		for (let i = 0; i < 16; i++) { //
			puzzle[i].draw();
		}
	}
}

let mp = new Point2d(0, 0);

function getMousePos(e) {
	mp.x = (window.Event) ? e.pageX : event.clientX;
	mp.y = (window.Event) ? e.pageY : event.clientY;
}

function initialize() {

	divPuzzle = document.getElementById("puzzle");
	imgPuzzle = divPuzzle.getElementsByTagName("img");
	myCanvas = document.getElementById("drawing");
	dContext = myCanvas.getContext('2d');
	selIndex = -1;

	pos = new Point2d((myCanvas.width - 600) / 2, (myCanvas.height - 400) / 2);

	dx = 75;
	dy = 75;
	onPosition = 0;
	let i = 0;
	tPos[i] = new Point2d(pos.x + dx, pos.y + dy);
	i++
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
		index[i] = i;
	}

	for (let i = 0; i < 100; i++) {
		i1 = Math.floor(Math.random() * 15);
		i2 = Math.floor(Math.random() * 15);
		temp = index[i1];
		index[i1] = index[i2];
		index[i2] = temp;
	}

	for (let i = 0; i < 16; i++) { //
		puzzle[i] = new puzel(imgPuzzle[index[i]], index[i], (i % 6) * 150 + 150, Math.floor(i / 6) * 200 + 150);
	}

	draw();

	if (window.Event) {
		document.captureEvents(Event.MOUSEMOVE);
	}

	document.onmousemove = getMousePos;

	myCanvas.onclick = function (e) {

		if (onPosition < 16) {

			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(myCanvas.offsetLeft);
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(myCanvas.offsetTop) + 1;

			if (selIndex == -1) {
				let dist = 10000;
				selIndex = -1;
				let dist2;
				for (let i = 0; i < 16; i++) {
					if (!puzzle[i].onPos) {
						dist2 = Math.sqrt(Math.pow(x - puzzle[i].pos.x, 2) + Math.pow(y - puzzle[i].pos.y, 2));
						if (dist2 < dist) {
							dist = dist2;
							selIndex = i;

						}
					}
				}
				puzzle[selIndex].angle = 0;
			} else {
				if (Math.sqrt(Math.pow(tPos[puzzle[selIndex].index].x - puzzle[selIndex].pos.x, 2) + Math.pow(tPos[puzzle[selIndex].index].y - puzzle[selIndex].pos.y, 2)) < 50) {
					puzzle[selIndex].pos.x = tPos[puzzle[selIndex].index].x;
					puzzle[selIndex].pos.y = tPos[puzzle[selIndex].index].y;
					if (!puzzle[selIndex].onPos) {
						puzzle[selIndex].onPos = true;
						onPosition++;
						if (onPosition == 16) {
							alert("Ty draniu wygrałeś!!!");
						}
					}
				} else {
					puzzle[selIndex].pos.x = x;
					puzzle[selIndex].pos.y = y;
				}

				puzzle[selIndex].angle = 0;

				selIndex = -1;
			}

			draw();
		}
	}

	myCanvas.onmousemove = function (e) {
		if (selIndex > -1) {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(myCanvas.offsetLeft);
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(myCanvas.offsetTop) + 1;
			puzzle[selIndex].pos.x = x;
			puzzle[selIndex].pos.y = y;
		}
		if (onPosition < 16)
			draw();
	}

	myCanvas.onMouseUp = function (e) {
		selIndex = -1;
	}
}

window.onload = initialize;