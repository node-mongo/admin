/**
 * Defines a simple authorisation service
 */

/* Use the database service for queries */
const AppDBOService = require('./appdbo.service');
/* Get the User model */
const UserModel = require('../models/UserRepository');
/* Load our local config */
const config = require('../config/env.config');
/* Initialise */
const dbo  = new AppDBOService(config.dbPath);
const User = new UserModel(dbo);
const hash = require('pbkdf2-password')();

/**
 * Handle login process
 *
 * @param   {string}    username
 * @param   {string}    password
 * @param   {function}  fn
 *
 * @returns {boolean}
 */
const login = (username, password, fn) => {
    User.findByUser(username)
        .then((user) => {
            if (user && user.salt) {
                hash({ password: password, salt: user.salt }, (err, pass, salt, hash) => {
                    if (err) {
                        fn(new Error(err));
                    } else {
                        if (hash === user.hash) {
                            console.log("success!!");
                            fn(null, user);
                        }
                        else {
                            fn(new Error('Invalid credentials'));
                        }
                    }
                });

            } else {
                fn(new Error('Invalid user'));
            }
        });
};

module.exports = {
    login
};