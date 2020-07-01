'use strict';
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
var bodyParser = require('body-parser');

const app = express();

require('log-timestamp')(function () {
  return '[' + new Date().toISOString() + '] %s';
});

const apiRoutes = require('./routes/api');
const rootRoutes = require('./routes/root');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use('/api/v1', apiRoutes);
app.use(rootRoutes);

module.exports = app;
