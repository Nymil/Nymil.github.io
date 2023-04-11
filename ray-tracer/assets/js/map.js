class Map {
    constructor(game) {
        this.game = game
        this.board = this.getBoard();
        this.cellLength = _$canvas.height / this.board.length;
    }

    draw() {
        // iterate over every cell on the board
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board.length; col++) {
                if (this.isWall(col, row)) drawRect('#c90202', [col * this.cellLength, row * this.cellLength, this.cellLength, this.cellLength]);
                drawRect('#a80000', [col * this.cellLength, row * this.cellLength, this.cellLength, this.cellLength], 1);
            }
        }

        // draw the walls
        const rays = this.game.player.rays;
        rays.forEach((ray, index) => {
            const rayLength = ray.length * Math.cos(this.game.player.angle - ray.angle); // for removing fish eye effect
            const wallHeight = 100000 / rayLength;
            const wallWidth = _$canvas.height / rays.length;
            const posX = index * wallWidth + _$canvas.height;
            const posY = (_$canvas.height - wallHeight) / 2;
            const brightness = 10000 / (rayLength ** 2) > 1 ? 1 : 10000 / (rayLength ** 2);
            drawRect(`rgb(${255 * brightness}, ${255 * brightness}, ${255 * brightness})`, [posX, posY, wallWidth + 0.75, wallHeight]);
        })
    }

    isWall(col, row) {
        if (col < 0 || row < 0 || col >= this.board.length || row >= this.board.length) return false;
        return this.board[row][col] === 1;
    }

    addWall(col, row) {
        if (col < 0 || row < 0 || col >= this.board.length || row >= this.board.length) return;
        this.board[row][col] = 1;
    }

    remWall(col, row) {
        if (col < 0 || row < 0 || col >= this.board.length || row >= this.board.length) return;
        this.board[row][col] = 0;
    }

    getBoard() {
        return [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]]
    }
}