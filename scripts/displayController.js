import game from "./game.js";
import gameBoard from "./gameBoard.js";

export default (() => {
  // Info area variables
  const _playerInfo = document.querySelector("#player-info");
  const _container = document.querySelector("#container");
  let _resetBtnCreated,
    _newGameBtnCreated = false;

  // Board area variables
  const _boardArea = document.querySelector("#game-board");
  const _boardState = gameBoard.currentState;

  const displayPlayerInfo = () => {
    _playerInfo.classList.toggle("invisible");
    _container.classList.toggle("invisible");

    const playerDisplay = document.querySelector("#player-display");

    playerDisplay.innerHTML = `${game.playerX.getName()} Vs. ${game.playerO.getName()}`;
    displayPlayerTurn();

    _resetButtonController();
    _newGameButtonController();
  };

  const displayPlayerTurn = () => {
    const playerTurn = document.querySelector("#player-turn");

    playerTurn.innerHTML = `Player Turn: ${
      game.turn === "X" ? game.playerX.getName() : game.playerO.getName()
    } [${game.turn}]`;
  };

  const _resetButtonController = () => {
    const resetBtn = document.querySelector("#reset-btn");
    if (!_resetBtnCreated) {
      resetBtn.addEventListener("click", (e) => {
        game.reset();
      });

      _resetBtnCreated = true;
    }
  };

  const _newGameButtonController = () => {
    const newGameBtn = document.querySelector("#new-game-btn");
    if (!_newGameBtnCreated) {
      newGameBtn.addEventListener("click", (e) => {
        _playerInfo.classList.toggle("invisible");
        _container.classList.toggle("invisible");
        game.reset();
        game.start();
      });

      _newGameBtnCreated = true;
    }
  };

  const displayInitBoardState = () => {
    _boardState.forEach((sq, index) => {
      const square = document.createElement("div");
      square.classList.add("board-square");
      square.setAttribute("data-index", index);
      square.addEventListener("click", function () {
        // Prevent human player from selecting a square while CPU is "thinking"
        if (game.playerO.isCPU && game.playerO.isThinking) return;
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
    const welcomeScreen = document.querySelector("#welcome-screen");
    startBtn.addEventListener("click", (e) => {
      welcomeScreen.classList.toggle("invisible");
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
