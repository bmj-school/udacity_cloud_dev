// Libraries
import express, { Router, Request, Response } from 'express';
import bodyParser from 'body-parser';

// Data 
import { Car, cars as cars_list } from './cars';


(async () => {
  let cars:Car[]  = cars_list;

  //Create an express applicaiton
  const app = express(); 
  //default port to listen
  const port = 8082; 
  
  //use middleware so post bodies 
  //are accessable as req.body.{{variable}}
  app.use(bodyParser.json()); 

  // HANDLERS
  // Root URI call
  let getRoot = ( req: Request, res: Response ) => {
    console.log("Get root");
    
    res.status(200).send("Welcome to the Cloud!");
  } 
  
  // Get a greeting to a specific person 
  // to demonstrate routing parameters
  // > try it {{host}}/persons/:the_name
  let getPersonsName = ( req: Request, res: Response ) => {
    console.log("getPersonsName");
    
    let { name } = req.params;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  }

  // Get a greeting to a specific person to demonstrate req.query
  // > try it {{host}}/persons?name=the_name
  let getPersonsNameQuery = ( req: Request, res: Response ) => {
    console.log("getPersonsNameQuery");
    let { name } = req.query;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  }


  // Post a greeting to a specific person
  // to demonstrate req.body
  // > try it by posting {"name": "the_name" } as 
  // an application/json body to {{host}}/persons
  let getPersonsNameBody = async ( req: Request, res: Response ) => {
    console.log("getPersonsNameBody");
    console.log(req.body);
    
    const { name } = req.body;

    if ( !name ) {
      return res.status(400)
                .send(`name is required`);
    }

    return res.status(200)
              .send(`Welcome to the Cloud, ${name}!`);
  }

  // ROUTES
  app.get( "/", getRoot);
  app.get( "/persons/:name", getPersonsName);
  app.get( "/persons/",  getPersonsNameQuery);
  app.post( "/persons", getPersonsNameBody);

  // @TODO Add an endpoint to GET a list of cars
  // it should be filterable by make with a query paramater

  // @TODO Add an endpoint to get a specific car
  // it should require id
  // it should fail gracefully if no matching car is found

  /// @TODO Add an endpoint to post a new car to our list
  // it should require id, type, model, and cost

  // Start the Server
  app.listen( port, () => {
      console.log( `\n \n server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();