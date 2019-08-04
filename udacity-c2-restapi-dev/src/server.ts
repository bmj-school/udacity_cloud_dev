import express from 'express';
import { sequelize } from './sequelize';
const listEndpoints = require('express-list-endpoints')
import { IndexRouter } from './controllers/v0/index.router';
import bodyParser from 'body-parser';
import { V0MODELS } from './controllers/v0/model.index';

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

// Express route logger:
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
})
/***********************************************/


loggers.add('my-logger', logger)
logger.debug('Debugging info');
logger.info('Started logger');


(async () => {
  logger.info('Adding sequelize models');
  await sequelize.addModels(V0MODELS);
  logger.info('Syncing sequelize models');
  await sequelize.sync();


  const app = express();
  const port = process.env.PORT || 8080; // default port to listen

  app.use(expressLogger);


  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });
  logger.info('Route added: /api/v0');

  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get( "/", async ( req, res ) => {
    res.send( "/api/v0/" );
  } );

  // console.log(listEndpoints(app))
  logger.verbose('Available Routes:');
  listEndpoints(app).forEach(element => {
    // console.log(element);
    let thisString : String = `${element.path} ${element.methods}`
    logger.verbose(`\t${thisString}`);
    // console.log(thisString);

    // logger.notice(element.path);
  });

  // Start the Server
  app.listen( port, () => {
      // console.log( `server running http://localhost:${ port }` );
      // console.log( `press CTRL+C to stop server` );
      logger.info( `server running http://localhost:${ port }` );
      logger.info( `press CTRL+C to stop server` );
  } );
})();