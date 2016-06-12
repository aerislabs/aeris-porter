'use strict';

const express = require('express');
const app = module.exports = express();

app.get('/__health', require('./controllers/health'));

// Start the app
const port = process.env.PORT || 4400;
module.exports.listen = app.listen(port);
