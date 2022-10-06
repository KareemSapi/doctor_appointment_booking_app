/**
 * @title
 * Application logger: 
 * 
 * 
 * 
 * 
 * @lastEdit
 * Sept 14 2022, Kareem Sapi
 */

const appRoot = require('app-root-path');
const winston = require('winston');
const fs = require('fs');
const config = require('config');

const fileLogger = config.get('logger.file');
const consoleLogger = config.get('logger.console');

const logDir = `${appRoot}/${process.env.logDir || fileLogger.logDir}`;
const logFileUrl = `${logDir}/${process.env.logFile || fileLogger.logFile}`;

winston.addColors(winston.config.npm.colors);

if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir);
}

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({
            level: process.env.level || fileLogger.level,
            //level: fileLogger.level,
            filename: logFileUrl,
            handleExceptions: true,
            json: true,
            //maxsize: fileLogger.maxsize,
            //maxFiles: fileLogger.maxFiles,
            maxsize: process.env.maxsize || fileLogger.maxsize,
            maxFiles: process.env.maxFiles || fileLogger.maxFiles,
            colorize: false,
            timestamp: () => (new Date()).toLocaleString('en-US', { hour12: false }),
        }),
        new winston.transports.Console({
            //level: consoleLogger.level,
            level: process.env.level || consoleLogger.level,
            handleExceptions: true,
            json: false,
            colorize: true,
            timestamp: () => (new Date()).toLocaleString('en-US', { hour12: false }),
        }),
    ],
    exitOnError: false,
});

module.exports = logger;