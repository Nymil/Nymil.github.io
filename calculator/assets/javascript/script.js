document.addEventListener('DOMContentLoaded', init);

let _upperString = "-";
let _displayNumber = 0;
let _selectedCalculation = null;

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
            break;
        case '←':
            removeLastNumber();
            break;
        case '=':
            handleResult();
            break;
        default:
            handleCalculationClick(symbol);
            break;
    }
}

function clearScreen() {
    _displayNumber !== 0 ? _displayNumber = 0 : _upperString = "-";
    _selectedCalculation = null;
    updateDisplay();
}

function removeLastNumber() {
    _displayNumber = Math.floor(_displayNumber / 10);
    updateDisplay();
}

function handleResult() {
    let result = calculateResult();
    _upperString = '-';
    _displayNumber = result;
    _selectedCalculation = null;
    updateDisplay();
}

function handleCalculationClick(symbol) {
    console.log(symbol);
    if (_selectedCalculation == null) {
        _upperString = _displayNumber;
        _displayNumber = 0;
        _selectedCalculation = symbol;
        updateDisplay();
        return;
    }

    let result = calculateResult();
    _upperString = result;
    _displayNumber = 0;
    _selectedCalculation = symbol;
    updateDisplay();
}

function calculateResult() {
    let result;
    switch (_selectedCalculation) {
        case '×':
            result = _upperString * _displayNumber;
            break;
        case '÷':
            result = _upperString / _displayNumber;
            break;
        case '−':
            result = _upperString - _displayNumber;
            break;
        case '+':
            result = _upperString + _displayNumber;
            break;
    }
    return result;
}

function updateDisplay() {
    const $screen = document.querySelector('.screen');
    $screen.innerHTML = `<span>${_upperString}</span>${_displayNumber}`;
}