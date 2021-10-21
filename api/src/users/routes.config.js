/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      routes.config.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   routes.config.js
 * @link         https://github.com/node-mongo/admin  Node MongoDB Admin
 * @copyright    Copyright (c) 2021. Gilbert Rehling of MMFAW. All rights reserved. (www.mfmaw.com)
 * @licence      NodeMongoAdmin is an Open Source Project released under the GNU GPLv3 license model.
 * @author       Gilbert Rehling:  gilbert@phpmongoadmin.com (www.gilbert-rehling.com)
 *  node-mongo-admin - License conditions:
 *  Contributions to our suggestion box are welcome: https://phpmongotools.com/suggestions
 *  This web application is available as Free Software and has no implied warranty or guarantee of usability.
 *  See licence.txt for the complete licensing outline.
 *  See https://www.gnu.org/licenses/license-list.html for information on GNU General Public License v3.0
 *  See COPYRIGHT.js for copyright notices and further details.
 */

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