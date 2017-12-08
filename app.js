const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/web');
const app = express();

routes(app);

module.exports = app;