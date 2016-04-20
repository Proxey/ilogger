"use strict";
const util = require('util');
const events = require('events');

var EventEmitter = function() {

};

util.inherits(EventEmitter, events);

module.exports = new EventEmitter();