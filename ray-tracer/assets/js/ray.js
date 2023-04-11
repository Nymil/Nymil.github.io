class Ray {
    constructor(player, angle) {
        this.player = player;
        this.map = this.player.game.map;
        this.startX = player.x;
        this.startY = player.y;
        this.endX = null;
        this.endY = null;
        this.length = 0;
        this.rayTooLong = false;
        this.endFound = false;
        this.angle = angle;
    }

    draw() {
        if (this.endX === null || this.endY === null) return;
        drawLine('white', [this.startX, this.startY, this.endX, this.endY]);
    }

    cast() {
        const distOneX = this.getDistOneX();
        const distOneY = this.getDistOneY();

        let distToX = this.getHorDistToFirstX() * (distOneX / this.map.cellLength) + 0.0001; // the added 0.0001 is for rounding errors
        let distToY = this.getVertDistToFirstY() * (distOneY / this.map.cellLength) + 0.0001;

        while (!this.endFound && !this.rayTooLong) {
            if (distToX < distToY) {
                this.length = distToX;
                distToX += distOneX;
            } else if (distToY < distToX) {
                this.length = distToY;
                distToY += distOneY;
            } else {
                this.length = distToX;
                distToX += distOneX;
                distToY += distOneY;
            }

            if (this.length > 1300) {
                this.rayTooLong = true;
                continue;
            }
            
            const curCol = Math.floor((this.startX + this.length * Math.cos(this.angle)) / this.map.cellLength); 
            const curRow = Math.floor((this.startY + this.length * Math.sin(this.angle)) / this.map.cellLength); 
            if (this.map.isWall(curCol, curRow)) {
                this.endFound = true;
            }
        }

        if (this.rayTooLong) return;
        this.endX = this.startX + this.length * Math.cos(this.angle);
        this.endY = this.startY + this.length * Math.sin(this.angle);
    }

    getVertDistToFirstY() {
        let vertDistToFirstY;
        if (Math.sin(this.angle) < 0) {
            vertDistToFirstY = this.startY % this.map.cellLength;
        } else if (Math.sin(this.angle) > 0) {
            vertDistToFirstY = this.map.cellLength - (this.startY % this.map.cellLength);
        } else {
            vertDistToFirstY = 10 ** 10;
        }
        return vertDistToFirstY;
    }

    getHorDistToFirstX() {
        let horDistToFirstX;
        if (Math.cos(this.angle) < 0) {
            horDistToFirstX = this.startX % this.map.cellLength;
        } else if (Math.cos(this.angle) > 0) {
            horDistToFirstX = this.map.cellLength - (this.startX % this.map.cellLength);
        } else {
            horDistToFirstX = 10 ** 10;
        }
        return horDistToFirstX;
    }

    getDistOneY() {
        const angleSin = Math.sin(this.angle);
        return angleSin === 0 ? 10 ** 10 : Math.abs(this.map.cellLength / angleSin);
    }

    getDistOneX() {
        const angleCos = Math.cos(this.angle);
        return angleCos === 0 ? 10 ** 10 : Math.abs(this.map.cellLength / angleCos);
    }
}