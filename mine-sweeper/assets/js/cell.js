class Cell {
    constructor(board, col, row) {
        this.board = board;
        this.col = col;
        this.row = row;
        this.reset();
    }

    reset() {
        this.value = null;
        this.visible = false;
        this.flag = false;
        this.wrong = false;
    }

    draw() {
        const borderColor = this.visible ? '#78A5A3' : '#CE5A57';
        
        let cellColor;
        if (this.wrong) {
            cellColor = '#ad2b1a';
        } else if (this.visible) {
            cellColor = '#AAAAAA';
        } else {
            cellColor = '#E1B16A';
        }
        
        drawRect(cellColor, [this.col * Cell.getLength(), this.row * Cell.getLength(), Cell.getLength(), Cell.getLength()]);
        drawRect(borderColor, [this.col * Cell.getLength(), this.row * Cell.getLength(), Cell.getLength(), Cell.getLength()], 2);

        if (this.visible) {
            drawText('#444C5C', this.value, [this.col * Cell.getLength() + 10, (this.row + 1) * Cell.getLength() - 5], 50);
        } else if (this.flag) {
            drawCircle('#CE5A57', [this.col * Cell.getLength() + Cell.getLength() / 2, this.row * Cell.getLength() + Cell.getLength() / 2], 10);
        }


    }

    setWrong() {
        this.wrong = true;
    }

    toggleFlag() {
        this.flag = !this.flag;
    }

    isVisible() {
        return this.visible;
    }

    isFlagged() {
        return this.flag;
    }

    isZero() {
        return this.value === 0;
    }

    setValue(value) {
        this.value = value;
    }

    isBomb() {
        return this.value === '*';
    }

    getValue() {
        return this.value;
    }

    reveal() {
        this.visible = true;
    }

    revealZeros(stack) {
        if (stack.includes(this)) {
            return;
        }
        stack.push(this);
        this.reveal();

        Board.getDirections().forEach(direction => {
            const neighborCell = this.board.cellByCoords(this.col + direction.dcol, this.row + direction.drow);
            if (neighborCell) {
                neighborCell.reveal();
            }
            if (neighborCell && neighborCell.isZero()) {
                neighborCell.revealZeros(stack);
            }
        })
    }

    updateValue() {
        let neighborBombCount = 0;
        Board.getDirections().forEach(direction => {
            const neighborCell = this.board.cellByCoords(this.col + direction.dcol, this.row + direction.drow);
            if (neighborCell && neighborCell.isBomb()) {
                neighborBombCount += 1;
            }
        })
        this.setValue(neighborBombCount);
    }

    static getLength() {
        return _$canvas.height / 16;
    }
}
