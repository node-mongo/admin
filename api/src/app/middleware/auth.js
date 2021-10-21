/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      auth.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   auth.js
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
 * Define a rudimentary Session based AUTH middleware method that can be used to validate incoming requests
 */

/* Get the User model */
const { UserModel } = require('../models');

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
            UserModel.findById(req.session.user.id)
                .then((user) => {
                    // ToDo: seems to have issues whe using strict comparison
                    if (user && user.active == 1) {
                        // only return TRUE if User is still active
                        next();
                    } else {
                        // this is the end my friend !!
                        console.error("validated user was inactive or not found!!");
                        console.error(user);
                        return res.status(401).json({"errors": "Unauthenticated due to inactive user"});
                    }
                });

        } else {
            console.log("check session:");
            console.log(req.sessionID);
            console.log(req.session.id);
            console.error(req.session);
            console.log("not authed?");
            return res.status(401).json({"errors": "Unauthenticated: " + req.session});
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).send(err);
    }
};

module.exports = {
    validateSession
};