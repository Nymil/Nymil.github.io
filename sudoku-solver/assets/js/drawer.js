let _$canvas;
let _ctx;

// line is an array like [startX, startY, endX, endY]
function drawLine(color, line, width = 1) {
    _ctx.beginPath();
    _ctx.strokeStyle = color;
    _ctx.lineWidth = width;
    // 0.5 for displaying clearer lines
    _ctx.moveTo(line[0] + 0.5, line[1] + 0.5);
    _ctx.lineTo(line[2] + 0.5, line[3] + 0.5);
    _ctx.stroke();
}

// rect is array like [startX, startY, width, height]
function drawRect(color, rect, width = null) {
    _ctx.beginPath();
    width === null ? _ctx.fillStyle = color : _ctx.strokeStyle = color;
    if (width !== null) _ctx.lineWidth = width;
    width === null ? _ctx.fillRect(rect[0], rect[1], rect[2], rect[3]) : _ctx.strokeRect(rect[0] + width / 2, rect[1] + width / 2, rect[2] - width, rect[3] - width);
    _ctx.stroke();
}

function drawCircle(color, center, radius) {
    _ctx.beginPath();
    _ctx.fillStyle = color;
    _ctx.arc(center[0], center[1], radius, 0, 2 * Math.PI);
    _ctx.fill();
}

function drawText(color, text, pos, size) {
    _ctx.font = `${size}px serif`;
    _ctx.fillStyle = color;
    _ctx.fillText(text, pos[0], pos[1]);
}
