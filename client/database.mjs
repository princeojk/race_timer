import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

async function init() {
    const db = await open({
        filename: './database.sqlite',
        driver: sqlite3.Database,
        verbose: true,
    });
    await db.migrate({ migrationsPath: './migrations-sqlite' });
    return db;
};

const dbConn = init();

export async function listRunners() {
    const db = await dbConn;
    return db.all('SELECT * FROM runners');
};

export async function listRaces() {
    const db = await dbConn;
    return db.all('SELECT * FROM race');
};

export async function addRunners(runnerName) {
    const db = await dbConn;
    await db.run('INSERT INTO runners (runnerName) VALUES (?)', 
        [runnerName]);
    return listRunners();
};

export async function findRunner(runner_id) {
    const db = await dbConn;
    return db.get('SELECT * FROM runners WHERE runner_id = ?', runner_id);
};

export async function delRunner(runner_id) {
    const db = await dbConn;
    const runner = await findRunner(runner_id);
<<<<<<<< HEAD:src/database.mjs
    await db.run('DELETE FROM runners WHERE runner_id = ?', runner_id);
========
    await db.run('DELETE FROM Runners WHERE runner_id = ?', runner_id);
>>>>>>>> 13c33a7a2fff1a3d9e61edbe2d4b3171f944a61d:client/database.mjs
    return runner;
};

export async function getPlayerPosition(runner_id) {
    const db = await dbConn;
    const result = await db.get(
        `SELECT position_id, runnerName FROM runners WHERE runner_id = ?`, runner_id);
    return result;
};

export async function finishLine(position_id, runner_id, runnerTime) {
    const db = await dbConn;
    await db.run(`UPDATE runners SET position_id = ?, finish_time = ? WHERE runner_id = ?`, 
        [position_id, runnerTime, runner_id]);
    return getPlayerPosition(runner_id);
};

export async function leaderBoard() {
    const db = await dbConn;
    const results = await db.all(`SELECT position_id, runner_id, runnerName, finish_time 
        FROM runners ORDER BY 1`);
    return results;
}

export async function  clearLeaderBoard() {
    const db = await dbConn;
    const results = await db.all('Delete from runners')
    return results;
}

export async function rollBack() {
    const db = await dbConn;
    db.run('DROP TABLE race');
    db.run('DROP TABLE runners');
    await db.run('DELETE FROM migrations');
    console.log("rollback called");
};
