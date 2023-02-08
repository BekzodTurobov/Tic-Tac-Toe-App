//////////////////////////////////////////////
// OPEN CONFIGURATION //

function openPlayerConfig(event) {
  editedPlayer = +event.target.dataset.playerid;

  overlay.style.display = "block";
  modalEl.style.display = "block";
}

//////////////////////////////////////////////
// CLOSE CONFIGURATION //

function closePlayerConfig() {
  inputEl.value = "";
  configErrorEl.textContent = "";
  playerNameError.textContent = "";
  overlay.style.display = "none";
  modalEl.style.display = "none";
  formEl.firstElementChild.classList.remove("error");
  configErrorEl.classList.remove("error");
}

function escPlayerConfig(e) {
  if (e.key === "Escape" && overlay.style.display == "block") {
    closePlayerConfig();
  }
}

//////////////////////////////////////////////
// FORM ELEMENT //

function savePlayerName(event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const enteredPlayerName = formData.get("playername").trim();

  if (!enteredPlayerName) {
    inputEl.value = "";
    configErrorEl.textContent = "Please enter a valid name!";
    event.target.firstElementChild.classList.add("error");
    return;
  }

  const updatedplayerId = document.getElementById(
    `player-${editedPlayer}-data`
  );
  updatedplayerId.children[1].textContent = enteredPlayerName;

  players[editedPlayer - 1].name = enteredPlayerName;
  closePlayerConfig();
}

//////////////////////////////////////////////
// RESET GAME //

function resetGame() {
  activePlayer = 0;
  currentRound = 1;
  playing = false;
  endGameEl.style.display = "none";
  // endGameEl.firstElementChild.innerHTML = `You won, <span id="winner-name">Player name</span>!`;

  let gameBoardIndex = 0;

  for (let i = 0; i < gameData.length; i++) {
    for (let j = 0; j < gameData[i].length; j++) {
      gameData[i][j] = 0;
      gameBoardEl.children[gameBoardIndex].textContent = "";
      gameBoardEl.children[gameBoardIndex].classList.remove("disabled");
      gameBoardIndex++;
    }
  }
}

//////////////////////////////////////////////
//START NEW GAME //

function startNewGame() {
  if (players[0].name && players[1].name) {
    activeGameBoxEl.style.display = "block";
    gameBoardEl.classList.add("smooth");
    gameBoardEl.scrollIntoView();
  } else if (!players[0].name || !players[1].name) {
    playerNameError.textContent =
      "Please set custom player names for both players!";
  }

  resetGame();

  activePlayerNameEl.textContent = players[activePlayer].name;
}

const switchPlayer = function () {
  if (activePlayer === 0) {
    activePlayer = 1;
  } else {
    activePlayer = 0;
  }

  activePlayerNameEl.textContent = players[activePlayer].name;
};

//////////////////////////////////////////////
// CHECK FOR GAME //

function checkForGameOver() {
  // Checking the rows for equality
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[i][0] > 0 &&
      gameData[i][0] === gameData[i][1] &&
      gameData[i][0] === gameData[i][2]
    ) {
      return gameData[i][0];
    }
  }
  // Checking the columns for equality
  for (let i = 0; i < gameData.length; i++) {
    if (
      gameData[0][i] > 0 &&
      gameData[0][i] === gameData[1][i] &&
      gameData[0][i] === gameData[2][i]
    ) {
      return gameData[0][i];
    }
  }
  // Diagonal: top left to bottom right
  if (
    gameData[0][0] > 0 &&
    gameData[0][0] === gameData[1][1] &&
    gameData[1][1] === gameData[2][2]
  ) {
    return gameData[0][0];
  }
  // Diagonal: bottom left to top right
  if (
    gameData[2][0] > 0 &&
    gameData[2][0] === gameData[1][1] &&
    gameData[1][1] === gameData[0][2]
  ) {
    return gameData[2][0];
  }

  // Draw
  if (currentRound === 9) {
    return -1;
  }

  return 0;
}

//////////////////////////////////////////////
// SELECT GAME FIELD //

function selectGameField(event) {
  if (event.target.tagName !== "LI" || playing) {
    return;
  }

  const selectedField = event.target;

  const selectedCol = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;

  if (gameData[selectedRow][selectedCol] > 0) {
    playerNameError.textContent = "Please select an empty filed!";
    return;
  } else {
    playerNameError.textContent = "";
  }

  selectedField.textContent = players[activePlayer].symbol;
  selectedField.classList.add("disabled");

  gameData[selectedRow][selectedCol] = activePlayer + 1;

  const winnerId = checkForGameOver();
  console.log(winnerId);

  endGame(winnerId);

  currentRound++;
  switchPlayer();
}

//////////////////////////////////////////////
// END GAME //
function endGame(winnerId) {
  if (winnerId !== 0) {
    endGameEl.style.display = "block";
    playing = true;
    if (winnerId === -1) {
      endGameEl.firstElementChild.textContent = `It's a DRAW, please try again!`;
    } else {
      winnerNameEl.textContent = players[winnerId - 1].name;
    }
  }
}

//////////////////////////////////////////////
// FADE HANDLE //

const fadeHandler = function (event, opacity) {
  const selectedField = event.target;
  const selectedCol = selectedField.dataset.col - 1;
  const selectedRow = selectedField.dataset.row - 1;
  if (gameData[selectedRow][selectedCol] <= 0) {
    boardBtn.forEach((btn) => {
      if (event.target.value === btn.value && !playing) {
        btn.textContent = opacity;
        return;
      }
    });
  }
};
