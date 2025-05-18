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

<<<<<<< HEAD
    // diplays save or delete related events
=======
>>>>>>> 13c33a7a2fff1a3d9e61edbe2d4b3171f944a61d
    saveEvent(value) {
        this.shadowRoot.querySelector('h4').innerText = 
        `${value}`;
    }

    //displays the player name and position of completed marathon runners
    setFinishLine(playerName, position) {
        this.shadowRoot.querySelector('h4').innerText = 
        `${playerName} finished ${position}`;
    }

    // displays warning if the timer is active
    timerWarning() {
        this.shadowRoot.querySelector(`h4`).innerText = `End race to view results`
    }

    currentTime(time) {
        this.shadowRoot.querySelector(`h4`).innerText = time;
    }
}

window.customElements.define('custom-display', Displayprompts);