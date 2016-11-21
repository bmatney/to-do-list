var express = require('express');
var router = express.Router();
var pg = require('pg');
var connectionString = 'postgres://localhost:5432/brianmatney';

router.get('/', function (req, res) {
    console.log('get request');

    // get tasks from DB
    pg.connect(connectionString, function (err, client, done) {
          if (err) {
            console.log('connection error: ', err);
            res.sendStatus(500);
          }

          client.query('SELECT * FROM tasks', function(err, result) {
            done(); // close the connection.

            if (err) {
              console.log('select query error: ', err);
              res.sendStatus(500);
            }

            res.send(result.rows);

          });

        });
  });

router.post('/', function(req, res) {
    var newTask = req.body;
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
          console.log('connection error: ', err);
          res.sendStatus(500);
        }

        client.query(
            'INSERT INTO tasks (title, task_content) ' +
            'VALUES ($1, $2)', [newTask.title, newTask.task_content],
            function(err, result) {
                done();

                if (err) {
                    console.log('insert query error: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(201);
                }
            });

    });

});

router.delete('/:id', function(req, res) {
    taskId = req.params.id;

    console.log('book id to delete: ', taskId);
    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('connection error: ', err);
            res.sendStatus(500);
        }

        client.query(
            'DELETE FROM tasks WHERE id = $1', [taskId],
            function(err, result) {
                done();

                if (err) {
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
    });

});

router.put('/:id', function(req, res) {
    taskId = req.params.id;
    task = req.body;

    console.log('task to update ', task);

    pg.connect(connectionString, function(err, client, done) {
        if (err) {
            console.log('connection error: ', err);
            res.sendStatus(500);
        }

        client.query(
            'UPDATE tasks SET title=$1, task_content=$2' +
            ' WHERE id=$3',

            // array of values to use in the query above
            [task.title, task.task_content, taskId],
            function(err, result) {
                if (err) {
                    console.log('update error: ', err);
                    res.sendStatus(500);
                } else {
                    res.sendStatus(200);
                }
            });
    }); // close connect

}); // end route

module.exports = router;
