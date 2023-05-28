"use strict";

let _moveSequence = [];
let _isActionPhase = false;
let _currentMoveIndex = 0;

function handleButtonClick(e) {
    e.preventDefault();
    const $button = e.target;
    $button.id === 'start-button' ? handleStartClick($button) : handleColorClick($button);
}

function handleStartClick($button) {
    if (!$button.classList.contains('clickable') || _isActionPhase) {
        return;
    }
    $button.classList.remove('clickable');
    addMoveToSequence();
    displayMove();
}

function startActionPhase() {
    _isActionPhase = true;
    _currentMoveIndex = 0;
    addClickableToColors();
}

function displayMove(currentIndex = 0) {
    if (currentIndex >= _moveSequence.length) {
        startActionPhase();
        return;
    }
    setTimeout(() => { // timeout for small delay between showing different moves
        const currentMove = _moveSequence[currentIndex];
        const $button = document.querySelector(`#${currentMove}`);
        $button.classList.add('highlighted');
        playSound($button.id);
        setTimeout(() => {
            $button.classList.remove('highlighted');
            displayMove(++currentIndex);
        }, 1000);
    }, 500);
}

function addMoveToSequence() {
    const possibleMoves = ['red-button', 'blue-button', 'yellow-button', 'green-button'];
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    _moveSequence.push(possibleMoves[randomIndex]);
}

function handleColorClick($button) {
    if (!$button.classList.contains('clickable') || !_isActionPhase) {
        return;
    }
    const clickedId = $button.id;
    if (_moveSequence[_currentMoveIndex] !== clickedId) {
        blinkButton();
        playSound('lose-sound');
        resetGame();
        return;
    }
    $button.classList.add('highlighted');
    playSound(clickedId);
    setTimeout(() => $button.classList.remove('highlighted'), 250);
    if (_currentMoveIndex === _moveSequence.length - 1) {
        _currentMoveIndex = 0;
        _isActionPhase = false;
        addMoveToSequence();
        removeClickableFromColors();
        setTimeout(() => displayMove(), 250);
        return;
    }
    _currentMoveIndex++;
}

function blinkButton(timesBlinked = 0) {
    const $button = document.querySelector('#start-button');
    $button.classList.add('wrong');
    setTimeout(() => {
        $button.classList.remove('wrong');
        if (timesBlinked < 2) {
            setTimeout(() => blinkButton(++timesBlinked), 100);
        }
    }, 100);
}

function resetGame() {
    removeClickableFromColors();
    _moveSequence = [];
    _currentMoveIndex = 0;
    _isActionPhase = false;
    document.querySelector('#start-button').classList.add('clickable');
}

function addClickableToColors() {
    document.querySelectorAll("#green-button, #blue-button, #red-button, #yellow-button")
        .forEach($button => $button.classList.add('clickable'));
}

function removeClickableFromColors() {
    document.querySelectorAll("#green-button, #blue-button, #red-button, #yellow-button")
        .forEach($button => $button.classList.remove('clickable'));
}
