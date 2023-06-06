"use strict";

class Node {
    static NEXT_ID = 0;
    constructor(x, y) {
        this.static = false;
        this.color = '#e3e3e3'
        this.stationaryColor = '#cb5454'
        this.radius = 7;
        this.pos = {
            x: x,
            y: y
        }
        this.prevPos = {
            x: x,
            y: y
        }
        this.id = Node.NEXT_ID;
        Node.NEXT_ID += 1;
    }

    getPos() {
        return this.pos;
    }

    getId() {
        return this.id;
    }

    updateGravity() {
        if (this.static) return;
        // temp store current position
        const tempX = this.pos.x;
        const tempY = this.pos.y;
        // move particle according to Verlet integration
        // x' = 2x - x* + a (* AT^2)
        const g = 0.5;
        this.pos.x = 1.99 * this.pos.x - 0.99 * this.prevPos.x;
        this.pos.y = 1.99 * this.pos.y - 0.99 * this.prevPos.y + g;
        // then update prev pos
        this.prevPos.x = tempX;
        this.prevPos.y = tempY;
    }

    moveAmount(dx, dy) {
        if (this.static) return;
        this.pos.x += dx;
        this.pos.y += dy;
    }

    squaredLengthTo(pos) {
        return (pos.x - this.pos.x) ** 2 + (pos.y - this.pos.y) ** 2;
    }

    isStatic() {
        return this.static;
    }

    setPos(pos) {
        if (this.static) return;
        this.pos.x = pos.x;
        this.pos.y = pos.y;
    }

    draw() {
        const drawColor = this.static ? this.stationaryColor : this.color;
        drawCircle(drawColor, [this.pos.x, this.pos.y], this.radius);
    }

    toggleStatic() {
        this.static = !this.static;
    }

    isAtPos(pos) {
        const distSquared = (this.pos.x - pos.x)**2 + (this.pos.y - pos.y)**2;
        return distSquared <= this.radius ** 2;
    }
}
