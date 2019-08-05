import express from 'express';
import { sequelize } from './sequelize';

import { IndexRouter } from './controllers/v0/index.router';

import bodyParser from 'body-parser';

import { V0MODELS } from './controllers/v0/model.index';

const listEndpoints = require('express-list-endpoints')
import { logger, expressLogger } from './loggerConfig'

(async () => {
  await sequelize.addModels(V0MODELS);
  await sequelize.sync();

  const app = express();
  app.use(expressLogger);
  const port = process.env.PORT_FEED_SERVICE
  
  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  app.use('/api/v0/', IndexRouter)

  // Root URI call
  app.get( "/", async ( req, res ) => {
    res.send( "/api/v0/" );
  } );

  // List the endpoints for debugging purposes
  logger.verbose('Available Routes:');
  listEndpoints(app).forEach((element: { path: any; methods: any; }) => {
    let thisString : String = `${element.path} ${element.methods}`
    logger.verbose(`\t${thisString}`);
  });
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();