/**
 * Define the API routes for our Auth services
 */

/* Load the required controller */
const AuthController = require('./controllers/auth.controller');

/* Authorization POST routes */
const routesConfig = (app) => {
    app.post('/api/auth/login', [
        AuthController.login
    ]);

    app.post('/api/auth/logout', [
        AuthController.logout
    ]);

    app.post('/api/auth/refresh', [
        AuthController.refresh
    ]);
};

module.exports = {
    routesConfig
};