class Board {

    static emptyValue = -1;
    solidBoard;

    constructor() {
        this.cols = 10;
        this.rows = 20;
        this.cellSize = _$canvas1.width / this.cols;
        this.emptyBoard();
    }

    emptyBoard() {
        this.solidBoard = new Array(this.rows).fill(Board.emptyValue).map(() => new Array(this.cols).fill(Board.emptyValue));
    }

    draw() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.drawCell(col, row);
            }
        }
    }

    isEmptySpace(piece, dCol, dRow, dRotation) {
        const shape = piece.shapes[(piece.rotation + dRotation) % Piece.rotationCount];
        for (let row = 0; row < shape.length; row++) {
            for (let col = 0; col < shape[0].length; col++) {
                const part = shape[row][col];
                const boardPos = {col: piece.pos.col + col + dCol, row: piece.pos.row + row + dRow};
                if (this.isInValidSpace(part, boardPos)) {
                    return false;
                }
            }
        }
        return true;
    }

    removeFullLines() {
        const endBoard = this.solidBoard.filter(row => row.some(value => value === Board.emptyValue));
        const removedLineCount = this.rows - endBoard.length;
        const startBoard = new Array(removedLineCount).fill(new Array(this.cols).fill(Board.emptyValue));
        this.solidBoard = startBoard.concat(endBoard);
        return 100 * removedLineCount;
    }

    addPiece(piece) {
        const shape = piece.shapes[piece.rotation];
        for (let row = 0; row < shape.length; row++){
            for (let col = 0; col < shape[0].length; col++){
                if (shape[row][col] === 'x') {
                    this.solidBoard[row + piece.pos.row][col + piece.pos.col] = piece.type;
                }
            }
        }
    }

    drawCell(col, row) {
        const part = this.solidBoard[row][col];
        if (part !== Board.emptyValue) {
            const color = Piece.getColorByType(part);
            drawRect(_ctx1, color, [col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize]);
        }
        drawRect(_ctx1, 'white', [col * this.cellSize, row * this.cellSize, this.cellSize, this.cellSize], 1);
    }

    isInValidSpace(part, boardPos) {
        return part === 'x' && (boardPos.col < 0 || boardPos.row < 0 || boardPos.col >= this.cols || boardPos.row >= this.rows || this.solidBoard[boardPos.row][boardPos.col] !== Board.emptyValue);
    }
}