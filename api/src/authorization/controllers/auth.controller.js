/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      auth.controller.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   auth.controller.js
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
 * Defines the auth.controller for handling the /api/auth/ API route
 */

// Required services
const { LogsService } = require('../../app/services');
const { AuthService } = require('../../app/services');
const config = require('../../app/config/env.config')

/**
 *
 * @param   {object}    req
 * @param   {object}    res
 * @returns {undefined|*|void}
 */
const login = (req, res) => {
    let username = req.body.user;
    let password = req.body.password;

    // ensure that all elements exist !! basic test only !!
    if (!(username && password)) {
        return res.status(400).send({errors: ['Required parameters missing']});
    }

    /**
     * Call the Auth Service login processor
     */
    AuthService.login(username, password, (err, user) => {
        if (err) {
            // log this
            let logData = {
                "type": "auth",
                "action": "login",
                "message": err
            };
            LogsService.save(logData);
            console.error(err);
            // return an error response
            return res.status(401).json({"errors": err.toString() });

        } else {
            // log this
            let logData = {
                "type": "email",
                "action": "login",
                "message": "success",
                "user_id": user.id
            };
            LogsService.save(logData);

            console.log("user logged in:" + user);

            // we only want to send back a minimal user object
            let u = {
                id: user.id,
                iri: "/api/users/" + user.id,
                user: user.user,
                name: user.name,
                control_user: user.control_user,
                country: user.country
            };

            console.log("check session:");
            console.log(req.sessionID);
            console.log(req.session.id);
            console.log(req.session);

            // save to session
            req.session.regenerate((err) => {
                if (err) {
                    console.log('session regenerate error');
                    console.error(err);
                }
                // store the entire user
                req.session.user = u;
            });

            /* placing this here ensured that the logged in session was preserved correctly */
            req.session.user = u;

            /*req.session.reload((err) => {
               if (err) {
                   console.log('session reload error');
                   console.error(err);
               }
            });*/

           /* req.session.save((err) => {
                if (err) {
                    console.log('session save error');
                    console.error(err);
                }
            });*/

            //console.log("check session again:");
            //console.log(req.sessionID);
            //console.log(req.session.id);
            //console.log(req.session.user);

            // ToDo: this doesnt work - need to find a better way
            /*res.cookie(
                'nodemongoapp-member',
                u.name,
                {
                    domain: config.frontEndDomain,
                    path: "/",
                    maxAge: 60*60*24*182,
                    httpOnly: false,
                    secure: true,
                    sameSite: 'none'
                });*/

            // return user with response
            return res.status(200).json({success: true, user:  u});
        }
    });
};

/**
 * Logout method
 * @param {object}  req
 * @param {object}  res
 */
const logout = (req, res) => {
    // destroy user session to log them out
    req.session.destroy(() => {
        return res.status(401).json({"errors": 'Unauthenticated' });
    });
};

/* Defined the JWT refresh method */
const refresh = (req, res) => {
    console.log("refresh() called");
};

module.exports = {
    login,
    logout,
    refresh
};
