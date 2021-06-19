// TODO: Separate code into different files

// Factory Functions
const player = (name) => {
  // Assign player either X or O
  // Do other player stuff here if needed
};

// Modules
const gameBoard = (() => {
  // TODO: Remove hardcoded values
  const currentState = ["X", "O", "X", "O", "X", "O", "O", "X", "X"];

  return { currentState };
})();

const displayController = (() => {
  // Display game board to index.html
  const _boardArea = document.querySelector("#game-board");

  const _boardState = gameBoard.currentState;

  const displayBoardState = () => {
    for (const sq of gameBoard.currentState) {
      const square = document.createElement("div");
      square.classList.add("board-square");

      square.innerHTML = `<div class ="sq-text"> ${sq} </div>`;
      _boardArea.appendChild(square);
    }
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
