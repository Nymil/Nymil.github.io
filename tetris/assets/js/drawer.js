let _$canvas1;
let _$canvas2;
let _ctx1;
let _ctx2;

// rect is array like [startX, startY, width, height]
function drawRect(ctx, color, rect, width = null) {
    ctx.beginPath();
    width === null ? ctx.fillStyle = color : ctx.strokeStyle = color;
    if (width !== null) ctx.lineWidth = width;
    width === null ? ctx.fillRect(rect[0], rect[1], rect[2], rect[3]) : ctx.strokeRect(rect[0] + width / 2, rect[1] + width / 2, rect[2] - width, rect[3] - width);
    ctx.stroke();
}
