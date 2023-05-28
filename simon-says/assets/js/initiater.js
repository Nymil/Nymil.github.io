"use strict";

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.querySelectorAll('button').forEach($button => $button.addEventListener('click', handleButtonClick));
    loadSounds();
}
