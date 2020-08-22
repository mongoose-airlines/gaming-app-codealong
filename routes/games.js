const router = require('express').Router();
const passport = require('passport');
const gamesCtrl = require('../controllers/games')

router.get('/new', gamesCtrl.new)
router.post('/search', gamesCtrl.search)

module.exports = router;