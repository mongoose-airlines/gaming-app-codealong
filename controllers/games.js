const axios = require('axios')
const Game = require('../models/game.js')

module.exports = {
  new: newGame,
  search,
  show,
  addToCollection
}

function addToCollection(req, res) {
  req.body.favoritedBy = req.user._id
  Game.findOne({ slug: req.body.slug })
  .then(game => {
    if (game != null) {
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
    Game.findOne({ slug: response.data.slug })
    .populate('favoritedBy')
    .then(game => {
      // add logic to handle missing favorited by next
      if (game) {
        res.render('games/show', { title: 'Game Details', user: req.user, game: response.data, favoritedBy: game.favoritedBy })
      } else {
        res.render('games/show' ,{ title: 'Game Details', user: req.user, game: response.data, favoritedBy: [""]})
      }
    })
  })
}