// For learning HAPI!
// Testing and demo endpoints start with `hello`
controller = require('../controllers/TestController')

/**
 * Controller Definition 
 */
class TestRoutes {
    /**
     * Constructor 
     * @param {*} server 
     */
    constructor(server) {
        this.server = server;
        this.blocks = [];

        // this.server.route({ method:'GET',   path:'/api/hello',          handler:controller.helloGet }) 

        // this.server.route({ method:'POST',  path:'/api/hello',          handler:controller.helloPost });

        // this.server.route({ method:'GET',   path:'/api/greet/{user}',   handler:controller.helloGreetUser });

        // this.server.route({ method:'GET',   path:'/api/number/{index}', handler:controller.helloNumberIndex });

        this.server.route([
            { method: 'GET', path: '/api/hello', handler: controller.helloGet },
            { method: 'POST', path: '/api/hello', handler: controller.helloPost },
            { method: 'GET', path: '/api/greet/{user}', handler: controller.helloGreetUser },
            { method: 'GET', path: '/api/number/{index}', handler: controller.helloNumberIndex },
        ])
    }
}

module.exports = (server) => { return new TestRoutes(server); }