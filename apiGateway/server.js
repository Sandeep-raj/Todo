const express = require('express');
const controller = require('./controller');
const config = require('./config/config');
const app = express();
var proxy = require('express-http-proxy');

require('./middleware/middleware')(app);
app.use(controller.authenticate);

app.use('/api', function(req,res,next){
    next();
},proxy(`${config.googleService}:3000`));

module.exports = app;