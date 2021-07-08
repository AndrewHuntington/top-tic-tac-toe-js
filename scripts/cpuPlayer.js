import player from "./player.js";
import game from "./game.js";
import gameBoard from "./gameBoard.js";

// CPU Player AI
export default (name, team) => {
  // Inherit from Player
  const prototype = player(name, team);
  prototype.isCPU = true;
  const boardState = gameBoard.currentState;
  let isThinking = false;

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

  // Will choose a square at random
  async function cpuTakeTurn() {
    if (game.gameOver) return;

    this.isThinking = true;
    const delay = _randomNumber(250, 2000);
    let index = Math.floor(Math.random() * boardState.length);
    while (boardState[index] !== "&nbsp;") {
      index = Math.floor(Math.random() * boardState.length);
    }
    await _sleep(delay);
    gameBoard.takeTurn(boardState, index);
    this.isThinking = false;
  }

  // Will use a minimax algorithm to play a game unwinnable by a human opponent
  // Can assume the CPU player is always player 'O'
  async function cpuTakeBestTurn() {
    if (game.gameOver) return;

    const delay = _randomNumber(250, 2000);
    let bestScore = -Infinity;
    let move;
    this.isThinking = true;

    await _sleep(delay);
    boardState.forEach((sq, index) => {
      if (sq === "&nbsp;") {
        gameBoard.currentState[index] = "O";
        let score = _minimax(boardState, 0, false);
        gameBoard.currentState[index] = "&nbsp;";
        if (score > bestScore) {
          bestScore = score;
          move = index;
        }
      }
    });

    // Make sure game turn is returned to player O
    game.turn = "O";
    gameBoard.takeTurn(boardState, move);
    this.isThinking = false;
  }

  let _scores = {
    X: -1,
    O: 1,
    tie: 0,
  };

  function _minimax(board, depth, isMaximizing) {
    // change the game turn each for each call of _minimax()
    game.turn = game.changeTurn(game.turn);

    // check for win after the setting the new turn
    let result = game.checkWin();
    if (!!result) {
      return _scores[result];
    }

    if (isMaximizing) {
      let bestScore = -Infinity;

      board.forEach((sq, index) => {
        if (sq === "&nbsp;") {
          gameBoard.currentState[index] = "O";
          let score = _minimax(board, depth + 1, false);
          gameBoard.currentState[index] = "&nbsp;";
          bestScore = Math.max(score, bestScore);
        }
      });

      return bestScore;
    } else {
      let bestScore = Infinity;

      board.forEach((sq, index) => {
        if (sq === "&nbsp;") {
          gameBoard.currentState[index] = "X";
          let score = _minimax(board, depth + 1, true);
          gameBoard.currentState[index] = "&nbsp;";
          bestScore = Math.min(score, bestScore);
        }
      });

      return bestScore;
    }
  }

  return Object.assign({}, prototype, {
    cpuTakeTurn,
    cpuTakeBestTurn,
    isThinking,
    boardState,
  });
};
