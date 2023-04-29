"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    initiateCanvas();
    startGame();
}

function initiateCanvas() {
    _$canvas1 = document.querySelector('canvas#main-screen');
    _ctx1 = _$canvas1.getContext('2d');
    _$canvas1.width = 450;
    _$canvas1.height = 900;
    _$canvas2 = document.querySelector('canvas#preview');
    _ctx2 = _$canvas2.getContext('2d');
    _$canvas2.width = 300;
    _$canvas2.height = 300;
}

function startGame() {
    const game = new Game();
    game.run();
}
