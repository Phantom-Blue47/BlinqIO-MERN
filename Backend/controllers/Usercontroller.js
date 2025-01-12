const User = require("../models/User");
const mongoose = require('mongoose');
const Task = require("../models/Task");

const getallUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
        return users;
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });

    }
}

const loginUser = async (req, res) => {
    console.log(req.body);
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            return res.status(400).json({ message: 'Username and password are required' });
        }

        // Find the user in the database
        const user = await User.findOne({ username });

        // If the user doesn't exist
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (user.password !== password) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        // If login is successful
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        // Handle server errors
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }

}


const getUser = async (req, res) => {
    try {
        const id = req.params.id;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ message: "User not found" });
        }
        const user = await User.findById(id);
        res.status(200).json(user);
        return user;
    } catch (error) {
        console.log(error);
        res.status(404).json({ message: error.message });
    }
};

const createUser = async (req, res) => {
    const user = req.body;
    const { username, password } = user;
    //const newUser = new User(user);
    try {
        const newUser = await User.create({
            username,
            password,
            taskIds: []
        });
        res.status(201).json(newUser);
        console.log('newUser ', newUser);
    } catch (error) {
        console.log(error);
        res.status(409).json({ message: error.message });
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User not found" });
    }
    const user = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });
        res.status(200).json(updatedUser);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        await User.findByIdAndDelete(id);
        res.status(200).json("User deleted successfully");
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const getallTasks = async (req, res) => {
    console.log("getallTasks");
    console.log(req.params.id);
    ///:id/tasks
    try{

        const userId = req.params.id;
        //return all the tasks from the user entry 
        const user = await User.findById(userId);
        const taskIds = user.taskIds;
        console.log(user);
        const tasks = await Task.find({ _id: { $in: taskIds } });
        res.status(200).json(tasks);
    }
    catch(error){
        console.log(error);
        res.status(404).json({ message: error.message });
    }
}


module.exports = { getallUsers, loginUser, createUser, getUser, updateUser, deleteUser, getallTasks };
