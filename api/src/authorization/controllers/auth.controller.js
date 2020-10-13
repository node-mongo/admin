/**
 * Defines the controller for handling the emailing API route
 */

// Require the logging service
const { LogsService } = require('../../app/services');

/* Define the login method */
const login = (req, res) => {
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
            "message": "authentication failed"
        };
        LogsService.save(logData);

        // return an error response
        return res.status(403).send({errors: ['Invalid credentials']});
    }
};

/* Defined the JWT refresh method */
const refresh = (req, res) => {
    console.log("refresh() called");
};

module.exports = {
    login,
    refresh
}