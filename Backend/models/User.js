const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    //username
    username: {
        type: String,
        required: true,
        unique: true
    },
    //password
    password: {
        type: String,
        required: true
    },
    //list of taskids
    taskIds: {
        type: [String],
        default: []
    }
    
});

const User = mongoose.model('User', UserSchema);

module.exports = User;