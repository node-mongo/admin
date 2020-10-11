/**
 * Define the API routes for our User service
 */

/* Load the required controller */
const UserController = require('./controllers/user.controller');

/* Load the setup check*/
const VerifySetup = require('../app/middleware/verify.setup.middleware');

/* Load the basic auth middleware */
const AuthValidationMiddleware = require('../app/middleware/auth.validation.middleware');

/* User GET routes */
exports.routesConfig = (app) => {
   app.get('/api/users/:id', [
       VerifySetup.checkSetup,
       AuthValidationMiddleware.validateSession,
       UserController.findUser
   ]);
};
