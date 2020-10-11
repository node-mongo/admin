/**
 * Defines the controller for handling the emailing API route
 */

// set a timestamp in seconds
const timeStamp = Math.floor(Date.now() / 1000);

// Require the logging service
const LogService = require('../../app/services/logging.service');

/* Define the login method */
exports.login = (req, res) => {
    console.log("login() called");
    let email    = req.body.email;
    let password = req.body.password;

    // ensure that all elements exist !! basic test only !!
    if (!(email && password)) {
        return res.status(400).send({errors: ['Required parameters missing']});
    }

    // check that the sender's domain is authorized
    // AuthService.login(email, password
    if (1 === 1) {
       /* GTG */

    } else {
        // log this
        let logData = {
            "type": "email",
            "action": "auth",
            "message": "authentication failed",
            "timeStamp": timeStamp
        };
        LogService.saveLog(logData);

        // return an error response
        return res.status(403).send({errors: ['Invalid credentials']});
    }
};

/* Defined the JWT refresh method */
exports.refresh = (req, res) => {
    console.log("refresh() called");
};