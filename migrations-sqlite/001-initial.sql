-- Up
CREATE TABLE Runners (
    runner_id INTEGER PRIMARY KEY,
    runnerName TEXT NOT NULL,
    position_id INTEGER,
    time DATETIME
);

INSERT INTO Runners (runnerName, time) VALUES
('John Paul', datetime('now'));

-- Down
DROP TABLE Runners;
