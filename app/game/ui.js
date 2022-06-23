"use strict";

const store = require("../store");
const Swal = require("sweetalert2");

const onFailure = (title, text) => {
  Swal.fire({
    position: "top",
    icon: "error",
    title: title,
    text: text || null,
    showConfirmButton: false,
    timer: 2000
  });
};

const onCreateGameSuccess = responseData => {
  // store game info
  store.game = responseData.game;
  // reset total moves counter to 0
  store.totalMoves = 0;
  // clear the board
  clearBoard();
  // if the board is still hidden (1st sign in), make the board visible
  $(".board").css("display", "flex");
  $("#current-turn").html("X");
};

const onCreateGameFailure = () => {
  onFailure("ERROR ERROR - failed to create game");
};

const onGetAllGamesSuccess = data => {
  // update total games stat
  let totalGames = data.games.length;
  $("#count-all-games").html(totalGames);
};

const onGetAllGamesFailure = () => {
  onFailure("Unable to get all games");
};

const renderSquare = id => {
  const newId = `#${id}`;
  $(newId).html(`${store.currentPlayer}`);
};

const onUpdateMoveSuccess = responseData => {
  // update game state
  store.game = responseData.game;
};

const onUpdateMoveFailure = () => {
  onFailure("Unable to update move");
};

const onGameOver = () => {
  updateStats();
  gameOverMessage();
};

const gameOverMessage = () => {
  Swal.fire({
    title: `Player ${store.currentPlayer} wins!`,
    text: "Congratulations, you won!",
    icon: "success",
    confirmButtonText: "Ok",
    allowOutsideClick: false
  });
};

const displayInfo = (title, text) => {
  Swal.fire({
    title: title,
    text: text,
    icon: "info",
    confirmButtonText: "Ok",
    allowOutsideClick: false
  });
};

const clearBoard = () => {
  $(".box").html("");
};

const updateCurrentTurn = () => {
  const nextPlayer = store.currentPlayer === "x" ? "o" : "x";
  $("#current-turn").html(nextPlayer.toUpperCase());
};

const updateStats = () => {
  $("#count-draw").html(store.tie);
  $("#count-session-games").html(store.sessionGamesCount);
  $("#count-x").html(store.winsX);
  $("#count-o").html(store.winsO);
};

module.exports = {
  onCreateGameSuccess,
  onCreateGameFailure,
  onGetAllGamesSuccess,
  onGetAllGamesFailure,
  onUpdateMoveSuccess,
  onUpdateMoveFailure,
  renderSquare,
  onGameOver,
  clearBoard,
  displayInfo,
  updateCurrentTurn,
  updateStats
}
