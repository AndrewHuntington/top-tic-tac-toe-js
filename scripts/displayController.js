import game from "./game.js";
import gameBoard from "./gameBoard.js";

export default (() => {
  // Display game board to index.html
  const _boardArea = document.querySelector("#game-board");
  const _boardState = gameBoard.currentState;

  const displayPlayerInfo = () => {
    // Display player names and turn on game screen
    const playerDisplay = document.querySelector("#player-display");

    playerDisplay.innerHTML = `${game.playerX.name} Vs. ${game.playerO.name}`;
    displayPlayerTurn();
    resetButtonController();
  };

  const displayPlayerTurn = () => {
    const playerTurn = document.querySelector("#player-turn");

    playerTurn.innerHTML = `Player Turn: ${
      game.turn === "X" ? game.playerX.name : game.playerO.name
    } [${game.turn}]`;
  };

  const resetButtonController = () => {
    const resetBtn = document.querySelector("#reset-btn");
    resetBtn.addEventListener("click", (e) => {
      game.reset();
    });
  };

  const displayInitBoardState = () => {
    _boardState.forEach((sq, index) => {
      const square = document.createElement("div");
      square.classList.add("board-square");
      square.setAttribute("data-index", index);
      square.addEventListener("click", function () {
        gameBoard.cellClick(index);
      });

      square.innerHTML = `<div class ="sq-text"> ${sq} </div>`;
      _boardArea.appendChild(square);
    });
  };

  const displayUpdatedBoardState = () => {
    const squares = _boardArea.querySelectorAll(".board-square");
    squares.forEach((sq, index) => {
      sq.firstChild.innerHTML = _boardState[index];
    });
  };

  const displayStartButton = () => {
    const startBtn = document.querySelector("#start-btn");
    const startBtnContainer = document.querySelector("#start-btn-container");
    startBtn.addEventListener("click", (e) => {
      startBtnContainer.classList.toggle("invisible");
      game.start();
    });
  };

  return {
    displayInitBoardState,
    displayUpdatedBoardState,
    displayPlayerInfo,
    displayPlayerTurn,
    displayStartButton,
  };
})();
