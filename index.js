'use strict';
const ilogger = require('./src/ilogger');
const Level = require('./src/Level');
const EventEmitter = require('./src/EventEmitter');
module.exports = ilogger;
module.exports.Level = Level;
module.exports.EventEmitter = EventEmitter;