const element = document.getElementById("animateddiv");
let start;

const sqrt3 = Math.sqrt(3);

const cnvs = document.getElementById("canvas");
const ctx = document.getElementById("canvas").getContext("2d");

const originX = cnvs.width / 2.0;
const originY = cnvs.height / 2.0;
const halfedge = 25.0;

const triangles = [];

window.onload = () => { colorBackground("#6a5acd"); };

function step(timestamp) {
  if (start === undefined) {
    start = timestamp;
  }
  const elapsed = timestamp - start;

  // Math.min() is used here to make sure the element stops at exactly 200px
  const shift = Math.min(0.01 * elapsed, 200);
  element.style.transform = `translateX(${shift}px)`
  if (shift < 200) {
  let arrindex = Math.trunc((shift * 64) / 200).toString();
  let tri = triangles[arrindex];
    ctx.beginPath();
    ctx.moveTo(tri.offX, tri.offY + tri.flip * (tri.halfedge * sqrt3 - tri.halfedge / sqrt3));
    ctx.lineTo(tri.offX + tri.halfedge, tri.offY - tri.flip * tri.halfedge / sqrt3);
    ctx.lineTo(tri.offX - tri.halfedge, tri.offY - tri.flip * tri.halfedge / sqrt3);
    ctx.closePath();
    ctx.fillStyle = tri.color;
    ctx.fill();
    requestAnimationFrame(step);
  }
}

function animation() {
    requestAnimationFrame(step);
}

function clearCanvas() {
    const ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTriangleGrid() {
    let periodOffX = originX;
    let periodOffY = originY;
    let flip = -1;
    drawTrianglePeriod(flip, periodOffX, periodOffY);
    flip = -flip;
    periodOffX = originX;
    periodOffY = originY + flip * halfedge * 2 * (sqrt3 + 1 / sqrt3);
    drawTrianglePeriod(flip, periodOffX, periodOffY);
    periodOffX = originX + flip * halfedge * 2 * (sqrt3 + 0.5 / sqrt3);
    periodOffY = originY - flip * halfedge * 1 * (sqrt3 + 1 / sqrt3);
    drawTrianglePeriod(flip, periodOffX, periodOffY);
    periodOffX = originX - flip * halfedge * 2 * (sqrt3 + 0.5 / sqrt3);
    periodOffY = originY - flip * halfedge * 1 * (sqrt3 + 1 / sqrt3);
    drawTrianglePeriod(flip, periodOffX, periodOffY);
}

function drawTrianglePeriod(flip, periodOffX, periodOffY) {
    let posOffX = periodOffX;
    let posOffY = periodOffY;
    drawNumeralPositionTriangles(flip, halfedge, posOffX, posOffY);
    flip = -flip
    posOffX = periodOffX;
    posOffY = periodOffY - flip * halfedge * (sqrt3 + 1 / sqrt3);
    drawNumeralPositionTriangles(flip, halfedge, posOffX, posOffY);
    posOffX = periodOffX - flip * halfedge * (sqrt3 + 0.5 / sqrt3);
    posOffY = periodOffY + flip * halfedge * (sqrt3 - 1 / sqrt3);
    drawNumeralPositionTriangles(flip, halfedge, posOffX, posOffY);
    posOffX = periodOffX + flip * halfedge * (sqrt3 + 0.5 / sqrt3);
    posOffY = periodOffY + flip * halfedge * (sqrt3 - 1 / sqrt3);
    drawNumeralPositionTriangles(flip, halfedge, posOffX, posOffY);
}

function drawNumeralPositionTriangles(flip, halfedge, posOffX, posOffY) {
    let color = "white";
    let offX;
    let offY;
    drawTriangle(flip, halfedge, posOffX, posOffY, color);
    flip = -flip;
    offX = posOffX + flip * halfedge;
    offY = posOffY - flip * halfedge / sqrt3;
    color = "red";
    drawTriangle(flip, halfedge, offX, offY, color);
    offX = posOffX - flip * halfedge;
    offY = posOffY - flip * halfedge / sqrt3;
    color = "green";
    drawTriangle(flip, halfedge, offX, offY, color);
    offX = posOffX;
    offY = posOffY + flip * halfedge * (sqrt3 - 1 / sqrt3);
    color = "blue";
    drawTriangle(flip, halfedge, offX, offY, color);
}

function drawTriangle(flip, halfedge, offX, offY, color) {
    ctx.beginPath();
    ctx.moveTo(offX, offY + flip * (halfedge * sqrt3 - halfedge / sqrt3));
    ctx.lineTo(offX + halfedge, offY - flip * halfedge / sqrt3);
    ctx.lineTo(offX - halfedge, offY - flip * halfedge / sqrt3);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    triangles.push({flip: flip, halfedge: halfedge, offX: offX, offY: offY, color: color});
}

function colorBackground(color) {
    document.getElementById("canvasbackground").style.backgroundImage = "none";
    document.getElementById("canvasbackground").style.backgroundColor = color;
}

function downloadCanvasContent() {
    var link = document.createElement("a");
    link.download = "canvas-image.png";

    canvas.toBlob((blob) => {
        link.href = URL.createObjectURL(blob);
        console.log(blob);
        console.log(link.href);
        link.click(); // saves image.png to downloads
    }, "image/png");

}
