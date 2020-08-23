const User = require('../models/user')
const Game = require('../models/game')
const Chat = require('../models/chat')

module.exports = {
  index,
  show,
  addFriend,
  removeFriend,
  showProfile,
  update,
  chatRoom,
  postChat
}

function postChat(req, res) {
  if (req.body.username === req.user.name) {
    Chat.create(req.body)
    .then(() => {res.status(201).send('Added')})
  } else {
    res.status(208).send('Already added')
  }
}

function chatRoom(req, res) {
  Chat.find({}).sort({_id: -1}).limit(150)
  .then(chats => {
    res.render('chatroom', { title: 'Chat Room', user: req.user, chats: chats })
  })
}

function update(req, res) {
  User.findByIdAndUpdate(req.user._id, req.body, {new: true})
  .then(() => {
    res.redirect('/users/profile')
  })
}

function showProfile(req, res) {
  User.findById(req.user._id)
  .populate('friends')
  .then((user) => {
    res.render('users/profile', { title: 'Profile Page', user })
  })
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