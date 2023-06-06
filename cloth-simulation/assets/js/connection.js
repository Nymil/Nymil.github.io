"use strict";

class Connection {
    constructor(startNode, endNode) {
        this.startNode = startNode;
        this.endNode = endNode;
        this.color = '#b4b4b4';
        this.drawThickness = 4;
        this.restLength = Math.sqrt((startNode.getPos().x - endNode.getPos().x) ** 2 + (startNode.getPos().y - endNode.getPos().y) ** 2);
    }

    draw() {
        drawLine(this.color, [this.startNode.getPos().x, this.startNode.getPos().y, this.endNode.getPos().x, this.endNode.getPos().y], this.drawThickness);
    }

    satisfyConnection() {
        const deltaX = this.startNode.getPos().x - this.endNode.getPos().x;
        const deltaY = this.startNode.getPos().y - this.endNode.getPos().y;

        const deltaLength = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        const diff = (deltaLength - this.restLength) / deltaLength;

        this.startNode.moveAmount(-deltaX * 0.5 * diff, -deltaY * 0.5 * diff);
        this.endNode.moveAmount(deltaX * 0.5 * diff, deltaY * 0.5 * diff);
    }
}
