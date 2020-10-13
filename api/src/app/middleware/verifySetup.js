/**
 * Define a middleware check that ensures the application has been setup and initialized
 */

/* Use the database service for queries */
const { AppDboService } = require('../services');
/* Get the User model */
const { User } = require('../models');
/* Load our local config */
const config = require('../config/env.config');
/* Initialise */
const dbo = new AppDboService(config.dbPath);
const user = new User(dbo);

const checkSetup = (req, res, next) => {
    user.findAll()
        .then((users) => {
            //console.log("users: " + users);
            if (users && users.length >= 1) {
                let hasControlUser = false;
                users.forEach((value) => {
                    console.log(value);
                    if (value.control_user === 1) {
                        hasControlUser = true;
                    }
                });
                if (hasControlUser === false) {
                    return res.status(400).json({message: "no control user found"});
                }
                else {
                    next();
                }
            }
            else {
                console.log(users);
                return res.status(400).json({message: "setup required"});
            }
        });
};

module.exports = {
    checkSetup
};