const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    //title
    title: {
        type: String,
        required: true
    },
    //description
    description: {
        type: String,
        required: true
    },
    //date
    date: {
        type: Date,
        required: true
    },
    //status
    status: {
        type: String,
        required: true
    },
    //userid
    userId: {
        type: String,
        required: true
    }
    
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
