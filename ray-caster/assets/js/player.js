class Player {
    constructor(game) {
        this.game = game;
        this.x = _$canvas.height / 2;
        this.y = _$canvas.height / 2;
        this.radius = 7;
        this.angle = - Math.PI / 2;
        this.vel = 3;
        this.rotVel = 8 / 180;
        this.rayCount = 300;
        this.fov = Math.PI / 4;
        this.rays = [];
    } 

    draw() {
        drawCircle('#FFFFFF', [this.x, this.y], this.radius);
        // draw gray direction line
        const directionLineLength = 20
        drawLine('#474747', [this.x, this.y, this.x + directionLineLength * Math.cos(this.angle), this.y + directionLineLength * Math.sin(this.angle)]);
        // draw casted rays
        this.rays.forEach(ray => ray.draw());
    }

    castRays() {
        // clear previous rays
        this.rays = [];
        // add correct amount of rays to ray cast
        let angle = this.angle - this.fov / 2
        for (let i = 0; i < this.rayCount; i++) {
            const ray = new Ray(this, angle);
            this.rays.push(ray);
            angle += this.fov / this.rayCount;
        }
        // cast the added rays
        this.rays.forEach(ray => ray.cast());
    }

    move(direction) {
        let nextX;
        let nextY;

        switch (direction) {
            case 'forward':
                nextX = this.x + this.vel * Math.cos(this.angle);
                nextY = this.y + this.vel * Math.sin(this.angle);
                break;
            case 'backward':
                nextX = this.x - this.vel * Math.cos(this.angle);
                nextY = this.y - this.vel * Math.sin(this.angle);
                break;
            case 'left':
                nextX = this.x + this.vel * Math.cos(this.angle - Math.PI / 2);
                nextY = this.y + this.vel * Math.sin(this.angle - Math.PI / 2);
                break;
            case 'right':
                nextX = this.x + this.vel * Math.cos(this.angle + Math.PI / 2);
                nextY = this.y + this.vel * Math.sin(this.angle + Math.PI / 2);
                break;
        }

        if (!this.game.map.isWall(Math.floor(nextX / this.game.map.cellLength), Math.floor(this.y / this.game.map.cellLength))) this.x = nextX;
        if (!this.game.map.isWall(Math.floor(this.x / this.game.map.cellLength), Math.floor(nextY / this.game.map.cellLength))) this.y = nextY;
    }

    turn(direction) {
        if (direction === 'right') {
            this.angle += this.rotVel;
        } else if (direction === 'left'){
            this.angle -= this.rotVel;
        }
    }
}