//TODO: Game Features:
// * Implement win/lose/draw conditions
// * Include a button to start/restart the game
// * Add display element that congratulates the winner
// * Find alternatives to alerts/pop-ups
// * Make play area responsive (see Snake YT video?)
// * Find out why letters aren't centered vertically
// * Add sound (Pitfall SFX?)
// * Style (Green motif)
// * Implement PvP and PvCPU

import player from "./player.js";
import displayController from "./displayController.js";
import gameBoard from "./gameBoard.js";

const game = (() => {
  // Run game logic here
  // TODO: Find another way to get player names.
  let gameOver = false;
  const _nameX = prompt("Please enter the name for who will be X:");
  const _nameO = prompt("Please enter the name for who will be O:");
  const playerX = player(_nameX, "X");
  const playerO = player(_nameO, "O");
  const _randomNum = Math.round(Math.random());
  let turn = _randomNum === 1 ? "X" : "O";

  const _equalsX = (e) => e === "X";
  const _equalsO = (e) => e === "O";
  const _equalsEmpty = (e) => e === "&nbsp;";

  const checkWin = () => {
    const _winCombo = {
      // TODO: Finish win conditions
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
        alert(`${turn === "X" ? playerX.name : playerO.name} [${turn}] WINS!`);
        return true;
      }
    }

    if (gameBoard.currentState.find(_equalsEmpty) === undefined) {
      alert("Tie game! Too bad!");
      return true;
    } else {
      return false;
    }
  };

  const changeTurn = (playerTurn) => {
    return playerTurn === "X" ? playerO.team : playerX.team;
  };

  const start = () => {
    //TODO: Change from using an alert
    alert(
      `${turn === "X" ? playerX.name : playerO.name} [${turn}] goes first!`
    );
    displayController.displayPlayerInfo();
    displayController.displayInitBoardState();
  };

  return { start, turn, changeTurn, playerX, playerO, checkWin, gameOver };
})();

game.start();

export { game };
