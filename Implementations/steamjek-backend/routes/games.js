const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const {
  getAllGames,
  getGameById,
  searchGames,
  createGame
} = require('../controllers/gamesController');

router.get('/', getAllGames);
router.get('/search', searchGames);
router.get('/:id', getGameById);
router.post('/', authenticateToken, createGame);

module.exports = router;