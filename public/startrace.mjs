const em = {};

function prepareHandles() {
    em.timer = document.querySelector('#timer');
}

const template = document.createElement('template');
template.innerHTML = `<div>
    <h4>
        <div id="marathonclock">
                <div id='hour'></div> :
                <div id='min'></div> :
                <div id='sec'></div>
        </div>
    </h4>
</div>
<style>
    #marathonclock {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        color: red;
        font-size: 3rem;
        gap: 2px;
    }
</style>`

class Timer extends HTMLElement {
    constructor() {
        super();
        this.handles = {};
        this.intervalid;
        this.attachShadow({ mode: 'open' })
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    prepareHandles() {
        this.handles.sec = this.shadowRoot.querySelector('#sec');
        this.handles.min = this.shadowRoot.querySelector('#min');
        this.handles.hour = this.shadowRoot.querySelector('#hour');
    }

    timeUnits(handles, timeout) {
        setTimeout(() => {
            clearInterval(this.intervalid);
            this.intervalid = setInterval(() => {
                handles.innerText++;
            }, 1000)
        }, timeout)
    }

    startTimer() {
        this.prepareHandles();
        this.handles.sec.innerText = 0;
        this.handles.min.innerText = 0;
        this.handles.hour.innerText = 0;
        this.timeUnits(this.handles.sec, 0);
        this.timeUnits(this.handles.min, 4000);
        this.timeUnits(this.handles.hour, 9000);
    }

    stopTimer() {
        clearInterval(this.intervalid);
    }

}

function load() {
    prepareHandles();
    startTimer();
    stopTimer();
}

// function to restart marathon timer
function startTimer() {
    em.timer.startTimer();
    em.restart = document.querySelector('#restart');
    em.restart.addEventListener("touchstart", () => {
        em.restart.classList.toggle('active');
    });

    em.restart.addEventListener("touchend", () => {
        em.restart.classList.toggle('active');
        em.timer.stopTimer();
        em.timer.startTimer();
    });
}

// function to stop marathon timer
function stopTimer() {
    em.stop = document.querySelector('#stop');
    em.stop.addEventListener("touchstart", () => {
        em.stop.classList.toggle('active');
    });

    em.stop.addEventListener("touchend", () => {
        em.stop.classList.toggle('active');
        em.timer.stopTimer();
    });
}

window.customElements.define('custom-timer', Timer);
document.addEventListener("DOMContentLoaded", load);