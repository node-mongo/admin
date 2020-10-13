/**
 * Define the API routes for our User service
 */

/* Load the required controller */
const UserController = require('./controllers/user.controller');

/* Load the setup check*/
const VerifySetup = require('../app/middleware/verifySetup');

/* Load the basic auth middleware */
const Auth = require('../app/middleware/auth');

/* User GET routes */
exports.routesConfig = (app) => {
   app.get('/api/users/:id', [
       VerifySetup.checkSetup,
       Auth.validateSession,
       UserController.findUser
   ]);
};
