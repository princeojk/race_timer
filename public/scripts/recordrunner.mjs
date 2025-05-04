import * as util from '../utils.mjs';

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

    const response = await fetch('/runner', options);

    if (response.ok) {
        displayevent.saveEvent(`${em.reg.value} saved`);
    }
}

async  function deleteRunner() {
     if (isNaN(em.reg.value)) {
        displayevent.saveEvent(`Enter runners ID to delete`);
        return; // stops delete event if not a valid runners ID
    }

    const response = await fetch(`/runner/${em.reg.value}`, {
        method: 'DELETE',
    }) 

    const data = await response.json(); 

    // displays play last deleted
    if (response.ok) {
        displayevent.saveEvent(`${data.runnerName} deleted`);
    }
}

function addEventListeners() {
    util.setupButtons(em.save, storeRunner);
    util.setupButtons(em.start, () => {
        window.location.href = `./startrace.html`;
    });
    util.setupButtons(em.del, deleteRunner);
}

function recordRunner() {
    prepareHandles();
    addEventListeners();
}

document.addEventListener("DOMContentLoaded", recordRunner);