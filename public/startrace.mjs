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

function startRace() {
    em.timer.stopTimer();
    em.timer.startTimer();
}

function stopTimer() {
    em.timer.stopTimer();
    em.timer.currentTime();
}

function finishTime() {
    const lap = em.timer.currentTime();
    console.log(lap);
}

function load() {
    prepareHandles();
    util.setupButtons(em.startTimer, startRace);
    util.setupButtons(em.stopTimer, stopTimer);
    util.setupButtons(em.lap, finishTime);
}

document.addEventListener("DOMContentLoaded", load);