const ilogger = require('..');
const expect = require('chai').expect;
const path = require('path');
const fs = require('fs');


const TEMP_FILE = path.join(__dirname, "temp.log");
const MILLIS = 1451649600000;

ilogger.setMillis(MILLIS);
ilogger.setConsoleOutput(false);
ilogger.setFileOutput(true);
ilogger.setFilename(TEMP_FILE);

describe("test logging with .info to a file", () => {
    const logger = new ilogger();
    before(done => {
        logger.info("test  1 ?");
        //logging to file is async to he have to wait a bit
        setTimeout(done, 100);
    });
    it("should have logged it correcly", () => {
        const text = fs.readFileSync(TEMP_FILE).toString();
        expect(text).to.equal("2016-01-01 12:00:00,000 INFO  [main] test  1 ?\n");
    });
    after(() => {
        fs.unlinkSync(TEMP_FILE);
    });
});

describe("test logging with .warn to a file", () => {
    const logger = new ilogger();
    before(done => {
        logger.warn("test  1 ?");
        //logging to file is async to he have to wait a bit
        setTimeout(done, 100);
    });
    it("should have logged it correcly", () => {
        const text = fs.readFileSync(TEMP_FILE).toString();
        expect(text).to.equal("2016-01-01 12:00:00,000 \u001b[33mWARN \u001b[39m [main] test  1 ?\n");
    });
    after(() => {
        fs.unlinkSync(TEMP_FILE);
    });
});

describe("test logging with .error to a file", () => {
    const logger = new ilogger();
    before(done => {
        logger.error("test  1 ?");
        //logging to file is async to he have to wait a bit
        setTimeout(done, 100);
    });
    it("should have logged it correcly", () => {
        const text = fs.readFileSync(TEMP_FILE).toString();
        expect(text).to.contain("2016-01-01 12:00:00,000 \u001b[31mERROR\u001b[39m [main] test  1 ?\n    at Context.");
    });
    after(() => {
        fs.unlinkSync(TEMP_FILE);
    });
});

describe("test logging with .error to a file without stack traves", () => {
    const logger = new ilogger();
    before(done => {
        ilogger.setStackTraceEnabled(false);
        logger.error("test  1 ?");
        //logging to file is async to he have to wait a bit
        setTimeout(done, 100);
    });
    it("should have logged it correcly", () => {
        const text = fs.readFileSync(TEMP_FILE).toString();
        expect(text).to.equal("2016-01-01 12:00:00,000 \u001b[31mERROR\u001b[39m [main] test  1 ?\n");
    });
    after(() => {
        fs.unlinkSync(TEMP_FILE);
        ilogger.setStackTraceEnabled(true);
    });
});

describe("test logging with .fatal to a file", () => {
    const logger = new ilogger();
    before(done => {
        logger.fatal("test  1 ?");
        //logging to file is async to he have to wait a bit
        setTimeout(done, 100);
    });
    it("should have logged it correcly", () => {
        const text = fs.readFileSync(TEMP_FILE).toString();
        expect(text).to.contain("2016-01-01 12:00:00,000 \u001b[31mFATAL\u001b[39m [main] test  1 ?\n    at Context.");
    });
    after(() => {
        fs.unlinkSync(TEMP_FILE);
    });
});

describe("test logging with .fatal to a file without stack traves", () => {
    const logger = new ilogger();
    before(done => {
        ilogger.setStackTraceEnabled(false);
        logger.fatal("test  1 ?");
        //logging to file is async to he have to wait a bit
        setTimeout(done, 100);
    });
    it("should have logged it correcly", () => {
        const text = fs.readFileSync(TEMP_FILE).toString();
        expect(text).to.equal("2016-01-01 12:00:00,000 \u001b[31mFATAL\u001b[39m [main] test  1 ?\n");
    });
    after(() => {
        fs.unlinkSync(TEMP_FILE);
        ilogger.setStackTraceEnabled(true);
    });
});