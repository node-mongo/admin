/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      connections.controller.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   connections.controller.js
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
 * Defines the controller for handling the emailing API route
 */

// set a timestamp in seconds
const timeStamp = Math.floor(Date.now() / 1000);

// Require the logging service
const LogService = require('../../app/services/logging.service');

/* Use the database service for queries */
const Database = require('../../app/services/database.service');

exports.read = (req, res) => {

};

/* Define the send method */
exports.create = (req, res) => {
    let port     = req.body.port;
    let host     = req.body.host;
    let username = req.body.username;
    let password = req.body.password;

    // ensure that all elements exist !! basic test only !!
    if (!(port && host && username && password)) {
        return res.status(400).send({errors: ['Required parameters missing']});
    }

    if (2 === 2) {
        // create connection
    } else {
        // log this
        let logData = {
            "type": "connection",
            "action": "create",
            "message": "failed to create connection record",
            "timeStamp": timeStamp
        };
        LogService.saveLog(logData);

        // return an error response
        return res.status(400).send({errors: ['Create error']});
    }
};