'use strict'

const api = require('./api')
const ui = require('./ui')
const game = require('./game-logic')
const store = require('../store')

const onCreateGame = e => {
  // reset some state for a new game
  store.isOver = false
  store.currentPlayer = 'x'
  // create the new game
  api
    .createGame()
    .then(res => ui.onCreateGameSuccess(res))
    .catch(ui.onCreateGameFailure)
  // update stat bar with total games
  onGetAllGames()
}

const onGetAllGames = () => {
  api
    .getAllGames()
    .then(ui.onGetAllGamesSuccess)
    .catch(ui.onGetAllGamesFailure)
}

const onClickSquare = e => {
  // grab id of square that user clicked and the current player
  const id = parseInt(e.target.id)
  const player = store.currentPlayer
  // if the move is valid and the game is not over
  if (game.isValidMove(id) && !store.isOver) {
    // send the id and player to the api - this updates the move and checks for win condition
    game.onUpdateMove(id, player)
    // render the square on the board and toggle the current player
    ui.renderSquare(id)
    ui.updateCurrentTurn()
    // if the user tries to click when the game is over
  } else if (store.isOver) {
    ui.displayInfo(
      'Unable to make that move',
      'The game is already over! Create a new game to play again.'
    )
    // if the move is invalid and the game is not over yet
  } else {
    ui.displayInfo(
      'Unable to make that move',
      'That spot is already taken! Try clicking another spot.'
    )
  }
}

const addHandlers = e => {
  $('#create-game').on('click', onCreateGame)
  $('#game-board').on('click', onClickSquare)
}

module.exports = {
  addHandlers,
  onCreateGame
}
