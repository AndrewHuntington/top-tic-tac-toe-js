import game from "./game.js";
import gameBoard from "./gameBoard.js";

export default (() => {
  // Info area variables
  const _playerInfo = document.querySelector("#player-info");
  const _container = document.querySelector("#container");

  // Board area variables
  const _boardArea = document.querySelector("#game-board");
  const _boardState = gameBoard.currentState;

  // Other commonly used variables
  const _winScreen = document.querySelector("#win-screen");
  const _title = document.querySelector("#title");
  const _inputScreen = document.querySelector("#input-screen");
  let _startTurnButtonCreated, _checkboxCreated;

  const displayPlayerInfo = () => {
    _playerInfo.classList.toggle("invisible");
    _container.classList.toggle("invisible");

    const playerDisplay = document.querySelector("#player-display");

    playerDisplay.innerHTML = `${game.playerX.getName()} Vs. ${game.playerO.getName()}`;
    displayPlayerTurn();
  };

  const displayPlayerTurn = () => {
    const playerTurn = document.querySelector("#player-turn");

    playerTurn.innerHTML = `Player Turn: ${
      game.turn === "X" ? game.playerX.getName() : game.playerO.getName()
    } [${game.turn}]`;
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

  const _gameSetup = () => {
    const welcomeScreen = document.querySelector("#welcome-screen");
    let xInput = document.querySelector("#player-x-name");
    let oInput = document.querySelector("#player-o-name");
    const cpuCheckbox = document.querySelector("#cpu-check");

    welcomeScreen.classList.add("invisible");
    _inputScreen.classList.toggle("invisible");
    _title.innerHTML = "Register your information:";
    xInput.value = "";
    oInput.value = "";
    oInput.disabled = false;
    cpuCheckbox.checked = false;
  };

  const _displayCPUCheckbox = () => {
    const cpuCheckbox = document.querySelector("#cpu-check");
    const oInput = document.querySelector("#player-o-name");
    oInput.disabled = false;

    if (!_checkboxCreated) {
      cpuCheckbox.addEventListener("click", (e) => {
        oInput.disabled = !oInput.disabled;
        if (oInput.disabled) oInput.value = "CPU";
        if (!oInput.disabled) oInput.value = "";
      });
      _checkboxCreated = true;
    }
  };

  const displayStartButton = () => {
    const startBtn = document.querySelector("#start-btn");
    startBtn.addEventListener("click", (e) => {
      _displayCPUCheckbox();
      _gameSetup();
    });
  };

  const displayPlayButton = () => {
    const playBtn = document.querySelector("#play-btn");
    const turnNotificationArea = document.querySelector("#turn-notification");

    playBtn.addEventListener("click", (e) => {
      game.setPlayers();
      _inputScreen.classList.toggle("invisible");
      _title.innerHTML = "Tic-Tac-Toe!";
      turnNotificationArea.classList.toggle("invisible");
      displayStartTurnButton();
      _startTurnButtonCreated = true;
    });
  };

  const displayStartTurnButton = () => {
    const turnNotificationArea = document.querySelector("#turn-notification");
    const startTurnBrn = document.querySelector("#turn-start-btn");
    const turnMsg = document.querySelector("#starting-turn");
    const { playerX, playerO } = game.getPlayers();

    turnMsg.innerHTML = `${
      game.turn === "X" ? playerX.getName() : playerO.getName()
    } [${game.turn}] goes first!`;

    if (!_startTurnButtonCreated) {
      startTurnBrn.addEventListener("click", (e) => {
        _title.classList.toggle("position-abs");
        title.classList.toggle("position-rel");
        turnNotificationArea.classList.toggle("invisible");
        game.start();
      });
    }
  };

  const displayWinScreen = () => {
    _winScreen.classList.toggle("invisible");
    _title.innerHTML = "GAME OVER";
  };

  const displayReplayBtn = () => {
    const replayBtn = document.querySelector("#replay-btn");

    replayBtn.addEventListener("click", (e) => {
      _playerInfo.classList.toggle("invisible");
      _container.classList.toggle("invisible");
      _winScreen.classList.toggle("invisible");
      game.reset();
      _title.classList.toggle("position-abs");
      _title.classList.toggle("position-rel");
      _gameSetup();
    });
  };

  return {
    displayInitBoardState,
    displayUpdatedBoardState,
    displayPlayerInfo,
    displayPlayerTurn,
    displayStartButton,
    displayPlayButton,
    displayWinScreen,
    displayReplayBtn,
    displayStartButton,
    displayStartTurnButton,
  };
})();
