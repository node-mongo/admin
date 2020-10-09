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
exports.checkDomain = (email) => {
    let arr     = email.split("@");
    let domain  = arr[1],
        domains = config.allowedDomains,
        // fail by default
        found = false;

    for (const allowed of domains) {
        if (allowed === domain) {
            found = true;
        }
    }
    // return the result
    return found;
};