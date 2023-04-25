class Cell {
    constructor(col, row, box) {
        this.col = col;
        this.row = row;
        this.box = box;
        this.length = _$canvas.width / 9;
        this.selected = false; // selected during board building stage
        this.value = null; // value that gets displayed
        this.static = false; // is it calculated or set by the player
        this.triedValues = [];
    }

    draw() {
        if (this.selected) drawRect('#ffc5b6', [this.col * this.length, this.row * this.length, this.length, this.length]);
        if (this.value === null) return;
        const color = this.static ? '#FF8B94' : '#FFAAA5';
        drawText(color, this.value, [this.col * this.length + this.length / 4, this.row * this.length + (5 / 6) * this.length], 90);
    }
}