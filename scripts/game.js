import player from "./player.js";
import cpuPlayer from "./cpuPlayer.js";
import gameBoard from "./gameBoard.js";
import displayController from "./displayController.js";

export default (() => {
  // TODO: Find another way to get player names.
  // General game variables
  let gameOver = false;
  let newGame = true;
  let cpuOn = false;
  let playerX, playerO, turn, winner;

  // For use with start()
  const playerInfo = document.querySelector("#player-info");
  const container = document.querySelector("#container");

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
        this.winner = this.turn;
        // TODO: Remove alert and display info on page
        alert(
          `${
            this.turn === "X" ? this.playerX.getName() : this.playerO.getName()
          } [${this.turn}] WINS!`
        );
        // TODO: Remove (For debugging only)
        // console.log(
        //   `${
        //     this.turn === "X" ? this.playerX.getName() : this.playerO.getName()
        //   } [${this.turn}] WINS!`
        // );
        return this.winner;
      }
    }

    if (gameBoard.currentState.find(_equalsEmpty) === undefined) {
      this.winner = "tie";
      // TODO: Change like above
      alert("Tie game! Too bad!");
      // TODO: Remove (For debugging only)
      // console.log("Tie game! Too bad!");
      return this.winner;
    } else {
      return false;
    }
  }

  function changeTurn(playerTurn) {
    return playerTurn === "X" ? this.playerO.getTeam() : this.playerX.getTeam();
  }

  function start() {
    //TODO: Change from using an alert
    const _nameX = prompt("Please enter the name for who will be X:");
    const _nameO = prompt("Please enter the name for who will be O:");
    this.playerX = player(_nameX, "X");

    //TODO: Implement better way to choose CPU Player
    if (_nameO === "CPU") {
      this.playerO = cpuPlayer(_nameO, "O");
      cpuOn = true;
    } else {
      this.playerO = player(_nameO, "O");
    }

    const _randomNum = Math.round(Math.random());
    this.turn = _randomNum === 1 ? "X" : "O";

    // // X always goes first (for debugging)
    // this.turn = "X";

    alert(
      `${
        this.turn === "X" ? this.playerX.getName() : this.playerO.getName()
      } [${this.turn}] goes first!`
    );

    displayController.displayPlayerInfo();
    if (newGame) {
      if (this.playerO.getName() !== "CPU") cpuOn = false;
      displayController.displayInitBoardState();
      if (cpuOn && this.turn === "O") this.playerO.cpuTakeTurn();
      newGame = false;
    } else {
      displayController.displayUpdatedBoardState();
    }
  }

  function reset() {
    gameBoard.resetBoard();
    displayController.displayUpdatedBoardState();
  }

  return {
    start,
    reset,
    turn,
    winner,
    changeTurn,
    playerX,
    playerO,
    checkWin,
    gameOver,
  };
})();
