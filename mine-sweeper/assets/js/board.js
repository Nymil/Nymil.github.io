class Board {
    constructor(game) {
        this.game = game;
        this.cols = 30;
        this.rows = 16;
        this.generated = false;
        this.bombCount = 99;
        this.cells = [];
        this.fillCells();
    }

    reset() {
        this.generated = false;
        this.cells.forEach(cell => cell.reset());
    }

    fillCells() {
        this.cells = [];
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const cell = new Cell(this, col, row);
                this.cells.push(cell);
            }   
        }
    }

    draw() {
        this.cells.forEach(cell => cell.draw());
    }

    leftClick(coords) {
        if (!this.generated) {
            this.generate(coords);
            this.generated = true;
        }
        const clickedCell = this.cellByCoords(coords.col, coords.row);
        if (clickedCell.isVisible()) {
            return;
        }
        if (clickedCell.isFlagged()) {
            return;
        }
        if (clickedCell.isBomb()) {
            clickedCell.setWrong();
            this.revealBombs();
            this.game.setGameOver();
            return;
        }
        if (clickedCell.isZero()) {
            clickedCell.revealZeros([]);
            return;
        }
        clickedCell.reveal();

        if (this.fullyRevealed()) {
            this.game.setGameOver()
            this.cells.forEach(cell => cell.reveal());
        }
    }

    revealBombs() {
        this.cells.filter(cell => cell.isBomb()).forEach(cell => cell.reveal());
    }

    fullyRevealed() {
        return this.cells.filter(cell => cell.isVisible()).length === this.cells.filter(cell => !cell.isBomb());
    }

    rightClick(coords) {
        const clickedCell = this.cellByCoords(coords.col, coords.row);
        if (clickedCell.isVisible()) {
            return;
        }
        clickedCell.toggleFlag();
    }

    generate(coords) {
        // get neighboring cells to click
        const neighboringCells = [this.cellByCoords(coords.col, coords.row)];
        Board.getDirections().forEach(direction => {
            const neighborCell = this.cellByCoords(coords.col + direction.dcol, coords.row + direction.drow);
            if (neighborCell) neighboringCells.push(neighborCell);
        })

        // get possible cell picks
        let possibleCells = this.cells.filter(cell => !neighboringCells.includes(cell));
        
        // pick random cells and change value to bomb
        for (let i = 0; i < this.bombCount; i++) {
            const randomIndex = Math.floor(Math.random() * possibleCells.length);
            const pickedCell = possibleCells[randomIndex];
            pickedCell.setValue('*');
            possibleCells = possibleCells.filter(cell => cell !== pickedCell);
        }

        // update values of other cells
        const otherCells = this.cells.filter(cell => !cell.isBomb());
        otherCells.forEach(cell => cell.updateValue());
    }

    cellByCoords(col, row) {
        return this.cells.find(cell => cell.col === col && cell.row === row);
    }

    static getDirections() {
        return [{dcol: 0, drow: -1}, {dcol: 1, drow: -1}, {dcol: 1, drow: 0}, {dcol: 1, drow: 1}, {dcol: 0, drow: 1}, {dcol: -1, drow: 1}, {dcol: -1, drow: 0}, {dcol: -1, drow: -1}];
    }

    static coordsToBoardCoords(coords) {
        return {
            col: Math.floor(coords.x / Cell.getLength()),
            row: Math.floor(coords.y / Cell.getLength())
        };
    }
}
