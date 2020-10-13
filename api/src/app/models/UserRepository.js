/**
 *  Create a User model class
 */

//  const AppDbo  = require('../services/appdbo.service');
//  extends AppDb\

class UserRepository {
    constructor(dbo) {
        //super(dbPath);
        this.dbo = dbo;
    }

    create(name, user, email, salt, hash, control_user, admin_user, country, active) {
        // set a timestamp in seconds
        const ts = Math.floor(Date.now() / 1000);
        return this.dbo.run(
            `INSERT INTO users (name, user, email, sale, hash, control_user, admin_user, country, active, timestamp)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [name, user, email, salt, hash, control_user, admin_user, country, active, ts]
        )
    }

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

    delete(id) {
        return this.dbo.run(
            `DELETE FROM users WHERE id = ?`, [id]
        )
    }

    findById(id) {
        return this.dbo.get(
            `Select * FROM users WHERE id = ?`, [id]
        );
    }

    findAll() {
        return this.dbo.all(`Select * FROM users`);
    };
}

module.exports = UserRepository;