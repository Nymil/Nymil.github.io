"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelector('#ray-count').value = 300;
    setUpCanvas();
    startGame();
}

function setUpCanvas() {
    _$canvas = document.querySelector('canvas');
    _ctx = _$canvas.getContext('2d');
    _$canvas.width = 1900;
    _$canvas.height = 800;
}

function startGame() {
    const game = new Game();
    game.run();
}
