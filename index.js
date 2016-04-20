'use strict';
var ilogger = require('./src/ilogger');
var Level = require('./src/Level');
var EventEmitter = require('./src/EventEmitter');
module.exports = ilogger;
module.exports.Level = Level;
module.exports.EventEmitter = require('./src/EventEmitter');