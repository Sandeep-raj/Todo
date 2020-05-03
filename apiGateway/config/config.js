const _ = require('lodash');

var config = {
    dev: 'development',
    prod: 'production',

    port: process.env.PORT || 5000,

    authService : process.env.AUTH_SERVICE || 'authservice',
    googleService : process.env.GOOGLE_SERVICE || 'googleservice'
}

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
config.env = process.env.NODE_ENV;

var envConfig;

try {
    envConfig = require('./' + config.env);
    envConfig = envConfig || {};
} catch (e) {
    envConfig = {};
}

module.exports = _.merge(config, envConfig);