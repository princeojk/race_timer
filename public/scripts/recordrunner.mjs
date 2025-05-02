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

    const response = await fetch('../runner', options);

    if (!response.ok) {
        saverunner.name = `${em.reg.value} not saved`; // displays not saved on client
    } else {
        saverunner.name = `${em.reg.value} saved`;
    }
}

async  function deleteRunner() {
    const response = await fetch(`../runner/${em.delete.value}`, {
        method: 'DELETE',
    }) 

    const data = await response.json(); 

    // displays play last deleted / attempt
    if (!response.ok) {
        data.name = `${runnerName.runnerName} not deleted`;
    } else {
        data.name = `${runnerName.runnerName} deleted`;
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