

const express = require('express');
const mongoose = require('mongoose');
const { createUser, loginUser, getUser, updateUser, deleteUser, getallUsers, getallTasks } = require('../controllers/Usercontroller.js');


const userRoute = express.Router();

userRoute.get('/', getallUsers);

userRoute.post('/login', loginUser);


userRoute.get('/:id', getUser);

userRoute.post('/', createUser);

userRoute.put('/:id', updateUser);

userRoute.delete('/:id', deleteUser);

userRoute.get('/:id/tasks', getallTasks);

module.exports = userRoute;