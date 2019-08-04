/********* Logging - Master configuration *********/
const { createLogger, format, transports, loggers } = require('winston');
var winston = require('winston'),
    expressWinston = require('express-winston');

// Base logger
const logger = createLogger({
    level: 'debug',
    // format: format.simple(),
    // format: format.combine(format.colorize(), format.simple()),
    format: format.combine(
        format.colorize(),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
    ),
    // You can also comment out the line above and uncomment the line below for JSON format
    // format: format.json(),
    transports: [new transports.Console()]
});

const expressLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        // winston.format.json()
        winston.format.simple()
    ),
    // meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    meta: false, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    // expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    // colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    colorize: true, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
    ignoreRoute: function (req, res) { return false; } // optional: allows to skip some log messages based on request and/or response
});

export { logger, expressLogger };