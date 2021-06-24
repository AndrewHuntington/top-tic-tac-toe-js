import player from "./player.js";
import gameBoard from "./gameBoard.js";
import displayController from "./displayController.js";

export default (() => {
  // TODO: Find another way to get player names.
  // General game variables
  let gameOver = false;
  let playerX, playerO, turn;

  // For use with start()
  const _playerInfo = document.querySelector("#player-info");
  const _container = document.querySelector("#container");

  // For use with checkWin()
  const _equalsX = (e) => e === "X";
  const _equalsO = (e) => e === "O";
  const _equalsEmpty = (e) => e === "&nbsp;";

  function checkWin() {
    const _winCombo = {
      topRow: gameBoard.currentState.slice(0, 3),
      midRow: gameBoard.currentState.slice(3, 6),
      bottomRow: gameBoard.currentState.slice(6),
      leftCol: [
        gameBoard.currentState[0],
        gameBoard.currentState[3],
        gameBoard.currentState[6],
      ],
      midCol: [
        gameBoard.currentState[1],
        gameBoard.currentState[4],
        gameBoard.currentState[7],
      ],
      rightCol: [
        gameBoard.currentState[2],
        gameBoard.currentState[5],
        gameBoard.currentState[8],
      ],
      leftDiag: [
        gameBoard.currentState[0],
        gameBoard.currentState[4],
        gameBoard.currentState[8],
      ],
      rightDiag: [
        gameBoard.currentState[2],
        gameBoard.currentState[4],
        gameBoard.currentState[6],
      ],
    };

    for (const combo in _winCombo) {
      if (
        _winCombo[combo].every(_equalsX) ||
        _winCombo[combo].every(_equalsO)
      ) {
        alert(
          `${this.turn === "X" ? this.playerX.name : this.playerO.name} [${
            this.turn
          }] WINS!`
        );
        return true;
      }
    }

    if (gameBoard.currentState.find(_equalsEmpty) === undefined) {
      alert("Tie game! Too bad!");
      return true;
    } else {
      return false;
    }
  }

  function changeTurn(playerTurn) {
    return playerTurn === "X" ? this.playerO.team : this.playerX.team;
  }

  function start() {
    //TODO: Change from using an alert
    const _nameX = prompt("Please enter the name for who will be X:");
    const _nameO = prompt("Please enter the name for who will be O:");
    this.playerX = player(_nameX, "X");
    this.playerO = player(_nameO, "O");
    const _randomNum = Math.round(Math.random());
    this.turn = _randomNum === 1 ? "X" : "O";

    alert(
      `${this.turn === "X" ? this.playerX.name : this.playerO.name} [${
        this.turn
      }] goes first!`
    );

    _playerInfo.classList.toggle("invisible");
    _container.classList.toggle("invisible");

    displayController.displayPlayerInfo();
    displayController.displayInitBoardState();
  }

  function reset() {}

  return {
    start,
    reset,
    turn,
    changeTurn,
    playerX,
    playerO,
    checkWin,
    gameOver,
  };
})();
