"use strict";
const moment = require('moment');
const fs = require('fs');
const EventEmitter = require('./EventEmitter');

const Level = require('./Level');

var output = {
    file: false,
    console: true
};

var config = {
    file: null,
    stackTraceEnabled: true,
    level: Level.INFO
};


var write = function (string) {
    if (output.console) {
        console.log(string);
    }
    if (output.file && config.file) {
        fs.appendFile(config.file, string + "\n");
    }
};

var realLog = function (level, message, source) {
    var payload = {
        type: level,
        message: message,
        source: source,
        process: process.title
    };
    var levelString;
    if(level.colorModifier) {
        levelString = level.colorModifier(level.str);
    } else {
        levelString = level.str;
    }
    var logString = moment().format("YYYY-MM-DD HH:mm:ss,SSS") + " " + levelString + " [" + source + "] " + message;
    write(logString);

    if (config.stackTraceEnabled && level.printStackTraces) {
        var stack = new Error().stack;
        //remove Error + 1st and 2nd line
        stack = stack.replace(new RegExp("Error\n[^\n]+\n[^\n]+\n"), "");
        payload.stackTrace = stack;
        write(stack);
    }
    EventEmitter.emit("$" + level.level, payload);
};

var isConfigLevelHigher = function(level) {
    return config.level.int > level.int;
};

function Logger(source) {
    if (!(this instanceof Logger)) {
        return new Logger(source);
    }
    if (source === undefined) {
        this.source = "main";
    } else {
        this.source = source;
    }
}

Logger.prototype.debug = function (message) {
    if(isConfigLevelHigher(Level.DEBUG)) return;
    realLog(Level.DEBUG, message, this.source);
};

Logger.prototype.info = function (message) {
    if(isConfigLevelHigher(Level.INFO)) return;
    realLog(Level.INFO, message, this.source);
};

Logger.prototype.warn = function (message) {
    if(isConfigLevelHigher(Level.WARN)) return;
    realLog(Level.WARN, message, this.source);
};

Logger.prototype.error = function (message) {
    if(isConfigLevelHigher(Level.ERROR)) return;
    realLog(Level.ERROR, message, this.source);
};

Logger.prototype.fatal = function (message) {
    if(isConfigLevelHigher(Level.FATAL)) return;
    realLog(Level.FATAL, message, this.source);
};

Logger.getLogger = function (source) {
    return new Logger(source);
};

Logger.setConsoleOutput = function (bool) {
    output.console = bool;
};

Logger.setFileOutput = function (bool) {
    output.file = bool;
};

Logger.setFilename = function (file) {
    config.file = file;
};

Logger.setLevel = function(level) {
    config.level = level;
};

Logger.setStackTraceEnabled = function (bool) {
    config.stackTraceEnabled = bool;
};

module.exports = Logger;