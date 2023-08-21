const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
require('dotenv').config();
require('./DB/connection');

// Import aggregated router
const mainRouter = require('./Routes/index');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());
// app.use(bodyParser.text());

app.use('/uploads', express.static('uploads'));

// Set up main router
app.use('/api', mainRouter);

app.use(cors({
    origin: '*'
}));

module.exports = app;
