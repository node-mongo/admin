/**
 *  Creates a User model class
 */

 const { AppDBOService } = require('../services');

/**
 * User Repository
 */
class UserRepository {
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
     * @param   {string}  name
     * @param   {string}  user
     * @param   {string}  email
     * @param   {string}  salt
     * @param   {string}  hash
     * @param   {number}  control_user
     * @param   {number}  admin_user
     * @param   {string}  country
     * @param   {number}  active
     * @returns {Promise<AppDBOService>}
     */
    create(name, user, email, salt, hash, control_user, admin_user, country, active) {
        // set a timestamp in seconds
        const ts = Math.floor(Date.now() / 1000);
        return this.dbo.run(
            `INSERT INTO users (name, user, email, sale, hash, control_user, admin_user, country, active, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, user, email, salt, hash, control_user, admin_user, country, active, ts]
        )
    }

    /**
     * Update a user
     * @param   {Object} params
     * @returns {Promise<AppDBOService>}
     */
    update(params) {
        const { name, user, email, admin_user, country, active } = params;
        return this.dbo.run(
            `UPDATE users
                SET name = ?,
                user = ?,
                email = ?,
                admin_user = ?,
                country = ?,
                active = ?`,
            [name, user, email, admin_user, country, active]
        )
    }

    /**
     * Delete a user
     * @param   {number}    id
     * @returns {Promise<AppDBOService>}
     */
    delete(id) {
        return this.dbo.run(
            `DELETE FROM users WHERE id = ?`, [id]
        )
    }

    /**
     * Find a single user by id
     * @param   {number}    id
     * @returns {Promise<AppDBOService>}
     */
    findById(id) {
        return this.dbo.get(
            `Select * FROM users WHERE id = ?`, [id]
        );
    }

    /**
     * Find a single user by user (username)
     * @param   {string}    user
     * @returns {Promise<AppDBOService>}
     */
    findByUser(user) {
        return this.dbo.get(
            `Select * FROM users WHERE user = ?`, [user]
        );
    }

    /**
     * Find a single user by email
     * @param   {string}    email
     * @returns {Promise<AppDBOService>}
     */
    findByEmail(email) {
        return this.dbo.get(
            `Select * FROM users WHERE email = ?`, [email]
        );
    }

    /**
     * Find all users
     * @returns {Promise<AppDBOService>}
     */
    findAll() {
        return this.dbo.all(`Select * FROM users`);
    };
}

module.exports = UserRepository;