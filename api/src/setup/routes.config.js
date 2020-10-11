/**
 * Define the API routes for our Setup service
 */

/* Load the required controller */
const SetupController = require('./controllers/setup.controller');

/* Setup routes */
exports.routesConfig = (app) => {
    // POST routes
    app.post('/api/setup', [
        SetupController.setup
    ]);
};
