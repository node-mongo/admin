/**
 * Defines the controller for handling the emailing API route
 */

// Require the logging service
const { LogsService } = require('../../app/services');

/**
 *
 * @param   {object}    req
 * @param   {object}    res
 * @returns {*}
 */
const get = (req, res) => {
    return res.json({
        success: true,
        message: "success",
        servers: [
            {name: 'server1'}
        ]
    })
};

module.exports = {
    get
};
