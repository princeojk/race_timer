import * as util from '../utils.mjs';

const ui = {}

function prepareHandles() {
    const inputs = document.querySelectorAll('[id]');
    for (const input of inputs) {
        ui[input.id] = input
    }
}

async function clearResults() {
    const response = await fetch('/leaderBoard', {
        method: 'Delete'
    })

    console.log(response);

    if (response.ok) {
        display.saveEvent(`Results cleared.`);
    }
}

function addEventListeners() {
    util.setupButtons(ui.create, () => {
        window.location.href = `./recordrunner.html`;
    })
    util.setupButtons(ui.results, () => {
        window.location.href = `./results.html`;
    })
    util.setupButtons(ui.clear, () => {
        clearResults()
    })
}

function homepage() {
    prepareHandles();
    addEventListeners();
}

document.addEventListener("DOMContentLoaded", homepage);