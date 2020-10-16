/**
 * Define a middleware check that ensures the application has been setup and initialized
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
 * Verifies that the application has been setup with a Control User
 * ToDo: consider creating a faster preliminary test: perhaps a static config and fall-back to the Control-User test upon failure for 1st test
 *
 * @param req
 * @param res
 * @param next
 */
const checkSetup = (req, res, next) => {
    if (req.session.setup >= 1) {
        req.session.setup++;
        req.session.save((err) => {
            console.error(err);
        });
        next();
    } else {
        User.findAll()
            .then((users) => {
                /**
                 * @param {array}   users
                 */
                if (users && users.length >= 1) {
                    let hasControlUser = false;
                    users.forEach((value) => {
                        if (value.control_user === 1) {
                            hasControlUser = true;
                        }
                    });
                    if (hasControlUser === false) {
                        return res.status(400).json({message: "no control user found"});
                    }
                    else {
                        req.session.setup = 1;
                        next();
                    }
                }
                else {
                    return res.status(400).json({message: "setup required"});
                }
            });
    }
};

module.exports = {
    checkSetup
};
