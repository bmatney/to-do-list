$(document).ready(function () {
    getTasks();

    // add a task
    $('#task-submit').on('click', postBook);

    // delete a task
    $("#task-list").on('click', '.delete', deleteBook);

    // complete a task
    $("#task-list").on('click', '.complete', updateBook);

  });
/**
 * Retrieve tasks from server and append to DOM
 */
function getTasks() {
  $.ajax({
    type: 'GET',
    url: '/tasks/',
    success: function (tasks) {
      appendBooks(tasks);
    },

    error: function () {
      console.log('Database error');
    },
  });
}
/**
 * Add a new task to the database and refresh the DOM
 */
function postBook() {
  event.preventDefault();

  var task = {};

  $.each($('#newTask').serializeArray(), function (i, field) {
    task[field.name] = field.value;
  });

  // convert edition to integer
  task.edition = parseInt(task.edition);

  console.log('task: ', task);

  $.ajax({
    type: 'POST',
    url: '/tasks',
    data: task,
    success: function (response) {
      getTasks();
    },

    error: function () {
      console.log('could not post a new task');
    },
  });
}

function deleteBook() {
  var id = $(this).parent().data('id');
  console.log(id);

  $.ajax({
    type: 'DELETE',
    url: '/tasks/' + id,
    success: function (result) {
      getTasks();
    },

    error: function (result) {
      console.log('could not delete task.');
    },
  });
}

function updateBook() {
  var id = $(this).parent().data('id');
  console.log(id);

  // make task object
  var task = {};
  var fields = $(this).parent().children().serializeArray();
  fields.forEach(function (field) {
    task[field.name] = field.value;
  });

  console.log(task);

  $.ajax({
    type: 'PUT',
    url: '/tasks/' + id,
    data: task,
    success: function (result) {
      console.log('updated!!!!');
      getTasks();
    },

    error: function (result) {
      console.log('could not update task!');
    },
  });
}

function appendBooks(tasks) {
  $("#task-list").empty();

  for (var i = 0; i < tasks.length; i++) {
    $("#task-list").append('<div class="row task"></div>');
    $el = $('#task-list').children().last();
    var task = tasks[i];
    $el.data('id', task.id);

    $el.append('<input type="text" name="title" value="' + task.title + '" />');
    $el.append('<input type="text" name="author" value="' + task.task_content + '" />');

    $el.append('<button class="complete">Complete</button>');
    $el.append('<button class="delete">Delete</button>');
  }
}
