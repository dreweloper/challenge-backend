const { validationResult } = require('express-validator');

/**
 * Middleware to validate the request body fields.
 * 
 * @function handleValidation
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send back an HTTP response to the client.
 * @param {Function} next - The next middleware function to be called.
 */
const handleValidation = (req, res, next) => {

    /**
     * Extracts the validation results from a request, wraps them in a Result object, and returns it.
     * @type {Object}
     */
    const errors = validationResult(req);

    if(!errors.isEmpty()){

        // Set an error message in the request object
        req.error = {
            ok: false,
            msg: 'All fields of the JSON body are mandatory.'
        };

    };

    next();
    
};

module.exports = handleValidation;