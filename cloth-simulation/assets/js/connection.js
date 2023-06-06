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

    intersects(pos1, pos2) {
        const x1 = pos1.x - 15;
        const x2 = pos2.x - 15;
        const x3 = this.startNode.getPos().x;
        const x4 = this.endNode.getPos().x;

        const y1 = pos1.y - 15;
        const y2 = pos2.y - 15;
        const y3 = this.startNode.getPos().y;
        const y4 = this.endNode.getPos().y;

        // Calculate vectors
        const vector1 = { x: x2 - x1, y: y2 - y1 };
        const vector2 = { x: x4 - x3, y: y4 - y3 };

        // Calculate cross product
        const crossProduct = vector1.x * vector2.y - vector1.y * vector2.x;

        // Check if lines are parallel
        if (crossProduct === 0) {
            return false;
        }

        // Calculate the difference between the start points of the lines
        const startDiff = { x: x1 - x3, y: y1 - y3 };

        // Calculate the t values for intersection point
        const t1 = (startDiff.x * vector2.y - startDiff.y * vector2.x) / crossProduct;
        const t2 = (startDiff.x * vector1.y - startDiff.y * vector1.x) / crossProduct;

        // Check if the intersection point lies within the line segments
        return t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1;
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
