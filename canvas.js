const sqrt3 = Math.sqrt(3);

const cnvs = document.getElementById("canvas");
const ctx = document.getElementById("canvas").getContext("2d");

const originX = cnvs.width / 2.0;
const originY = cnvs.height / 2.0;
const halfedge = 25.0;


window.onload = () => { colorBackground("#6a5acd"); };

function clearCanvas() {
    const ctx = document.getElementById("canvas").getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTriangleGrid() {
    let periodOffX = originX;
    let periodOffY = originY;
    let flip = -1;
    drawTrianglePeriod(flip, periodOffX, periodOffY);
    periodOffX = originX;
    periodOffY = originY + 2 * halfedge * (sqrt3 + 1 / sqrt3);
    //drawTrianglePeriod(-flip, periodOffX, periodOffY);
}

function drawTrianglePeriod(flip, periodOffX, periodOffY) {
    let posOffX = periodOffX;
    let posOffY = periodOffY;
    drawNumeralPositionTriangles(flip, halfedge, posOffX, posOffY);
    posOffX = originX;
    posOffY = originY - halfedge * (sqrt3 + 1 / sqrt3);
    drawNumeralPositionTriangles(-flip, halfedge, posOffX, posOffY);
    posOffX = originX + halfedge * (sqrt3 + 0.5 / sqrt3);
    posOffY = originY + halfedge * (sqrt3 - 1 / sqrt3);
    drawNumeralPositionTriangles(-flip, halfedge, posOffX, posOffY);
    posOffX = originX - halfedge * (sqrt3 + 0.5 / sqrt3);
    posOffY = originY + halfedge * (sqrt3 - 1 / sqrt3);
    drawNumeralPositionTriangles(-flip, halfedge, posOffX, posOffY);
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
