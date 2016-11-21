CREATE TABLE tasks(
id SERIAL PRIMARY KEY,
title VARCHAR(80) NOT NULL,
task_content VARCHAR(80) NOT NULL
);

INSERT INTO tasks (title, task_content)
VALUES ('Weekend Challenge', 'Complete the weekend challenge to make a to-do list'),
('Sleep', 'Try to get 8 hours of sleep'),
('Read Book', 'Finally get around to reading the Duckett books that you bought');

SELECT *
FROM tasks;
