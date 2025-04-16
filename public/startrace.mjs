import * as util from './utils.mjs';

const em = {};

function prepareHandles() {
    em.timerSection = document.querySelector('#center');
    const timeButtons = em.timerSection.querySelectorAll('[id]');
    for (const button of timeButtons) {
        em[button.id] = button;
    } 
}

function setupEventListerners() {
    util.setupButtons(em.startTimer, startRace);
    util.setupButtons(em.stopTimer, stopTimer);
    util.setupButtons(em.lap, finishTime);
    util.setupButtons(completed, leaderBoard);
}

export function finishTime() {
    return em.timer.currentTime();
}

function startRace() {
    em.timer.stopTimer();
    em.timer.startTimer();
}

function stopTimer() {
    em.timer.stopTimer();
    em.timer.currentTime();
}

async function retrieveRunner() {
    const getSavedRunner = await fetch(`runner/${em.playerID.value}`);
    const value = await getSavedRunner.json();
    return value;
}

// record finish time
async function leaderBoard() {
    const value = await retrieveRunner();
    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
        runnerId: value.runner_id,
        positionId: em.positionID.value
    });
    const options = { method, headers, body }

    const response = await fetch('leaderBoard', options);
    const {runnerName, position_id} = await response.json();
    saveplayer.setFinishLine(runnerName, position_id);
}


function load() {
    prepareHandles();
    setupEventListerners();
}

document.addEventListener("DOMContentLoaded", load);