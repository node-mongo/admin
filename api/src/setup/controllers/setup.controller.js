/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      setup.controller.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   setup.controller.js
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
 * Define the setup controller
 * This controller handle the creation of the control user
 * The UserRepository will be restricted from creating control users
 */

/* Require the logging service */
const { LogsService } = require('../../app/services');

/* Require the crypto service */
const { CryptoService } = require('../../app/services');

/* Require the AppDbo service */
const AppDboService = require('../../app/services/appdbo.service');
const config = require('../../app/config/env.config');
const AppDbo = new AppDboService(config.dbPath);

/* As this will create a user record we ned to hash their password */
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
    let encrypted = CryptoService.encrypt(req.body.password);

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
        console.log("encrypted: " + encrypted);

        // set a timestamp in seconds
        const ts = Math.floor(Date.now() / 1000);
        let sql  = `INSERT INTO users
        (name, user, email, salt, hash, control_user, admin_user, has_both, encrypted_password, country, message, active, timestamp)
        VALUES
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

        AppDbo.run( sql, [name, user, email, salt, hash, 1, 1, 0, encrypted, country, '', 1, ts], (err) => {
            if (err) {
                console.log("setup err: " + err);
                // log this
                let logData = {
                    "type": "setup",
                    "action": "create",
                    "message": err.message,
                    "user_id": 0
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
        })
    }
    else {
        return res.json({
            success: true,
            message: "success",
            setup: req.session.setup
        })
    }
};

module.exports = {
    setup,
    check
};
