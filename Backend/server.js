const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

require('dotenv').config();

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const app = express();

app.use(cors());
app.use(express.json());

// console.log(MONGO_URI);
const userRoute = require('./routes/Users');
const taskRoute = require('./routes/Tasks');

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("MongoDB connected");
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });

app.use((req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/user', userRoute);
app.use('/tasks', taskRoute);

