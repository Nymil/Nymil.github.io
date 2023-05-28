"use strict";

function loadSounds() {
    let loc = 'assets';
    // makes div with sounds
    const soundsDiv = document.createElement('div');
    soundsDiv.id = 'sounds';
    soundsDiv.innerHTML = `
    <audio id="lose-sound-sound" src="${loc}/sounds/lose-sound.mp3"></audio>
    <audio id="yellow-button-sound" src="${loc}/sounds/yellow-button.mp3"></audio>
    <audio id="red-button-sound" src="${loc}/sounds/red-button.mp3"></audio>
    <audio id="blue-button-sound" src="${loc}/sounds/blue-button.mp3"></audio>
    <audio id="green-button-sound" src="${loc}/sounds/green-button.mp3"></audio>
  `;
    // adds the div to html
    document.body.appendChild(soundsDiv);
}

function playSound(id) {
    const $sound = document.querySelector(`#${id + '-sound'}`);
    $sound.currentTime = 0;
    $sound.play();
}
