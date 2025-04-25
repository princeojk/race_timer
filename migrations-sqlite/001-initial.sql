--Up
CREATE TABLE Runners (
    runner_id INTEGER PRIMARY KEY,
    runnerName TEXT NOT NULL,
    position_id INTEGER,
    finish_time TEXT
);

INSERT INTO Runners (runnerName) VALUES
('John Paul');

-- Down
DROP TABLE Runners;
