/**
 * Define the API routes for our Setup service
 */

/* Load the required controller */
const SetupController = require('./controllers/setup.controller');

/* Load the setup check*/
const VerifySetup = require('../app/middleware/verifySetup');

/* Setup routes */
const routesConfig = (app) => {
    // POST routes
    app.post('/api/setup', [
        SetupController.setup
    ]);

    app.get('/api/setup', [
        VerifySetup.checkSetup,
       SetupController.check
    ]);
};

module.exports = {
    routesConfig
};