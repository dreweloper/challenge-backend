const { Schema, model } = require('mongoose');

const albumSchema = new Schema({
    title: { type: String, required: true, trim: true },
    year: { type: Number, required: true },
    artist: { type: String, required: true, trim: true },
    photoUrl: { type: String, required: true, trim: true },
    score: { type: Array, default: [0]}
}, { timestamps: true });

const albumModel = model('Album', albumSchema);

/**
 * Define a compound index for MongoDB.
 * @type {Object}
 */
const compoundIndex = { title: 1, artist: 1 };

// Ensures that duplicate documents cannot be inserted into the db based on these fields
albumModel.schema.index(compoundIndex, { unique: true });

module.exports = albumModel;