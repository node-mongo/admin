/**
 * Defines the controller for handling the emailing API route
 */

// Required services
const { LogsService } = require('../../app/services');
const { AuthService } = require('../../app/services');

/**
 *
 * @param   {object}    req
 * @param   {object}    res
 * @returns {undefined|*|void}
 */
const login = (req, res) => {
    let username = req.body.user;
    let password = req.body.password;

    // ensure that all elements exist !! basic test only !!
    if (!(username && password)) {
        return res.status(400).send({errors: ['Required parameters missing']});
    }

    /**
     * Call the Auth Service login processor
     */
    AuthService.login(username, password, (err, user) => {
        if (err) {
            // log this
            let logData = {
                "type": "auth",
                "action": "login",
                "message": err
            };
            LogsService.save(logData);
            console.error(err);
            // return an error response
            return res.status(401).json({"errors": err.toString() });

        } else {
            // log this
            /*let logData = {
                "type": "email",
                "action": "login",
                "message": "success: " + user.id
            };
            LogsService.save(logData);*/

            // we only want to send back a minimal user object
            let u = {
                id: user.id,
                iri: "/api/users/" + user.id,
                user: user.user,
                name: user.name,
                country: user.country
            };

            // save to session
            req.session.regenerate(() => {
                // store the entire user
                req.session.user = u;
            });

            /* placing this here ensured that the logged in session was preserved correctly */
            req.session.user = u;

            req.session.reload((err) => {
               if (err) {
                   console.error(err);
               }
            });

            /*req.session.save((err) => {
                console.error(err);
            });*/

            // return user with response
            return res.status(200).json({success: true, user:  u});
        }
    });
};

/**
 * Logout method
 * @param {object}  req
 * @param {object}  res
 */
const logout = (req, res) => {
    // destroy user session to log them out
    req.session.destroy(() => {
        return res.status(401).json({"errors": 'Unauthenticated' });
    });
};

/* Defined the JWT refresh method */
const refresh = (req, res) => {
    console.log("refresh() called");
};

module.exports = {
    login,
    logout,
    refresh
};
