const Album = require('../models/albumModel');
const { StatusCodes, ReasonPhrases } = require('http-status-codes');

/**
 * Retrieves all the album documents from the database and sends a response to the client.
 * 
 * @async
 * @function getAlbums
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send back an HTTP response to the client.
 */
const getAlbums = async (req, res) => {

  try {

    /**
     * Query object for searching documents in the database.
     * @type {Object}
     * @description Selects documents where the value of the field `_id` is not equal to the specified value (`null`).
     */
    const findQuery = { _id: { $ne: null } };

    /**
     * The database operation response object.
     * @type {Promise<Object>}
     */
    const response = await Album.find(findQuery).lean().exec();

    if (response.length > 0) {

      res.status(StatusCodes.OK).json({
        ok: true,
        data: response
      });

    } else {

      res.status(StatusCodes.NOT_FOUND).json({
        ok: false,
        msg: 'There are no documents stored in the database.'
      });

    };

  } catch (error) {

    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error
    });

  };

}; //GETALBUMS

/**
 * Retrieves an album document from the database by its ID and sends a response to the client.
 * 
 * @async
 * @function getAlbumById
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send back an HTTP response to the client.
 */
const getAlbumById = async (req, res) => {

  try {

    /**
     * The ID of the album to retrieve, obtained from the request parameters.
     * @type {String}
     */
    const { id } = req.params;

    /**
     * The database operation response object.
     * @type {Promise<Object>}
     */
    const response = await Album.findById(id).lean().exec();

    if (response) {

      res.status(StatusCodes.OK).json({
        ok: true,
        data: response
      });

    } else {

      res.status(StatusCodes.NOT_FOUND).json({
        ok: false,
        msg: `The document with ID ${id} was not found.`
      });

    };

  } catch (error) {

    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error
    });

  };

}; //GETALBUMBYID

/**
 * Adds a new album document to the database and sends a response to the client.
 * 
 * @async
 * @function addAlbum
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send back an HTTP response to the client.
 */
const addAlbum = async (req, res) => {

  try {

    // Middleware `validateRequestBody` handles de `req.error` object
    if (req.error) return res.status(StatusCodes.BAD_REQUEST).json(req.error);

    const album = new Album(req.body);

    /**
     * The database operation response object.
     * @type {Promise<Object>}
     */
    const response = await album.save();

    res.status(StatusCodes.CREATED).json({
      ok: true,
      data: response
    });

  } catch (error) {

    // Code 11000 is the error code for duplicates
    if (error.code == 11000) {

      return res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        msg: 'Duplicate album entry. This album already exists.'
      });

    };

    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error
    });

  };

}; //ADDALBUM

/**
 * Updates an album document in the database by its ID and sends a response to the client.
 * 
 * @async
 * @function updateAlbumById
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send back an HTTP response to the client.
 */
const updateAlbumById = async (req, res) => {

  try {

    // Middleware `validateRequestBody` handles de `req.error` object
    if (req.error) return res.status(StatusCodes.BAD_REQUEST).json(req.error);

    /**
     * The ID of the album to retrieve, obtained from the request parameters.
     * @type {String}
     */
    const { id } = req.params;

    /**
     * The database operation response object.
     * @type {Promise<Object>}
     */
    const existingAlbum = await Album.findById(id, { _id: 0, title: 1, year: 1, artist: 1, photoUrl: 1, score: 1 }).lean().exec(); // Projection: selects only the properties required for the comparison

    if (!existingAlbum) {

      return res.status(StatusCodes.NOT_FOUND).json({
        ok: false,
        msg: `The document with ID ${id} was not found.`
      });

    };

    // Check whether the document has been modified or not
    if (JSON.stringify(existingAlbum) === JSON.stringify(req.body)) {

      res.status(StatusCodes.OK).json({
        ok: true,
        msg: 'No modifications have been made to the document.'
      });

    } else {

      /**
       * The database operation response object.
       * @type {Promise<Object>}
       */
      const response = await Album.findByIdAndUpdate(id, { ...req.body }, { new: true, runValidators: true }); // Option `new` set to `true` returns the modified document rather than the original

      res.status(StatusCodes.OK).json({
        ok: true,
        data: response
      });

    };

  } catch (error) {

    // Code 11000 is the error code for duplicates
    if (error.code == 11000) {

      return res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        msg: 'Duplicate album entry. This album already exists.'
      });

    };

    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error
    });

  };

}; //UPDATEALBUMBYID

/**
 * Removes an album document from the database by its ID and sends a response to the client.
 * 
 * @async
 * @function deleteAlbumById
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send back an HTTP response to the client.
 */
const deleteAlbumById = async (req, res) => {

  try {

    /**
     * The ID of the album to retrieve, obtained from the request parameters.
     * @type {String}
     */
    const { id } = req.params;

    /**
     * The database operation response object.
     * @type {Promise<Object>}
     */
    const response = await Album.findByIdAndDelete(id).exec();

    if (response) {

      res.status(StatusCodes.OK).json({
        ok: true,
        msg: `The document with ID ${id} has been successfully deleted.`
      });

    } else {

      res.status(StatusCodes.NOT_FOUND).json({
        ok: false,
        msg: `The document with ID ${id} was not found.`
      });

    };

  } catch (error) {

    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error
    });

  };

}; //DELETEALBUMBYID

/**
 * Updates the 'score' property of an album document in the database by its ID and sends a response to the client.
 * 
 * @async
 * @function updateAlbumScoreById
 * @param {Object} req - The request object containing information about the incoming HTTP request.
 * @param {Object} res - The response object used to send back an HTTP response to the client.
 */
const updateAlbumScoreById = async (req, res) => {

  try {

    /**
     * The ID of the album to retrieve, obtained from the request parameters.
     * @type {String}
     */
    const { id } = req.params;

    if(!req.body.score){

      return res.status(StatusCodes.BAD_REQUEST).json({
        ok: false,
        msg: 'The "score" field in the JSON body is required.'
      });
  
    };
    
    /**
     * The database operation response object.
     * @type {Promise<Object>}
     */
    const existingAlbum = await Album.findById(id, 'score').lean().exec();

    if(!existingAlbum) {

      return res.status(StatusCodes.NOT_FOUND).json({
        ok: false,
        msg: `The document with ID ${id} was not found.`
      });

    };

    existingAlbum.score.push(req.body.score);

    /**
     * The database operation response object.
     * @type {Promise<Object>}
     */
    const updatedAlbum = await Album.findByIdAndUpdate(id, { score: existingAlbum.score }, { new: true, runValidators: true });

    res.status(StatusCodes.OK).json({
      ok: true,
      data: updatedAlbum
    });

  } catch (error) {
    
    console.error(error);

    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      ok: false,
      msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
      error
    });

  };

}; //UPDATEALBUMSCOREBYID

module.exports = {
  getAlbums,
  getAlbumById,
  addAlbum,
  updateAlbumById,
  deleteAlbumById,
  updateAlbumScoreById
};