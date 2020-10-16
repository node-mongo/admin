/**
 * Define a rudimentary Session based AUTH middleware method that can be used to validate incoming requests
 */

/* Use the database service for queries */
const { AppDBOService } = require('../services');
/* Get the User model */
const { UserModel } = require('../models');
/* Load our local config */
const config = require('../config/env.config');
/* Initialise */
const dbo = new AppDBOService(config.dbPath);
const User = new UserModel(dbo);

/**
 *
 * @param   req
 * @param   res
 * @param   {Object}    next
 * @returns {undefined|*|void}
 */
const validateSession = (req, res, next) => {
    try {
        // A user MUST be present in the session
        if (req.session.user) {
            let sessionUser = req.session.user;
            User.findById(sessionUser.id)
                .then((user) => {
                    // ToDo: seems to have issues whe using strict comparison
                    if (user && user.active == 1) {
                        // only return TRUE if User is still active
                        next();
                    } else {
                        // this is the end my friend !!
                        return res.status(401).json({"errors": "Unauthenticated due to inactive user"});
                    }
                });

        } else {
            console.error(req.session);
            return res.status(401).json({"errors": "Unauthenticated: " + req.session});
        }
    }
    catch (err) {
        console.error(error);
        return res.status(500).send(err);
    }
};

module.exports = {
    validateSession
};