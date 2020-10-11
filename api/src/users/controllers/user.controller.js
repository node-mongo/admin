/**
 * Defines the controller for handling the emailing API route
 */

// set a timestamp in seconds
const timeStamp = Math.floor(Date.now() / 1000);

// Require the logging service
const LogService = require('../../app/services/logging.service');

/* Use the database service for queries */
const Database = require('../../app/services/database.service');

/* Define the send method */
exports.findUser = (req, res) => {
    let id  = req.params.id;
    // with query params ?id=1
    // let id = req.query.id;

    // ensure that all elements exist !! basic test only !!
    if (!(id)) {
        return res.status(400).send({errors: ['Required parameters missing']});
    }

    // check that the sender's domain is authorized
    if (id) {
        /* try SendGrid email service first !! */


    } else {
        // log this
        let logData = {
            "type": "email",
            "action": "auth",
            "message": "sender domain check failed",
            "timeStamp": timeStamp
        };
        LogService.saveLog(logData);

        // return an error response
        return res.status(400).send({errors: ['Sender domain invalid']});
    }
};