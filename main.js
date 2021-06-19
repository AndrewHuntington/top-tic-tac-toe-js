// TODO: Separate code into different files

const gameBoard = (() => {
  // TODO: Remove hardcoded values
  const currentState = ["X", "O", "X", "O", "X", "O", "O", "X", "X"];

  return { currentState };
})();

const player = (name) => {
  // Assign player either X or O
  // Do other player stuff here if needed
};

const displayController = (() => {
  // Display game board to index.html
  const _boardArea = document.querySelector("#game-board");
  const _boardState = gameBoard.currentState;

  const displayBoardState = () => {
    console.log(_boardState);
  };

  return { displayBoardState };
})();

const game = (() => {
  // Run game logic here
  const start = () => {
    displayController.displayBoardState();
  };

  return { start };
})();

game.start();
