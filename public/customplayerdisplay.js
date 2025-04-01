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

    set finishLine(value) {
        this.shadowRoot.querySelector('h4').innerText = 
        `${value} reached the finish line`;
    }
}

window.customElements.define('saved-runner', Savedrunner);