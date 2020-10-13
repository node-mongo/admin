/**
 * Defines a simple authorisation service
 */

/* Requires the configuration data */
const config = require('../config/env.config');

/**
 * We only want to send for allowed domains
 * This method uses allowedDomains stored in the config
 * For a production app: I would parse a file or Db record for more flexibility
 *
 * @param email
 *
 * @returns {boolean}
 */
const auth = () => {

};

module.exports = {
    auth
};