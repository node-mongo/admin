/**
 *  Create a Log model class
 */

class LogRepository {
    constructor(dbo) {
        this.dbo = dbo;
    }

    create(log, user_id) {
        // set a timestamp in seconds
        const ts = Math.floor(Date.now() / 1000);
     //   console.log("saving log: " + log);
        return this.dbo.run(
            `INSERT INTO logs (log, user_id, timestamp)
                VALUES (?, ?, ?)`,
            [log, user_id, ts]
        )
    }

    findAll() {
        return this.dbo.all(`Select * FROM logs`);
    };
}

module.exports = LogRepository;