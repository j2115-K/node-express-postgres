// index.js

const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

// Helper function to calculate days left
function daysUntil(deadline) {
  const now = new Date();
  const end = new Date(deadline);
  const timeDiff = end - now;
  return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

router.get('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  if (isAuth) {
    const userId = req.user.id;
    knex("tasks")
      .select("*")
      .where({user_id: userId})
      .then(function (results) {
        // Calculate days left for each task
        const todos = results.map(task => {
          const daysLeft = task.deadline ? daysUntil(task.deadline) : null;
          return {
            ...task,
            daysLeft: daysLeft < 0 ? 0 : daysLeft
          };
        });

        res.render('index', {
          title: 'ToDo App',
          todos: todos,
          isAuth: isAuth,
        });
      })
      .catch(function (err) {
        console.error(err);
        res.render('index', {
          title: 'ToDo App',
          isAuth: isAuth,
          errorMessage: [err.sqlMessage],
        });
      });
  } else {
    res.render('index', {
      title: 'ToDo App',
      isAuth: isAuth,
    });
  }
});

router.post('/', function (req, res, next) {
  const isAuth = req.isAuthenticated();
  const userId = req.user.id;
  const todo = req.body.add;
  const deadline = req.body.deadline; // Ensure deadline is captured
  knex("tasks")
    .insert({user_id: userId, content: todo, deadline: deadline})
    .then(function () {
      res.redirect('/')
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: isAuth,
        errorMessage: [err.sqlMessage],
      });
    });
});

// New route to handle task completion
router.post('/complete/:id', function (req, res, next) {
  const taskId = req.params.id;
  knex("tasks")
    .where({ id: taskId })
    .del()
    .then(function () {
      res.redirect('/');
    })
    .catch(function (err) {
      console.error(err);
      res.render('index', {
        title: 'ToDo App',
        isAuth: req.isAuthenticated(),
        errorMessage: [err.sqlMessage],
      });
    });
});

router.use('/signup', require('./signup'));
router.use('/signin', require('./signin'));
router.use('/logout', require('./logout'));

module.exports = router;
