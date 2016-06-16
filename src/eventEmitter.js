(function() {
    "use strict";
    const util = require('util');
    const events = require('events');

    var EventEmitter = function() {
        events.call(this);
    };

    util.inherits(EventEmitter, events);

    module.exports = new EventEmitter();
})();