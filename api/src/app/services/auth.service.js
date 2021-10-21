/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      auth.service.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   auth.service.js
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
 * Defines a simple authorisation service
 */

/* Get the User model */
const { UserModel } = require('../models');

/* Some 'hash' anyone? */
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
    UserModel.findByUser(username)
        .then((user) => {
            if (user && user.salt) {
                hash({ password: password, salt: user.salt }, (err, pass, salt, hash) => {
                    if (err) {
                        console.log("user auth error!!");
                        fn(new Error(err));
                    } else {
                        if (hash === user.hash) {
                            console.log("auth login success!!");
                            fn(null, user);
                        }
                        else {
                            console.log("auth invalid credentials!!");
                            fn(new Error('Invalid credentials'));
                        }
                    }
                });

            } else {
                console.log("auth invalid user!!");
                fn(new Error('Invalid user'));
            }
        })
        .catch((err) => {
            console.log(err);
            fn(new Error('Uncaught login error'));
        })
};

module.exports = {
    login
};