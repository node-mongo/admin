/**
 * Define the API routes for our Emailing service
 */

/* Load the required controller */
const ServerController = require('./controllers/server.controller');

//* Load the basic auth middleware */
const Auth = require('../app/middleware/auth');

/* Server routes */
const routesConfig = (app) => {
   app.get('/api/servers', [
       Auth.validateSession,
       ServerController.get
   ]);
};

module.exports = {
    routesConfig
};