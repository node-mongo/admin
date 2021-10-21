/*
 * NodeMongoAdmin (www.nodemongoadmin.com) by Masterforms Mobile & Web (MFMAW)
 * @version      UserRepository.js 1001 15/9/21, 12:12 pm  Gilbert Rehling $
 * @package      NodeMongoAdmin\Api
 * @subpackage   UserRepository.js
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
 * Creates a User model class
 *
 * Require the config and the base DB class
 */
const config = require('../config/env.config');
const AppDboService = require('../services/appdbo.service');

/* create the db object */
const AppDbo = new AppDboService(config.dbPath);

/**
 * User Repository
 */
class UserModel {
    /**
     * UserRepository   Constructor
     * @param   {Object}    dbo
     */
    constructor(dbo) {
        //super(dbPath);
        this.dbo = dbo;
    }

    /**
     * Create a user
     * The control user (`control_user` = 1) can only be setup once via the setup controller
     *
     * @param   {string}  name
     * @param   {string}  user
     * @param   {string}  email
     * @param   {string}  salt
     * @param   {string}  hash
     * @param   {number}  admin_user
     * @param   {number}  has_both
     * @param   {string}  encrypted_password
     * @param   {string}  message
     * @param   {string}  country
     * @param   {number}  active
     * @returns {Promise<AppDboService>}
     */
    create(
        name,
        user,
        email,
        salt,
        hash,
        admin_user,
        has_both,
        encrypted_password,
        message,
        country,
        active) {
        // set a timestamp in seconds
        const ts = Math.floor(Date.now() / 1000);
        return this.dbo.run(
            `INSERT INTO users (name, user, email, salt, hash, control_user, admin_user, has_both, encrypted_password, message, country, active, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, user, email, salt, hash, 0, admin_user, has_both, encrypted_password, message, country, active, ts]
        )
    }

    /**
     * Update a user
     *
     * @param   {Object} params
     * @returns {Promise<AppDboService>}
     */
    update(params) {
        const { id, name, user, email, admin_user, country, active } = params;
        return this.dbo.run(
            `UPDATE users
                SET name = ?,
                user = ?,
                email = ?,
                admin_user = ?,
                country = ?,
                active = ?
                WHERE id = ?`,
            [name, user, email, admin_user, country, active, id]
        )
    }

    /**
     * Update a user's password
     *
     * @param   {Object} params
     * @returns {Promise<AppDboService>}
     */
    updatePassword(params) {
        const { id, salt, hash, encrypted_password } = params;
        return this.dbo.run(
            `UPDATE users
                SET salt = ?,
                hash = ?,    
                encrypted_password = ?
                WHERE id = ?`,
            [salt, hash, encrypted_password, id]
        )
    }

    /**
     * Delete a user
     *
     * @param   {number}    id
     * @returns {Promise<AppDboService>}
     */
    delete(id) {
        return this.dbo.run(
            `DELETE FROM users WHERE id = ?`, [id]
        )
    }

    /**
     * Find a single user by id
     *
     * @param   {number}    id
     * @returns {Promise<AppDboService>}
     */
    findById(id) {
        return this.dbo.get(
            `Select * FROM users WHERE id = ?`, [id]
        );
    }

    /**
     * Find a single user by user (username)
     *
     * @param   {string}    user
     * @returns {Promise<AppDboService>}
     */
    findByUser(user) {
        return this.dbo.get(
            `Select * FROM users WHERE user = ?`, [user]
        );
    }

    /**
     * Find a single user by email
     *
     * @param   {string}    email
     * @returns {Promise<AppDboService>}
     */
    findByEmail(email) {
        return this.dbo.get(
            `Select * FROM users WHERE email = ?`, [email]
        );
    }

    /**
     * Find all users
     *
     * @returns {Promise<AppDboService>}
     */
    findAll() {
        return this.dbo.all(`Select * FROM users`);
    }
}

/* export the instantiated model */
module.exports = new UserModel(AppDbo);