class Main {
    constructor() {
        this.fps = 30;
        this.sudoku = new Sudoku(this);
        this.buildPhase = true;
        this.draw();
        this.addEventListeners();
    }

    draw() {
        drawRect('#FFD3B6', [0, 0, _$canvas.width, _$canvas.height]);
        this.sudoku.draw();
    }

    handleKeyClick(e) {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        if (e.key === 'Delete') {
            this.sudoku.remValue();
            this.draw();
            return;
        }
        if (!numbers.includes(parseInt(e.key))) return;
        this.sudoku.setValue(parseInt(e.key));
        this.draw();
    }

    handleCellClick(e) {
        console.log(this.sudoku.getCell(Math.floor(this.getMousePos(e).x / (_$canvas.width / this.sudoku.size)), Math.floor(this.getMousePos(e).y / (_$canvas.height / this.sudoku.size))).possibleValues);
        if (!this.buildPhase) return;
        const pos = this.getMousePos(e);
        const clickedCol = Math.floor(pos.x / (_$canvas.width / this.sudoku.size));
        const clickedRow = Math.floor(pos.y / (_$canvas.height / this.sudoku.size));
        // clear previous selection
        this.sudoku.clearSelectedCells();
        // add new selection
        this.sudoku.selectCell(clickedCol, clickedRow);
        this.draw();
    }

    getMousePos(e) {
        var rect = _$canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
    }

    handleSolveButtonClick(e) {
        // if (!this.buildPhase) return;
        this.buildPhase = false;
        this.sudoku.clearSelectedCells();
        this.draw();
        this.sudoku.solve();
    }

    addEventListeners() {
        _$canvas.addEventListener('click', (e) => this.handleCellClick(e));
        document.addEventListener('keydown', (e) => this.handleKeyClick(e));
        document.querySelector('button').addEventListener('click', (e) => this.handleSolveButtonClick(e));
    }
    
}