const User = require('../models/user')
const Game = require('../models/game')

module.exports = {
  index,
  show,
  addFriend,
  removeFriend
}

function removeFriend(req, res) {
  let idx = req.user.friends.indexOf(req.params.id)
  req.user.friends.splice(idx, 1)
  req.user.save()
  .then(() => {
    res.redirect(`/users/${req.params.id}`)
  })
}

function addFriend(req, res) {
  req.user.friends.push(req.params.id)
  req.user.save()
  .then(() => {
    res.redirect(`/users/${req.params.id}`)
  })
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