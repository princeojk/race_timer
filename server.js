import 'dotenv/config';
import express from 'express';
import * as db from './public/database.mjs';

const app = express();
const port = process.env.PORT;

app.use(express.static('public'));
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
    const runner = await db.delRunner(req.params.id);
    
    res.json(runner);
}

async function editRunner(req, res) {
    const { runnerName } = req.body;
    const runner = await db.editRunner(req.params.id, runnerName);
    res.json(runner);
}

app.post('/runner', saveRunner);
app.put('/runner/:id', editRunner); // change runner details
app.delete('/runner/:id', delRunner);
app.get('/runner', getRunners);
app.get('/runner/:id', getRunner);

app.listen(port, '0.0.0.0', () => {
    console.log(`listening on port ${port}`);
});