const express = require('express');
const config = require('./config/config');
const auth = require('./auth/authRouter');
var app = express();

require('mongoose').connect(config.db.url);
require('../Server/middleware/middleware')(app);

app.use('/auth',auth);

app.use(function(err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).send('Invalid token');
      return;
    }
  
    console.log(err.stack);
    res.status(500).send('Oops');
  });

module.exports = app;