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
}

const dbConn = init();

export async function listRunners() {
    const db = await dbConn;

    return db.all('SELECT * FROM Runners');
}

export async function addRunners(runnerName) {
    const db = await dbConn;
    const time = new Date().toISOString();

    await db.run('INSERT INTO Runners (runnerName, time) VALUES (?, ?)', [runnerName, time]);
    return listRunners();
}

export async function findRunner(id) {
    const db = await dbConn;
    return db.get('SELECT * FROM Runners WHERE id = ?', id);
}

export async function delRunner(id) {
    const db = await dbConn;

    const statement = await db.run('DELETE FROM Runners WHERE id = ?', id);
}

export async function editRunner(id, updatedName) {
    const db = await dbConn;
    const statement = await db.run('UPDATE Runners SET runnerName = ? WHERE id = ?', [updatedName, id]);

    return findRunner(id);
}

async function rollBack() {
    const db = await dbConn;

    db.run('DROP TABLE Runners');
    await db.run('DELETE FROM migrations');
}

// rollBack();