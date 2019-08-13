const Hapi = require('hapi');

import { sequelize } from './sequelize';


class TheServer {

    constructor() {
		this.server = Hapi.Server({
            port: 8000,
            host: 'localhost'
        });

        await sequelize.addModels(V0MODELS);
        logger.info('Added models');
        await sequelize.sync();
        logger.info('Synced models')

        this.initRoutes();
        this.start();
    }

	initRoutes() {
        require("./routes/TestRoutes.js")(this.server); // For learning Hapi!
        // require("./routes/StarRoutes.js")(this.server); // According to specifications
        // require("./BlockController.js")(this.server); // For project 3
	}
    
    async start() {
        await this.server.start();
        console.log(`Server running at: ${this.server.info.uri}`);
    }

}

new TheServer();