import player from "./player.js";
import game from "./game.js";
import gameBoard from "./gameBoard.js";

// CPU Player AI
export default (name, team) => {
  // Inherit from Player
  const prototype = player(name, team);
  prototype.isCPU = true;

  // Used to give a delay to the CPU Player's actions
  const _sleep = (ms) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Used to create a delay range
  const _randomNumber = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  //TODO: Implement minimax algorithm to make smarter AI
  async function cpuTakeTurn() {
    if (game.gameOver) return;

    const boardState = gameBoard.currentState;
    const delay = _randomNumber(250, 2000);
    let index = Math.floor(Math.random() * boardState.length);
    while (boardState[index] !== "&nbsp;") {
      index = Math.floor(Math.random() * boardState.length);
    }
    await _sleep(delay);
    gameBoard.takeTurn(boardState, index);

    console.log("My turn!");
  }

  return Object.assign({}, prototype, { cpuTakeTurn });
};
