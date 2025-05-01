import * as util from './utils.mjs';

const em = {};

function prepareHandles() {
    em.main = document.querySelector('main');
    const timerPage = em.main.querySelectorAll('[id]');
    for (const button of timerPage) {
        em[button.id] = button;
    } 
}

function setupEventListerners() {
    util.setupButtons(em.startTimer, startRace);
    util.setupButtons(em.stopTimer, stopTimer);
    util.setupButtons(em.lap, displayLapTime);
    util.setupButtons(completed, leaderBoard);
    util.setupButtons(em.results, results);
}

function displayLapTime() {
    const { hour, min, sec } = em.timer.currentTime()
    const finishTime = `${hour} : ${min} : ${sec}`;
    lapTime.currentTime(finishTime);
}

function startRace() {
    em.timer.stopTimer();
    em.timer.startTimer();
}

function stopTimer() {
    em.timer.stopTimer();
}

async function retrieveRunner() {
    const getSavedRunner = await fetch(`runner/${em.playerID.value}`);
    const value = await getSavedRunner.json();
    return value;
}

// record finish time
async function leaderBoard() {
    const value = await retrieveRunner();
    const { hour, min, sec } = em.timer.currentTime()
    const finishTime = `${hour} : ${min} : ${sec}`;

    const method = 'POST';
    const headers = { 'Content-Type': 'application/json' };
    const body = JSON.stringify({
        runnerId: value.runner_id,
        positionId: em.positionID.value,
        runnerTime: finishTime
    });
    const options = { method, headers, body }

    const response = await fetch('leaderBoard', options);
    const {runnerName, position_id} = await response.json();

    saveplayer.setFinishLine(runnerName, position_id);
}

function results() {
    if (em.timer.checkClockActive()) {
        saveplayer.timerWarning();
    };
    window.location.href = `./results.html`;
} 

function load() {
    prepareHandles();
    setupEventListerners();
}

document.addEventListener("DOMContentLoaded", load);