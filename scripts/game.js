import player from "./player.js";
import cpuPlayer from "./cpuPlayer.js";
import gameBoard from "./gameBoard.js";
import displayController from "./displayController.js";
import audio from "./audio.js";

export default (() => {
  // General game variables
  let gameOver = false;
  let cpuOn = false;
  let firstGame = true;
  let playerX, playerO, turn, winner;

  // For use with start()
  const playerInfo = document.querySelector("#player-info");
  const container = document.querySelector("#container");

  // For use with checkWin()
  const equalsX = (e) => e === "X";
  const equalsO = (e) => e === "O";
  const equalsEmpty = (e) => e === "&nbsp;";

  function checkWin() {
    const winCombo = {
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

    const winMsg = document.querySelector("#winning-player");
    for (const combo in winCombo) {
      if (winCombo[combo].every(equalsX) || winCombo[combo].every(equalsO)) {
        this.winner = this.turn;
        displayController.displayWinScreen();
        winMsg.innerHTML = `${
          this.turn === "X" ? this.playerX.getName() : this.playerO.getName()
        } [${this.turn}] WINS!`;

        if (cpuOn && this.turn === "O") {
          this.audio.loseSound();
        } else {
          this.audio.winSound();
        }

        return this.winner;
      }
    }

    if (gameBoard.currentState.find(equalsEmpty) === undefined) {
      this.winner = "tie";
      displayController.displayWinScreen();
      winMsg.innerHTML = "Tie game! Too bad!";
      this.audio.tieSound();
      return this.winner;
    } else {
      return false;
    }
  }

  function changeTurn(playerTurn) {
    return playerTurn === "X" ? this.playerO.getTeam() : this.playerX.getTeam();
  }

  function setPlayers() {
    const nameX = document.querySelector("#player-x-name").value;
    const nameO = document.querySelector("#player-o-name").value;
    const cpuCheckbox = document.querySelector("#cpu-check");
    this.playerX = player(nameX, "X");

    if (cpuCheckbox.checked) {
      this.playerO = cpuPlayer(nameO, "O");
      cpuOn = true;
    } else {
      this.playerO = player(nameO, "O");
    }

    const randomNum = Math.round(Math.random());
    this.turn = randomNum === 1 ? "X" : "O";
  }

  function getPlayers() {
    return { playerX: this.playerX, playerO: this.playerO };
  }

  function start() {
    this.audio = audio();
    displayController.displayPlayerInfo();
    if (this.playerO.getName() !== "CPU") cpuOn = false;
    if (firstGame) {
      displayController.displayInitBoardState();
      firstGame = false;
    }
    if (cpuOn && this.turn === "O") this.playerO.cpuTakeTurn();
  }

  function reset() {
    gameBoard.resetBoard();
    displayController.displayUpdatedBoardState();
  }

  return {
    audio,
    start,
    reset,
    turn,
    winner,
    changeTurn,
    playerX,
    playerO,
    checkWin,
    gameOver,
    setPlayers,
    getPlayers,
  };
})();
