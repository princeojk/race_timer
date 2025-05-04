import 'dotenv/config';
import express from 'express';
import * as db from './public/database.mjs';
import { fileURLToPath } from 'url';
import path from 'path';

const app = express();
const port = process.env.PORT;

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

app.use(express.static(path.join(dirname, 'public')));
app.use(express.static(path.join(dirname, 'public', 'screens')));
app.use(express.json());

async function saveRunner(req, res) {
    const { runnerName } = req.body;
    const runner = await db.addRunners(runnerName);

    res.json(runner);
}

async function getRunners(req, res) {
    res.json(await db.listRunners());
}

async function getRunner(req, res) {
    const player = await db.findRunner(req.params.id);
    if (!player) {
        res.status(404).send('No match for that ID.');
    }
    res.json(player);
}

async function delRunner(req, res) {
    const delRunner = await db.delRunner(req.params.id);
    if (!delRunner) {
        res.status(404).send('No match for that ID.');
    };
    res.json(delRunner);
}

async function savePosition(req, res) {
    const { positionId, runnerId, runnerTime } = req.body;
    const result =  await db.finishLine(positionId, runnerId, runnerTime);
    res.json(result);
}

async function results(req, res) {
    const results = await db.leaderBoard();
    res.json(results);
}

app.get('/', (req, res) => {
    res.sendFile(path.join(dirname, 'public', 'screens', 'home.html'))
})

app.post('/runner', saveRunner);
app.delete('/runner/:id', delRunner);
app.get('/runner', getRunners);
app.get('/runner/:id', getRunner);
app.post('/leaderBoard', savePosition);
app.get('/leaderBoard', results);

app.listen(port, () => {
    console.log(`listening on port ${port}`);
});