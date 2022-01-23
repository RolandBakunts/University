const express = require('express');
const bodyParser = require('body-parser');
const router = require('./api');
const mongoose = require('mongoose');
const ErrorHandler = require ("./middleware/ErrorHandler");

const {dbUrl} = require("./dbConfig");


let app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(router);
app.use(ErrorHandler)

mongoose.connect("mongodb+srv://Roland:Vozni123@db.kvves.mongodb.net/alarm?retryWrites=true&w=majority");

const port = process.env.PORT || 3456

app.listen(port , () => console.log(`listening on port ${port}`))

module.exports = app;
