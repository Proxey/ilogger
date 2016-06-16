![travis](https://travis-ci.org/Proxey/ilogger.svg?branch=master) ![npm version](https://img.shields.io/npm/v/proxey-ilogger.svg?maxAge=2592000)

# proxey-ilogger
a logging library for node.js

## Getting started
`$ npm install proxey-ilogger`

```javascript
const ilogger = require('proxey-ilogger');
```

##API

###Create a new logger instance
You can get a new logger instance by one of the three following ways:

```javascript
const ilogger = require('proxey-ilogger');
const logger = new ilogger();
```

```javascript
const ilogger = require('proxey-ilogger');
const logger = ilogger();
```


```javascript
const ilogger = require('proxey-ilogger');
const logger = ilogger.getLogger();
```

You can also pass a string to each of these 3 methods. This string will then appear in each log line.
This comes in handy if you have more than one logging instances in multiple files.

```javascript
const ilogger = require('proxey-ilogger');
const logger = new ilogger('Service XY');
```

###Configuration

####ilogger.setConsoleOutput(Boolean) default: true
Enable or disable logging to the console. This affects all existing and future logger instances.

####ilogger.setFileOutput(Boolean) default: false
Enable or disable logging to a file. you also have to set the filename for this to work. This affects all existing and future logger instances.

####ilogger.setFilename(String) default: null
Sets the filename for logging to a file. You also have to enable file logging. This affects all existing and future logger instances.

####ilogger.setLevel(Level) default: Level.INFO
Sets the log level. Must be an instance of ilogger.Level. The default-level is INFO. This affects all existing and future logger instances.

####ilogger.setMillis(Number) default: null
Set the timestamp which used for creating the datetime in each log-line. If it's set to null it will use the current datetime. This is probably only useful for tests.

available levels:
```javascript
const ilogger = require('ilogger');
ilogger.setLevel(ilogger.Level.ALL)
ilogger.setLevel(ilogger.Level.DEBUG)
ilogger.setLevel(ilogger.Level.INFO)
ilogger.setLevel(ilogger.Level.WARN)
ilogger.setLevel(ilogger.Level.ERROR)
ilogger.setLevel(ilogger.Level.FATAL)
```

##Examples

###Two files with each one logging instance
To keep track of where your log lines come from, you can pass e.g the name of a file to the constructor of the logging instance.

File1:
```javascript
const ilogger = require('ilogger');
const logger = new ilogger('File1');
logger.info("this is file1");
```


File2:
```javascript
const ilogger = require('ilogger');
const logger = new ilogger('File2');
logger.info("this is not file1");
```

If you run your application, ilogger will output something like this:
```
2016-06-15 22:07:01,640 INFO  [File1] this is file1
2016-06-15 22:07:01,649 INFO  [File2] this is not file1
```