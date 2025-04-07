CREATE TABLE finishLine (
    position_id INTEGER Primary KEY,
    id INTEGER,
    FOREIGN KEY (id) REFERENCES Runners(id)
) 