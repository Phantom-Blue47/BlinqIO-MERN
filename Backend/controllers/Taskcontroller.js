const express = require('express');
const User = require('../models/User');
const { getUser, updateUser } = require('../controllers/Usercontroller');
const Task = require('../models/Task');

const getallTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
        return tasks;
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


const createTask = async (req, res) => {
    const task = req.body;
    const { title, description, date, userId } = task;
    try {
        const newTask = await Task.create({
            title,
            description,
            date,
            status: "Pending",
            userId
        });
        addTask(userId, newTask._id);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(409).json({ message: error.message });
        console.log(error);
    }
}

const getTask = async (req, res) => {
    try {
        const id = req.params.id;
        const task
            = await Task.findById(id);
        res.status(200).json(task);
        return task;
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const task = req.body;
    try {
        const updatedTask = await Task.findByIdAndUpdate
            (id, task, { new: true });
        res.status(200).json(updatedTask);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        const { title,
            description,
            date,
            userId } = task;
        await Task.findByIdAndDelete(id);
        removeTask(userId, id);
        res.status(200).json("Task deleted successfully");
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const addTask = async (userid, taskid) => {
    try {
        const user = await User.findById(userid);
        const { username, password, taskIds } = user;
        taskIds.push(taskid);
        console.log(user);
        const updatedUser = await User.findByIdAndUpdate(userid, user, { new: true });
        return updatedUser;
    }
    catch (error) {
        console.log(error);
    }

}

const removeTask = async (userid, taskid) => {
    try {
        const user = await User.findById(userid);
        const { username, password, taskIds } = user;
        const index = taskIds.indexOf(taskid);
        taskIds.splice(index, 1);
        const updatedUser = await User.findByIdAndUpdate(userid, user, { new: true });
        return updatedUser;
    }
    catch (error) {
        console.log(error);
    }

}

module.exports = { createTask, getTask, updateTask, deleteTask, getallTasks };