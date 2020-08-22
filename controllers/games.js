const axios = require('axios')
const Game = require('../models/game.js')

module.exports = {
  new: newGame,
  search
}

function newGame(req, res) {
  res.render('games/new', { title: 'Game Search', user: req.user, results: null })
}

function search(req, res) {
  axios.get(`https://api.rawg.io/api/games?page_size=5&search=${req.body.query}`)
  .then(response => {
    res.render('games/new', { title: 'Game Search', user: req.user, results: response.data })
  })
}