(function() {
    "use strict";
    const chalk = require('chalk');

    var Level = function(level, str, int, printStackTraces, colorModifier) {
        this.level = level;
        this.str = str;
        this.int = int;
        this.printStackTraces = printStackTraces;
        this.colorModifier = colorModifier;
    };

    module.exports = {
        Level: Level,
        ALL:   new Level("all",   "ALL  ", 500,  false, null),
        DEBUG: new Level("debug", "DEBUG", 1000, false, null),
        INFO:  new Level("info",  "INFO ", 1500, false, null),
        WARN:  new Level("warn",  "WARN ", 2000, false, chalk.yellow),
        ERROR: new Level("error", "ERROR", 4000, true , chalk.red),
        FATAL: new Level("fatal", "FATAL", 5000, true , chalk.red)
    };
})();