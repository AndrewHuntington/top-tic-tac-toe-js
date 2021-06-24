import game from "./game.js";
import gameBoard from "./gameBoard.js";

export default (() => {
  // Player info variables
  const _playerInfo = document.querySelector("#player-info");
  const _container = document.querySelector("#container");

  // Board variables
  const _boardArea = document.querySelector("#game-board");
  const _boardState = gameBoard.currentState;

  const displayPlayerInfo = () => {
    _playerInfo.classList.toggle("invisible");
    _container.classList.toggle("invisible");

    const playerDisplay = document.querySelector("#player-display");

    playerDisplay.innerHTML = `${game.playerX.name} Vs. ${game.playerO.name}`;
    displayPlayerTurn();
    _resetButtonController();
    _newGameButtonController();
  };

  const displayPlayerTurn = () => {
    const playerTurn = document.querySelector("#player-turn");

    playerTurn.innerHTML = `Player Turn: ${
      game.turn === "X" ? game.playerX.name : game.playerO.name
    } [${game.turn}]`;
  };

  const _resetButtonController = () => {
    const resetBtn = document.querySelector("#reset-btn");
    resetBtn.addEventListener("click", (e) => {
      game.reset();
    });
  };

  const _newGameButtonController = () => {
    const newGameBtn = document.querySelector("#new-game-btn");
    newGameBtn.addEventListener("click", (e) => {
      _playerInfo.classList.toggle("invisible");
      _container.classList.toggle("invisible");
      game.reset();
      game.start();
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
