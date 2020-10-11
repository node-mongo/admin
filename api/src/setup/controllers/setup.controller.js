/**
 * Defines the controller for handling the emailing API route
 */

// set a timestamp in seconds
const timeStamp = Math.floor(Date.now() / 1000);

// Require the logging service
const LogService = require('../../app/services/logging.service');

/* Requires the sqlite adapter
 * This is a one-off usage only required for the initial setup
 */
const db = require('../../app/services/sqlite.service').db;

const hash = require('pbkdf2-password')();

/* Define the send method */
exports.setup = (req, res) => {
    let country = req.body.country;
    let name    = req.body.name;
    let user    = req.body.user;
    let email   = req.body.email;
    let pwd     = req.body.password;

    // ensure that all elements exist !! basic test only !!
    if (!(name && user && email && pwd)) {
        return res.status(400).send({errors: ['Required parameters missing']});
    }

    let salted = null;
    let hashed = null;

    hash({ password: pwd }, (err, pass, salt, hash ) => {
       if (err) { throw err; }
       // store the salt and hash
        salted = salt;
        hashed = hash
    });

    let sql  = `INSERT INTO users
        (name, user, email, salt, hash, control_user, admin_user, country, active)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.run( sql, [name, user, email, salted, hashed, 1, 1, country, 1], (err) => {
        if (err) {
            // log this
            let logData = {
                "type": "setup",
                "action": "create",
                "message": err.message,
                "timeStamp": timeStamp
            };
            LogService.saveLog(logData);

            // return an error response
        //    return res.status(400).json({ message: 'create control user failed' });
        }
    });

    return res.json( { success: true, message: "success"} );
};