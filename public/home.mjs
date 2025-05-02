import * as util from './utils.mjs';

const ui = {}

function prepareHandles() {
    ui.createRace = document.querySelector('#send');
}

function addEventListeners() {
    util.setupButtons(ui.createRace, () => {
        window.location.href = `./recordrunner.html`;
    })
}

function homepage() {
    prepareHandles();
    addEventListeners();
}

document.addEventListener("DOMContentLoaded", homepage);