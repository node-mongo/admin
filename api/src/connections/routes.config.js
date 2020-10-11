/**
 * Define the API routes for our Emailing service
 */

/* Load the required controller */
const ConnectionsController = require('./controllers/connections.controller');

/* Load the setup check*/
const VerifySetup = require('../app/middleware/verify.setup.middleware');

/* Load the basic auth middleware */
const AuthValidationMiddleware = require('../app/middleware/auth.validation.middleware');

/* Connections routes */
exports.routesConfig = (app) => {
   app.get('/api/connections', [
       VerifySetup.checkSetup,
       AuthValidationMiddleware.validateJwt,
       ConnectionsController.read
   ]);
};
