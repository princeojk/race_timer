import * as util from './utils.mjs';

const em = {}
const elems = document.querySelectorAll('[id]');

function prepareHandles() {
    for (const elem of  elems) {
        em[elem.id] = elem;
    }
}

async function storeRunner() {
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({runnerName: em.reg.value});
    const options = { method, headers, body }

    const response = await fetch('runner', options);

    if (!response.ok) {
        console.log('failed to save', response);
    }

    // displays last saved player on client
    if (em.reg.value) {
        saverunner.name = em.reg.value;
    }
}

function addEventListeners() {
    util.setupButtons(em.save, storeRunner);
    util.setupButtons(em.start, () => {
        window.location.href = `./startrace.html`;
    });
}

function recordRunner() {
    prepareHandles();
    addEventListeners();
}

document.addEventListener("DOMContentLoaded", recordRunner);