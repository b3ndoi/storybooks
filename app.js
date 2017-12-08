const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
require('./config/passport')(passport);

const routes = require('./routes/web');
const app = express();

routes(app);

module.exports = app;