/********* Logging - Master configuration *********/
const { createLogger, format, transports, loggers } = require('winston');
var winston = require('winston');

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
        format.printf((info: { timestamp: any; level: any; message: any; }) => `\t${info.timestamp} ${info.level}: ${info.message}`)
    ),
    // You can also comment out the line above and uncomment the line below for JSON format
    // format: format.json(),
    transports: [new transports.Console()]
});

export { logger };