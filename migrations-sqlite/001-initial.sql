--Up
CREATE TABLE race (
    race_id INTEGER PRIMARY KEY,
    race_name TEXT NOT NULL UNIQUE
);

CREATE TABLE runners (
    runner_id INTEGER PRIMARY KEY,
    runnerName TEXT NOT NULL,
    position_id INTEGER,
    finish_time TEXT,
    race_id INTEGER,
    FOREIGN KEY (race_id)
        REFERENCES race (race_id)
);

INSERT INTO race (race_name) VALUES ('Portsmouth marathon');

-- Down
DROP TABLE Runners;
