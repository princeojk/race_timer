import * as util from './utils.js';

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

    if (em.reg.value) {
        em.saverunner.name = `${em.reg.value}`;
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

const template = document.createElement('template');
template.innerHTML = `
<div>
    <h4 style= "color: red"></h4>
</div>`

class Savedrunner extends HTMLElement {
    constructor() {
        super();
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    set name(value) {
        this.shadowRoot.querySelector('h4').innerText = 
        `${value} saved`;
    }
}

window.customElements.define('saved-runner', Savedrunner);

document.addEventListener("DOMContentLoaded", recordRunner);