class Piece {

    static pieceCount = 7;
    static rotationCount = 4;
    game;
    board;
    type;
    shapes;
    rotation;
    pos;

    constructor(game) {
        this.game = game;
        this.board = game.board;
        this.nextType = Math.floor(Math.random() * Piece.pieceCount);
        this.reset();
        this.moveDown();
    }

    static getColorByType(part) {
        switch (part) {
            case 0:
                return '#a12cdb';
            case 1:
                return '#951bab';
            case 2:
                return '#741bab';
            case 3:
                return '#8332d9';
            case 4:
                return '#b31fd1';
            case 5:
                return '#6700ff';
            case 6:
                return '#b56cd4';
        }
    }

    static getShapesByType(type) {
        switch (type) {
            case 0:
                return [["....",
                         "xxxx",
                         "....",
                         "...."],
                        ["..x.",
                         "..x.",
                         "..x.",
                         "..x."],
                        ["....",
                         "....",
                         "xxxx",
                         "...."],
                        [".x..",
                         ".x..",
                         ".x..",
                         ".x.."]]
            case 1:
                return [["x..",
                         "xxx",
                         "..."],
                        [".xx",
                         ".x.",
                         ".x."],
                        ["...",
                         "xxx",
                         "..x"],
                        [".x.",
                         ".x.",
                         "xx."]]
            case 2:
                return [["..x",
                         "xxx",
                         "..."],
                        [".x.",
                         ".x.",
                         ".xx"],
                        ["...",
                         "xxx",
                         "x.."],
                        ["xx.",
                         ".x.",
                         ".x."]]
            case 3:
                return [["xx",
                         "xx"],
                        ["xx",
                         "xx"],
                        ["xx",
                         "xx"],
                        ["xx",
                         "xx"]]
            case 4:
                return [[".xx",
                         "xx.",
                         "..."],
                        [".x.",
                         ".xx",
                         "..x"],
                        ["...",
                         ".xx",
                         "xx."],
                        ["x..",
                         "xx.",
                         ".x."]]
            case 5:
                return [[".x.",
                         "xxx",
                         "..."],
                        [".x.",
                         ".xx",
                         ".x."],
                        ["...",
                         "xxx",
                         ".x."],
                        [".x.",
                         "xx.",
                         ".x."]]
            case 6:
                return [["xx.",
                         ".xx",
                         "..."],
                        ["..x",
                         ".xx",
                         ".x."],
                        ["...",
                         "xx.",
                         ".xx"],
                        [".x.",
                         "xx.",
                         "x.."]]
        }
    }

    draw() {
        const shape = this.shapes[this.rotation];
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[0].length; col++) {
                if (shape[row][col] === 'x') {
                    const color = Piece.getColorByType(this.type);
                    drawRect(_ctx1, color, [(this.pos.col + col) * this.board.cellSize, (this.pos.row + row) * this.board.cellSize, this.board.cellSize, this.board.cellSize]);
                }
            }
        }
    }

    teleportDown() {
        while (this.board.isEmptySpace(this, 0, 1, 0)) {
            this.pos.row += 1
        }
    }

    reset() {
        this.type = this.nextType;
        this.nextType = Math.floor(Math.random() * Piece.pieceCount);
        this.shapes = Piece.getShapesByType(this.type);
        this.rotation = 0;
        this.pos = {col: 5 - Math.floor(this.shapes[0][0].length / 2), row: 0};
        if (!this.board.isEmptySpace(this, 0, 0, 0)) {
            this.game.restart();
        }
    }

    displayShadow() {
        let depth = 0;
        while (this.board.isEmptySpace(this, 0, depth, 0)) {
            depth += 1;
        }

        const shape = this.shapes[this.rotation];
        const color = Piece.getColorByType(this.type);
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[0].length; col++) {
                const boardCol = this.pos.col + col;
                const boardRow = this.pos.row + row + depth - 1;
                if (shape[row][col] === 'x' && !this.coversPartOfSelf(shape, boardCol, boardRow)) {
                    drawRect(_ctx1, color, [boardCol * this.board.cellSize, boardRow * this.board.cellSize, this.board.cellSize, this.board.cellSize], 1);
                }
            }
        }
    }

    coversPartOfSelf(shape, boardCol, boardRow) {
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[0].length; col++) {
                if (shape[row][col] === 'x' && this.pos.col + col === boardCol && this.pos.row + row === boardRow) {
                    return true;
                }
            }
        }
        return false;
    }


    moveDown() {
        if (!this.board.isEmptySpace(this, 0, 1, 0)) {
            this.board.addPiece(this);
            const points = this.board.removeFullLines();
            this.game.score += points;
            this.reset();
        } else {
            this.pos.row += 1
        }
        setTimeout(() => this.moveDown(), 400);
    }

    moveLeft() {
        if (!this.board.isEmptySpace(this, -1, 0, 0)) return;
        this.pos.col -= 1;
    }

    moveRight() {
        if (!this.board.isEmptySpace(this, 1, 0, 0)) return;
        this.pos.col += 1;
    }

    rotate() {
        if (!this.board.isEmptySpace(this, 0, 0, 1)) return;
        this.rotation = (this.rotation + 1) % Piece.rotationCount;
    }

    displayNextPiece() {
        const shape = Piece.getShapesByType(this.nextType)[0];
        const color = Piece.getColorByType(this.nextType);
        const cellLength = _$canvas2.width * 0.8 / 4;
        const offset = {x: (_$canvas2.width / 2) - (shape[0].length / 2) * cellLength, y: _$canvas2.height * 0.325}
        drawRect(_ctx2, '#262626', [0, 0, _$canvas2.width, _$canvas2.height]);
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[0].length; col++) {
                if (shape[row][col] === 'x') {
                    drawRect(_ctx2, color, [offset.x + col * cellLength, offset.y + row * cellLength, cellLength, cellLength]);
                    drawRect(_ctx2, 'white', [offset.x + col * cellLength, offset.y + row * cellLength, cellLength, cellLength], 2);
                }
            }
        }
    }
}