/**
 * Define the API routes for our Emailing service
 */

/* Load the required controller */
const ServersController = require('./controllers/servers.controller');

//* Load the basic auth middleware */
const Auth = require('../app/middleware/auth');

/* Servers routes */
const routesConfig = (app) => {
   app.get('/api/servers', [
       Auth.validateSession,
       ServersController.get
   ]);
};

module.exports = {
    routesConfig
};