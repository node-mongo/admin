/**
 * Defines some basic configuration values
 * Todo: !! Its worth noting that this config could be loaded via the ENV
 */

/* Update this according to the environment and URL served */
module.exports = {
    "dbPath": "./storage/sqlite/db",
    "port": 8080,
    "appEndpoint": "http://192.168.1.141:8080",
    "apiEndpoint": "http://192.168.1.141:8080",
    "session_secret": "myTestSessionSecret",
    "jwt_secret": "this is not stored here",
    "jwt_expiration_in_seconds": 36000,
    "environment": "dev",
    "adminTables": [
        "admin",
        "local"
    ]
};
