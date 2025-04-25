const template = document.createElement('template');
template.innerHTML = `
<div>
    <h4 style= "color: red"></h4>
</div>`

export class Displayprompts extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    set name(value) {
        this.shadowRoot.querySelector('h4').innerText = 
        `${value} saved`;
    }

    setFinishLine(playerName, position) {
        this.shadowRoot.querySelector('h4').innerText = 
        `${playerName} finished ${position}`;
    }

    timerWarning() {
        this.shadowRoot.querySelector(`h4`).innerText = `timer still active`
    }

    currentTime(time) {
        this.shadowRoot.querySelector(`h4`).innerText = time;
    }
}

window.customElements.define('custom-display', Displayprompts);