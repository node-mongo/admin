/**
 * Defines the controller for handling the emailing API route
 */

// Require the logging service
const { LogsService } = require('../../app/services');

/* Require the SqLite adapter .verbose() */
const sqlite3 = require('sqlite3').verbose();
const config  = require('../../app/config/env.config');
const db = new sqlite3.Database( config.dbPath , (err) => {
    if (err) {
        console.error(err.message);
    }
    else {
        console.log('App setup connected to the sqlite database:' + config.dbPath);
    }
});
const hash = require('pbkdf2-password')();

/**
 *
 * @param   {object}    req
 * @param   {object}    res
 * @returns {*}
 */
const setup = (req, res) => {
    let country = req.body.country;
    let name    = req.body.name;
    let user    = req.body.user;
    let email   = req.body.email;
    let pwd     = req.body.password;

    // ensure that all elements exist !! basic test only !!
    if (!(name && user && email && pwd)) {
        return res.status(400).json({errors: ['Required parameters missing']});
    }

    /**
     * Wrap the setup process inside the hash() methods promised results
     */
    hash({ password: pwd }, (err, pass, salt, hash ) => {
        if (err) {
           console.log(err);
           throw err;
        }
        console.log("pass: " + pass);
        console.log("salt: " + salt);
        console.log("hashed: " + hash);

        // set a timestamp in seconds
        const ts = Math.floor(Date.now() / 1000);
        let sql  = `INSERT INTO users
        (name, user, email, salt, hash, control_user, admin_user, country, active, timestamp)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        db.run( sql, [name, user, email, salt, hash, 1, 1, country, 1, ts], (err) => {
            if (err) {
                console.log("setup err: " + err);
                // log this
                let logData = {
                    "type": "setup",
                    "action": "create",
                    "message": err.message
                };
                LogsService.save(logData);

                // return an error response
                // return res.status(400).json({ message: 'create control user failed' });
            }
        });

        return res.json( { success: true, message: "success"} );
    });
};

/**
 *
 * @param   {Object}    req
 * @param   {Object}    res
 * @returns {*}
 */
const check = (req, res) => {
    if (req.session.user) {
        let iri = "/api/users/" + req.session.user.id;
        return res.json({
            success: true,
            message: "success",
            "iri": iri,
            setup: req.session.setup
        });
    }
    else {
     //   req.session.anonymous = new Date().getMilliseconds();
        return res.json({
            success: true,
            message: "success",
            setup: req.session.setup
        });
    }
};

module.exports = {
    setup,
    check
};
