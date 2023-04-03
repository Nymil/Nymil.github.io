document.addEventListener('DOMContentLoaded', init);

_upperString = "-";
_displayNumber = 0;

function init() {
    document.querySelectorAll('button').forEach($button => $button.addEventListener('click', handleButtonClick));
}

function handleButtonClick(e) {
    const symbol = e.target.innerHTML.trim();
    isNaN(symbol) ? symbolClick(symbol) : numberClick(parseInt(symbol));
}

function numberClick(symbol) {
    _displayNumber === 0 ? _displayNumber = symbol : _displayNumber = 10 * _displayNumber + symbol;
    updateDisplay();
}

function symbolClick(symbol) {
    switch (symbol) {
        case 'C':
            clearScreen();
            break
        case '←':
            removeLastNumber();
            break
        case '=':
            handleResult();
            break
        default:
            break
    }
}

function clearScreen() {
    _displayNumber !== 0 ? _displayNumber = 0 : _upperString = "-";
    updateDisplay();
}

function removeLastNumber() {
    _displayNumber = Math.floor(_displayNumber / 10);
    updateDisplay();
}

function handleResult() {}

function updateDisplay() {
    $screen = document.querySelector('.screen');
    $screen.innerHTML = `<span>${_upperString}</span>${_displayNumber}`;
}