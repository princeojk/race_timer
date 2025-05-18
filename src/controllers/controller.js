import * as db from '../database.mjs';

export async function saveRunner(req, res) {
    const { runnerName } = req.body;
    const runner = await db.addRunners(runnerName);

    res.json(runner);
}

export async function getRunners(req, res) {
    res.json(await db.listRunners());
}

export async function getRaces(req, res) {
    res.json(await db.listRaces());
}

export async function getRunner(req, res) {
    const player = await db.findRunner(req.params.id);
    if (!player) {
        return res.status(400).json({ error: "not found" });
    }      
    res.json(player);
}

export async function delRunner(req, res) {
    const delRunner = await db.delRunner(req.params.id);
    if (!delRunner) {
        res.status(400).json({ error: "No match for that id" });
    };
    res.json(delRunner);
}

export async function savePosition(req, res) {
    const { positionId, runnerId, runnerTime } = req.body;
    const result =  await db.finishLine(positionId, runnerId, runnerTime);
    res.json(result);
}

export async function results(req, res) {
    const results = await db.leaderBoard();
    res.json(results);
}

export async function clearResults(req, res) {
    const response = await db.clearLeaderBoard();
    res.json(response);
}