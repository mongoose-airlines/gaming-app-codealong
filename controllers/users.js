const User = require('../models/user')
const Game = require('../models/game')

module.exports = {
  index,
  show
}

function index(req, res) {
  User.find({})
  .then(users => {
    res.render('users/index', { title: 'User Index', user: req.user, users })
  })
}

function show(req, res) {
  User.findById(req.params.id)
  .then(userInfo => {
    Game.find({ "favoritedBy": userInfo._id })
    .then(games => {
      res.render('users/show', { title: 'User Details', userInfo, user: req.user, games })
    })
  })
}