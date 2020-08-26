const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const gameRoute = require("./route/games");
const uploadRoute = require("./route/upload");
const uploadfile = require("./route/fileupload");
const userRoute = require("./route/user");
const challengeRoute = require("./route/challenge");
const resultRoute = require("./route/result");

const dotenv = require('dotenv').config();
const auth = require('./auth');
const cors = require('cors'); // handles request http
const app = express();

app.options('*', cors());
app.use(cors());
app.use(morgan('tiny')); // it acts as a logger in http request 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL, 
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
        useFindAndModify: false, 
        useCreateIndex: true
    })
.then((db) => {
console.log("Connected to Mongo database server.")
}, (err) => console.log(err));

app.use("/games", gameRoute);
app.use("/uploads", uploadRoute);
app.use('/uploadfile', uploadfile);
app.use("/user", userRoute);
app.use("/challenge", challengeRoute);
app.use("/result", resultRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.statusCode = 500;
    res.json({ message: err.message });
});

app.listen(process.env.PORT, () => {
    console.log(`app is running at localhost:${process.env.PORT}`)
});
