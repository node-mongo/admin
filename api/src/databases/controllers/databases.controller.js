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
        databases: [
            { name: 'database1' }
        ]
    });
};

module.exports = {
    get
};
