const { check } = require('express-validator');
const handleValidation = require('../middlewares/handleValidation');

const validateAlbum = [
    check('title').notEmpty(),
    check('year').notEmpty(),
    check('artist').notEmpty(),
    check('photoUrl').notEmpty(),
    (req, res, next) => {
        handleValidation(req, res, next);
    }
];

module.exports = validateAlbum;