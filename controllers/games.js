const axios = require('axios')
const Game = require('../models/game.js')

module.exports = {
  new: newGame,
  search,
  show,
  addToCollection
}

function addToCollection(req, res) {
  console.log(req.body)
  req.body.favoritedBy = req.user._id
  Game.findOne({ slug: req.body.slug })
  .then(game => {
    if (game.length != 0) {
      console.log(game)
      console.log(req.user._id)
      game.favoritedBy.push(req.user._id)
      game.save()
      .then(() => {
        res.redirect('/')
      })
    } else {
      Game.create(req.body)
      .then(res.redirect('/'))
    }
  })
}

function newGame(req, res) {
  res.render('games/new', { title: 'Game Search', user: req.user, results: null })
}

function search(req, res) {
  axios.get(`https://api.rawg.io/api/games?page_size=5&search=${req.body.query}`)
  .then(response => {
    console.log(response.data.results)
    res.render('games/new', { title: 'Game Search', user: req.user, results: response.data.results })
  })
}

function show(req, res) {
  axios.get(`https://api.rawg.io/api/games/${req.params.title}`)
  .then(response => {
    res.render('games/show', { title: 'Game Details', user: req.user, game: response.data })
  })
}