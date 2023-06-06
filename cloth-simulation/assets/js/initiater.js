"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    initCanvas();
    startMain();
}

function initCanvas() {
    _$canvas = document.querySelector('canvas');
    _ctx = _$canvas.getContext('2d');

    _$canvas.width = 1075;
    _$canvas.height = 650;
}

function startMain() {
    const main = new Main();
    main.run();
}
