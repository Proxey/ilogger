var chalk = require('chalk');

var Level = function(str, int, printStackTraces, colorModifier) {
    this.str = str;
    this.int = int;
    this.printStackTraces = printStackTraces;
    this.colorModifier = colorModifier;
};
Level.prototype.constructor = Level;

module.exports = {
    Level: Level,
    ALL:   new Level("ALL  ", 500,  false, null),
    DEBUG: new Level("DEBUG", 1000, false, null),
    INFO:  new Level("INFO ", 1500, false, null),
    WARN:  new Level("WARN ", 2000, false, chalk.yellow),
    ERROR: new Level("ERROR", 4000, true , chalk.red),
    FATAL: new Level("FATAL", 5000, true , chalk.red)
};