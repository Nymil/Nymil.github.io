"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    setUpCanvas();
    startMain();
}

function setUpCanvas() {
    _$canvas = document.querySelector('canvas');
    _ctx = _$canvas.getContext('2d');
    _$canvas.width = 850;
    _$canvas.height = 850;
}

function startMain() {
    const main = new Main();
}
