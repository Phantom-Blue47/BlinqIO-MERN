const express = require('express');

const taskRoute = express.Router();
const { createTask, getTask, updateTask, deleteTask, getallTasks } = require('../controllers/Taskcontroller.js');

taskRoute.get('/', getallTasks);

taskRoute.get('/:id', getTask);

taskRoute.post('/', createTask);

taskRoute.put('/:id', updateTask);

taskRoute.delete('/:id', deleteTask);

module.exports = taskRoute;