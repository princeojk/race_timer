import * as util from './utils.mjs';

const em = {}

function prepareHandles() {
    em.createRace = document.querySelector('#send');
}

function addEventListeners() {
    util.setupButtons(em.createRace, () => {
        window.location.href = `./recordrunner.html`;
    })
}

function homepage() {
    prepareHandles();
    addEventListeners();
}

document.addEventListener("DOMContentLoaded", homepage);