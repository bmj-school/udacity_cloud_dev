var winston = require('./winston');
// const { createLogger, format, transports, loggers } = require('winston');

module.exports = function(req, res, next) {
    var logmsg = {
        'Request IP':req.ip,
        'Method':req.method,
        'URL':req.originalUrl,
        'statusCode':res.statusCode,
        'headers':req.headers,
        'Time':new Date(),
        'ErrorMessage':'Display Error If Any for this request' 
    };
    winston.log('info', logmsg);
    next();
}