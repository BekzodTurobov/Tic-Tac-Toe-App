let gameData = [
  [0, 0, 0],
  [0, 0, 0],
  [0, 0, 0],
];

let editedPlayer = 0;
let activePlayer = 0;
let currentRound = 1;
let playing = true;

const players = [
  { name: "", symbol: "X" },
  { name: "", symbol: "O" },
];

const editBtn1El = document.getElementById("edit-btn-1");
const editBtn2El = document.getElementById("edit-btn-2");
const overlay = document.getElementById("backdrop");
const modalEl = document.querySelector(".modal");
const formEl = document.querySelector(".form");
const inputEl = document.querySelector("#playername");
const cancelBtnEl = document.getElementById("cancel-btn");
const configErrorEl = document.querySelector("#config-errors");
const playerNameError = document.querySelector("#player-name-errors");
const startBtnEl = document.querySelector("#start-btn");
const activeGameBoxEl = document.querySelector("#active-game");
const activePlayerNameEl = document.querySelector("#active-player-name");
const gameBoardEl = document.querySelector("#game-board");
const boardBtn = document.querySelectorAll("#game-board li");
const endGameEl = document.querySelector("#game-over");
const winnerNameEl = document.querySelector("#winner-name");

// EDIT BUTTONS
editBtn1El.addEventListener("click", openPlayerConfig);
editBtn2El.addEventListener("click", openPlayerConfig);

// CANCEL PLAYER CONFIG
cancelBtnEl.addEventListener("click", closePlayerConfig);
overlay.addEventListener("click", closePlayerConfig);
document.addEventListener("keydown", escPlayerConfig);

// FORM ELEMENT
formEl.addEventListener("submit", savePlayerName);

// ACTIVE GAME
startBtnEl.addEventListener("click", startNewGame);

gameBoardEl.addEventListener("click", selectGameField);

boardBtn.forEach((btn) => {
  btn.addEventListener("mouseout", function (e) {
    fadeHandler(e, "");
  });
  btn.addEventListener("mouseover", function (e) {
    fadeHandler(e, players[activePlayer].symbol);
  });
});
