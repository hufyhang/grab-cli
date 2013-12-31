#!/usr/local/bin/node

var grabber = require('../lib/grab.js'),
    argv = require('optimist').argv;

grabber.grab(argv, function(data) {
    console.log(data);
});

