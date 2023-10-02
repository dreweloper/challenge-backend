const { Router } = require('express');
const validateAlbum = require('../validators/album');
const {
  getAlbums,
  getAlbumById,
  addAlbum,
  updateAlbumById,
  deleteAlbumById,
  updateAlbumScoreById
} = require('../controllers/albumController');

const router = Router();

// Retrieves all the album documents from the database
router.get('/', getAlbums);

// Retrieves an album document from the database by its ID
router.get('/:id', getAlbumById);

// Adds a new album document to the database
router.post('/', [validateAlbum], addAlbum);

// Updates an album document in the database by its ID
router.put('/:id', [validateAlbum], updateAlbumById);

// Removes an album document from the database by its ID
router.delete('/:id', deleteAlbumById);

// Updates the 'score' property of an album document in the database by its ID
router.put('/update-score/:id', updateAlbumScoreById);

module.exports = router;