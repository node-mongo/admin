/**
 * Define the API routes for our Emailing service
 */

/* Load the required controller */
const DatabasesController = require('./controllers/databases.controller');

//* Load the basic auth middleware */
const Auth = require('../app/middleware/auth');

/* Databases routes */
const routesConfig = (app) => {
   app.get('/api/databases', [
       Auth.validateSession,
       DatabasesController.get
   ]);
};

module.exports = {
    routesConfig
};