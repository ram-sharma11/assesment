const express = require('express');
require("./config/db")
const bodyParser = require("body-parser")

const app = express();

// Use parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//   router 
app.use('/', require('./routes/user'));


module.exports = app;