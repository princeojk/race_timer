const template = document.createElement('template');
template.innerHTML = `<div>
    <h3>
        <div id='hour'></div> :
        <div id='min'></div> :
        <div id='sec'></div>
    </h3>
</div>
<style>
    h3 {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        color: red;
        font-size: 3rem;
        gap: 0.6rem;
    }
</style>`

export class Timer extends HTMLElement {
    constructor() {
        super();
        this.clockActive;
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.timeUnits = this.shadowRoot.querySelectorAll('[id]');
        this.hdl = {};
        this.intvalIds = {}
        this.prepareHandles()
    }

    prepareHandles() {
        for (let unit of this.timeUnits) {
            this.hdl[unit.id] = unit;
            this.hdl[unit.id].innerText = 0;
        }
    }

    setSec() {
        this.intvalIds.secID = setInterval(() => {
            this.hdl.sec.innerText++;
        }, 1000)

    }

    setMin() {
        this.intvalIds.minID = setInterval(() => {
            this.hdl.min.innerText++;
            clearInterval(this.intvalIds.secID);
            this.hdl.sec.innerText = 0;
            this.setSec();
        }, 6000)

    }

    setHour() {
        this.intvalIds.hourID = setInterval(() => {
            this.hdl.hour.innerText++;
        }, 120000)
    }

    startTimer() {
        this.setSec();
        this.setMin();
        this.setHour();
        this.clockActive = true;
    }

    stopTimer() {
        this.prepareHandles();
        for (const key in this.intvalIds) {
            clearInterval(this.intvalIds[key]);
        }
        this.clockActive = false;
    }

    checkClockActive() {
        return this.clockActive;
    }

    currentTime() {
        const sec = this.hdl.sec.innerText;
        const min = this.hdl.min.innerText;
        const hour = this.hdl.hour.innerText;
        return {hour, min, sec}
    }
}

window.customElements.define('custom-timer', Timer);