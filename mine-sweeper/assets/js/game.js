class Game {
    constructor() {
        this.fps = 30;
        this.board = new Board(this);
        this.gameOver = false;
        this.addEventListeners();
    }

    setGameOver() {
        this.gameOver = true;
    }

    draw() {
        this.board.draw();
    }

    run() {
        setInterval(() => this.draw(), 1000 / this.fps);
    }

    handleClick(e) {
        if (e.target.nodeName !== 'CANVAS' || this.gameOver) {
            return;
        }

        const mouseCoords = this.getMouseCoords(e);
        const boardCoords = Board.coordsToBoardCoords(mouseCoords);

        if (e.which === 1) {
            this.board.leftClick(boardCoords);
        }
        if (e.which === 3) {
            this.board.rightClick(boardCoords);
        }
    }

    handelKeyClick(key) {
        if (key === 'r') {
            this.gameOver = false;
            this.board.reset();
        }
    } 

    getMouseCoords(e) {
        var rect = _$canvas.getBoundingClientRect();
        return {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
    }

    addEventListeners() {
        document.addEventListener('mousedown', (e) => this.handleClick(e));
        document.addEventListener('keydown', (e) => this.handelKeyClick(e.key.toLowerCase()));
        document.querySelector('canvas').addEventListener('contextmenu', (e) => e.preventDefault());
    }
}
