const router = require('express').Router();
const passport = require('passport');
const gamesCtrl = require('../controllers/games')

router.get('/new', isLoggedIn, gamesCtrl.new)
router.post('/search', isLoggedIn, gamesCtrl.search)
router.get('/:title', isLoggedIn, gamesCtrl.show)
router.post('/:slug/collection', isLoggedIn, gamesCtrl.addToCollection)
router.delete('/:slug', isLoggedIn, gamesCtrl.removeFromCollection)
router.get('/', isLoggedIn, gamesCtrl.index)

function isLoggedIn(req, res, next) {
  if ( req.isAuthenticated() ) return next();
  res.redirect('/auth/google');
}

module.exports = router;