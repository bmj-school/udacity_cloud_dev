import express from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles} from './util/util';
import { logger, expressLogger } from './loggerConfig'

var path = require('path');

(async () => {
  logger.debug('Start logging');
  
  // Init the Express application
  const app = express();

  // LOGGING
  app.use(expressLogger);

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  app.get("/filteredimage", async ( req, res ) => {
    logger.debug(`Query: ${JSON.stringify(req.query)}`);

    //    1. validate the image_url query
    const imageURL = req.query.image_url;
    if (!imageURL) {
      return res.status(400).send({ message: 'parameter image_url is required' });
    }

    //    2. call filterImageFromURL(image_url) to filter the image
    let img_path = await filterImageFromURL(imageURL);
    logger.info(`Image is saved to ${img_path}`);
    
    //    3. send the resulting file in the response
    res.sendFile(img_path)

    //    4. deletes any files on the server on finish of the response
    res.on('finish', function() {
      try {
        deleteLocalFiles([img_path]);
      } catch(e) {
        logger.debug('Error deleting file!');
      }
    });
    
    // RETURNS
    //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]
  })

  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();