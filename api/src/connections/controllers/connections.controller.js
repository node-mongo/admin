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
    if (!(port && host && username && pasword)) {
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