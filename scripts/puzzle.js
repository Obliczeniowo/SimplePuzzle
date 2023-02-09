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

let divPuzle;
let imgPuzle;
let myCanvas;
let dcontext;
let selindex;
let pos;
let dx;
let dy;
let onPosition;

let tpos = new Array();

function RotateImage(angle, img, x, y, dx, dy) {

	angle = Math.PI / 180 * angle;

	let p1 = new Point2d(dx, dy);
	dcontext.save();
	p1.Rotate(angle);
	dcontext.translate(-p1.x + x, -p1.y + y);
	dcontext.rotate(angle);
	dcontext.drawImage(img, 0, 0);
	dcontext.restore();
}

function puzel(image, index, x, y) {
	this.pos = new Point2d(x, y);
	this.image = image;
	this.index = index;
	this.angle = Math.random() * 360;
	this.onpos = false;

	this.draw = function () {
		RotateImage(this.angle, this.image, this.pos.x, this.pos.y, dx, dy);
	}
}

let puzle = new Array();

let index = new Array();

function draw() {
	dcontext.clearRect(0, 0, myCanvas.width, myCanvas.height);
	if (selindex == -1) {
		for (let i = 0; i < 16; i++) { //
			if (!puzle[i].onpos)
				puzle[i].draw();
		}
	} else {
		RotateImage(0, imgPuzle[16], pos.x, pos.y, 0, 0);
		for (let i = 0; i < 16; i++) { //
			if (puzle[i].onpos)
				puzle[i].draw();
		}
		puzle[selindex].draw();

	}
	if (onPosition == 16) {
		for (let i = 0; i < 16; i++) { //
			puzle[i].draw();
		}
	}
}

let mp = new Point2d(0, 0);

function getMousePos(e) {
	mp.x = (window.Event) ? e.pageX : event.clientX;
	mp.y = (window.Event) ? e.pageY : event.clientY;
}

function initialize() {

	divPuzle = document.getElementById("puzle");
	imgPuzle = divPuzle.getElementsByTagName("img");
	myCanvas = document.getElementById("drawing");
	dcontext = myCanvas.getContext('2d');
	selindex = -1;

	pos = new Point2d((myCanvas.width - 600) / 2, (myCanvas.height - 400) / 2);

	dx = 75;
	dy = 75;
	onPosition = 0;
	let i = 0;
	tpos[i] = new Point2d(pos.x + dx, pos.y + dy);
	i++
	tpos[i] = new Point2d(pos.x + dx + 143, pos.y + dy);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 271, pos.y + dy);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 450, pos.y + dy);
	i++;
	tpos[i] = new Point2d(pos.x + dx, pos.y + dy + 59);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 150, pos.y + dy + 78);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 288, pos.y + dy + 87);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 450, pos.y + dy + 77);
	i++;
	tpos[i] = new Point2d(pos.x + dx, pos.y + dy + 200);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 113, pos.y + dy + 160);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 290, pos.y + dy + 190);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 439, pos.y + dy + 179);
	i++;
	tpos[i] = new Point2d(pos.x + dx, pos.y + dy + 260);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 141, pos.y + dy + 290);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 264, pos.y + dy + 260);
	i++;
	tpos[i] = new Point2d(pos.x + dx + 411, pos.y + dy + 297);

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
		puzle[i] = new puzel(imgPuzle[index[i]], index[i], (i % 6) * 150 + 150, Math.floor(i / 6) * 200 + 150);
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

			if (selindex == -1) {
				let dist = 10000;
				selindex = -1;
				let dist2;
				for (let i = 0; i < 16; i++) {
					if (!puzle[i].onpos) {
						dist2 = Math.sqrt(Math.pow(x - puzle[i].pos.x, 2) + Math.pow(y - puzle[i].pos.y, 2));
						if (dist2 < dist) {
							dist = dist2;
							selindex = i;

						}
					}
				}
				puzle[selindex].angle = 0;
			} else {
				if (Math.sqrt(Math.pow(tpos[puzle[selindex].index].x - puzle[selindex].pos.x, 2) + Math.pow(tpos[puzle[selindex].index].y - puzle[selindex].pos.y, 2)) < 50) {
					puzle[selindex].pos.x = tpos[puzle[selindex].index].x;
					puzle[selindex].pos.y = tpos[puzle[selindex].index].y;
					if (!puzle[selindex].onpos) {
						puzle[selindex].onpos = true;
						onPosition++;
						if (onPosition == 16) {
							alert("Ty draniu wygrałeś!!!");
						}
					}
				} else {
					puzle[selindex].pos.x = x;
					puzle[selindex].pos.y = y;
				}

				puzle[selindex].angle = 0;

				selindex = -1;
			}

			draw();
		}
	}

	myCanvas.onmousemove = function (e) {
		if (selindex > -1) {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft - Math.floor(myCanvas.offsetLeft);
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop - Math.floor(myCanvas.offsetTop) + 1;
			puzle[selindex].pos.x = x;
			puzle[selindex].pos.y = y;
		}
		if (onPosition < 16)
			draw();
	}

	myCanvas.onMouseUp = function (e) {
		selindex = -1;
	}
}

window.onload = initialize;