/**
 * Define the API routes for our User service
 */

/* Load the required controller */
const UserController = require('./controllers/user.controller');

/* Load the basic auth middleware */
const Auth = require('../app/middleware/auth');

/* Uses routes */
const routesConfig = (app) => {
    app.get('/api/users/location', [
        Auth.validateSession,
        UserController.location
    ]);

    app.get('/api/users/:id', [
       Auth.validateSession,
       UserController.findUser
    ]);
};

module.exports = {
    routesConfig
};