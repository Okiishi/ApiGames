const express = require('express');
const { listGames, createGame, updateGame, deleteGame } = require('../controllers/gameController');
const authenticateToken = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/', listGames);
router.post('/', authenticateToken, createGame);
router.put('/:id', authenticateToken, updateGame);
router.delete('/:id', authenticateToken, deleteGame);

module.exports = router;
