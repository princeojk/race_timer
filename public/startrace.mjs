import * as util from './utils.js';

const em = {};

function prepareHandles() {
    em.timerSection = document.querySelector('#center');
    const timeButtons = em.timerSection.querySelectorAll('[id]');
    debugger;
    for (const button of timeButtons) {
        em[button.id] = button;
    } 
}

export function finishTime() {
    const lap =  em.timer.currentTime();
}

function startRace() {
    em.timer.stopTimer();
    em.timer.startTimer();
}

function stopTimer() {
    em.timer.stopTimer();
    em.timer.currentTime();
}

function setupEventListerners() {
    util.setupButtons(em.startTimer, startRace);
    util.setupButtons(em.stopTimer, stopTimer);
    util.setupButtons(em.lap, finishTime);
    util.setupButtons(completed, completeRunner);
}

// record finish time
async function completeRunner() {
    em.url = `runner/${em.playerID.value}`
    const response = await fetch(em.url);
    const value = await response.json()
    em.saveplayer.finishLine = value.runnerName;
}

function load() {
    prepareHandles();
    setupEventListerners();
}

document.addEventListener("DOMContentLoaded", load);