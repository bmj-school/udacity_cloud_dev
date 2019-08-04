import express from 'express';
import { sequelize } from './sequelize';
const listEndpoints = require('express-list-endpoints')

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';

import { V0MODELS } from './controllers/v0/model.index';
// import { Lightsail } from 'aws-sdk';

// Logging - Master configuration
const { createLogger, format, transports, loggers } = require('winston');

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