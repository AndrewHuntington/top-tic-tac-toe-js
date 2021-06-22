// TODO: Separate code into different files

// Factory Functions
const player = (name, team) => {
  // Assign player either X or O
  // Do other player stuff here if needed
  if (name.length === 0) {
    team === "X" ? (name = "Player X") : (name = "Player O");
  }

  return { name, team };
};

// Modules
const gameBoard = (() => {
  // dummy values
  // const currentState = ["X", "O", "X", "O", "X", "O", "O", "X", "X"];
  const currentState = [
    "&nbsp;",
    "&nbsp;",
    "&nbsp;",
    "&nbsp;",
    "&nbsp;",
    "&nbsp;",
    "&nbsp;",
    "&nbsp;",
    "&nbsp;",
  ];

  return { currentState };
})();

const displayController = (() => {
  // Display game board to index.html
  const _boardArea = document.querySelector("#game-board");
  const _boardState = gameBoard.currentState;

  const displayBoardState = () => {
    gameBoard.currentState.forEach((sq, index) => {
      const square = document.createElement("div");
      square.classList.add("board-square");
      square.setAttribute("data-index", index);

      square.innerHTML = `<div class ="sq-text"> ${sq} </div>`;
      _boardArea.appendChild(square);
    });
  };

  return { displayBoardState };
})();

const game = (() => {
  // Run game logic here
  // TODO: Find another way to get player names.
  let nameX = prompt("Please enter the name for who will be X:");
  let nameO = prompt("Please enter the name for who will be O:");
  const playerX = player(nameX, "X");
  const playerO = player(nameO, "O");

  console.log({ playerX });
  console.log({ playerO });

  const start = () => {
    displayController.displayBoardState();
  };

  return { start };
})();

game.start();
