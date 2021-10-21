/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      verifySetup.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   verifySetup.js
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
 * Defines a middleware check that ensures the application has been setup and initialized
 */

/**
 * Require the UserRepository
 */
const { UserModel } = require('../models');

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
        UserModel.findAll()
            .then((users) => {
                /**
                 * @param {array}   users
                 */
                if (users && users.length >= 1) {
                    let hasControlUser = false;
                    users.forEach((user) => {
                        if (user.control_user === 1) {
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
