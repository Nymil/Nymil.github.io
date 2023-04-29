class Game {
    constructor() {
        this.fps = 30;
        this.score = 0;
        const storedLastScore = JSON.parse(localStorage.getItem("last-score"));
        const storedHighScore = JSON.parse(localStorage.getItem("high-score"));
        this.lastScore = storedLastScore ? storedLastScore : 0;
        this.highScore = storedHighScore ? storedHighScore : 0;
        this.board = new Board();
        this.currentPiece = new Piece(this);
        this.addEventListeners();
    }

    run() {
        setInterval(() => {
            this.draw();
        }, 1000 / this.fps);
    }

    restart() {
        this.lastScore = this.score;
        if (this.score > this.highScore) this.highScore = this.score;
        this.score = 0;
        this.storeScores();
        this.board.emptyBoard();
        this.currentPiece.nextType = Math.floor(Math.random() * Piece.pieceCount);
        this.currentPiece.reset();
    }

    storeScores() {
        if (localStorage) {
            localStorage.setItem("last-score", JSON.stringify(this.lastScore));
            localStorage.setItem("high-score", JSON.stringify(this.highScore));
        }
    }

    draw() {
        drawRect(_ctx1, '#262626', [0, 0, _$canvas1.width, _$canvas1.height]);
        this.currentPiece.draw();
        this.currentPiece.displayNextPiece();
        this.board.draw();
        this.currentPiece.displayShadow();
        this.updateScore();
    }

    updateScore() {
        document.querySelector('p#score').innerText = `score: ${this.score}`;
        document.querySelector('p#last-score').innerText = `last score: ${this.lastScore}`;
        document.querySelector('p#high-score').innerText = `high score: ${this.highScore}`;
    }

    handleKeyPress(key) {
        if (key === 'ArrowUp') {
            this.currentPiece.rotate();
        } else if (key === 'ArrowLeft') {
            this.currentPiece.moveLeft();
        } else if (key === 'ArrowRight') {
            this.currentPiece.moveRight();
        } else if (key === 'ArrowDown') {
            this.currentPiece.teleportDown();
        } else if (key === 'r') {
            this.restart();
        }
    }

    addEventListeners() {
        document.addEventListener('keydown', (e) => this.handleKeyPress(e.key));
    }
}