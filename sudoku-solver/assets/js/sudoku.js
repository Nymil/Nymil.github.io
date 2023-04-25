class Sudoku {
    constructor(main) {
        this.main = main;
        this.board = [];
        this.size = 9;
        this.boxSize = 3;
        this.stack = [];
        this.fillBoard();
    }

    fillBoard() {
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                const box = Math.floor(col / this.boxSize) + this.boxSize * Math.floor(row / this.boxSize);
                const cell = new Cell(col, row, box);
                this.board.push(cell);
            }
        }
    }

    solve() {
        if (this.stack.length === 1 && this.stack[0].triedValues.length === 9) {
            console.log('unsolvable board');
            return;
        }

        const curCell = this.getNextCell(this.stack[this.stack.length - 1]);
        const possibleValues = this.getPossibleValuesOfCell(curCell);
        
        if (possibleValues.length === 0) {
            const cellToRemove = this.stack.pop();
            this.getNextCell(cellToRemove).triedValues = [];
            cellToRemove.triedValues.push(cellToRemove.value);
            cellToRemove.value = null;
            this.main.draw();
        } else {
            curCell.value = possibleValues[0];
            this.stack.push(curCell);
            this.main.draw();
        }
        setTimeout(() => this.solve(), 1);
    }

    getNextCell(curCell) {
        const emptyCells = this.board.filter(cell => cell.value === null);
        const sortedEmptyCells = emptyCells.sort((a, b) => a.col + this.size * a.row - b.col - this.size * b.row);
        if (curCell) return sortedEmptyCells[0];
        const nextIndex = sortedEmptyCells.indexOf(curCell) + 1;
        return sortedEmptyCells[nextIndex];
    }

    getPossibleValuesOfCell(curCell) {
        let possibleValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        // remove values of cell in same col
        const valuesInSameCol = this.board.filter(cell => cell.value !== null && cell.col === curCell.col).map(cell => cell.value);
        possibleValues = possibleValues.filter(value => !valuesInSameCol.includes(value));
        // remove values of cell in same row
        const valuesInSameRow = this.board.filter(cell => cell.value !== null && cell.row === curCell.row).map(cell => cell.value);
        possibleValues = possibleValues.filter(value => !valuesInSameRow.includes(value));
        // remove values of cell in same box
        const valuesInSameBox = this.board.filter(cell => cell.value !== null && cell.box === curCell.box).map(cell => cell.value);
        possibleValues = possibleValues.filter(value => !valuesInSameBox.includes(value));
        // remove the values already tried
        possibleValues = possibleValues.filter(value => !curCell.triedValues.includes(value));
        return possibleValues;
    }

    setValue(value) {
        const cell = this.getSelectedCell();
        if (!cell) return;
        cell.value = value;
        cell.static = true;
    }

    remValue() {
        const cell = this.getSelectedCell();
        if (!cell) return;
        cell.value = null;
        cell.static = false;
    }

    clearSelectedCells() {
        const selectedCell = this.getSelectedCell();
        if (selectedCell) selectedCell.selected = false;
    }

    getSelectedCell() {
        return this.board.find(cell => cell.selected);
    }

    getCell(col, row) {
        return this.board.find(cell => cell.col === col && cell.row === row);
    }

    selectCell(col, row) {
        this.getCell(col, row).selected = true;
    }

    draw() {
        // draw cell text
        this.board.forEach(cell => cell.draw());
        // draw lines
        for (let i = 1; i < this.size; i++) {
            const width = i % 3 === 0 ? 5 : 1;
            const offset = i * (_$canvas.width / this.size);
            drawLine('#FF8B94', [offset, 0, offset, _$canvas.width], width);
            drawLine('#FF8B94', [0, offset, _$canvas.width, offset], width);
        }
    }
}