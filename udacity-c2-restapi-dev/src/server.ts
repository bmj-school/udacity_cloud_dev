import express from 'express';
import { sequelize } from './sequelize';
const listEndpoints = require('express-list-endpoints')
import { IndexRouter } from './controllers/v0/index.router';
import bodyParser from 'body-parser';
import { V0MODELS } from './controllers/v0/model.index';


/********* Logging - Master configuration *********/
// Get the logger definitions
import { logger, expressLogger } from './loggerConfig'
// const logger = require('./../../loggerConfig').logger;
// Add the custom logger to winston
// const { loggers } = require('winston');
// loggers.add('my-logger', logger)
// logger.debug('Debugging info');
// logger.info('Started logger');
// require('./file1') // Log something in a file.
// require('./file2') // Log something in a nother file.
/***********************************************/

(async () => {
  logger.info('Adding sequelize models');
  await sequelize.addModels(V0MODELS);
  logger.info('Syncing sequelize models');
  await sequelize.sync();

  const app = express();
  // Logging: Add the expressLogger middleware!
  app.use(expressLogger);

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
    logger.info("Test logging here!")// LOGGING

  } );

  // List the endpoints for debugging purposes
  logger.verbose('Available Routes:');
  listEndpoints(app).forEach((element: { path: any; methods: any; }) => {
    let thisString : String = `${element.path} ${element.methods}`
    logger.verbose(`\t${thisString}`);
  });

  // Start the Server
  app.listen( port, () => {
      logger.info( `server running http://localhost:${ port }` );
      logger.info( `press CTRL+C to stop server` );
  } );
})();