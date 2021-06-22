// TODO: Refactor:
// * Separate code into different files

//TODO: Game Features:
// * Stop players from over writing cells that already have a value
// * Implement win/lose/draw conditions
// * Find alternatives to alerts/pop-ups
// * Add sound (Pitfall SFX?)
// * Style (Green motif)

/*********
 * BEGIN CODE *
 **********/

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

  const cellClick = (index) => {
    // const cell = document.querySelector(`[data-index="${index}"]`);
    currentState[index] = game.turn;
    console.log({ currentState }); //TODO: REMOVE
    displayController.displayUpdatedBoardState();
    game.turn = game.changeTurn(game.turn);
  };

  return { currentState, cellClick };
})();

const displayController = (() => {
  // Display game board to index.html
  const _boardArea = document.querySelector("#game-board");
  const _boardState = gameBoard.currentState;

  const displayInitBoardState = () => {
    _boardState.forEach((sq, index) => {
      const square = document.createElement("div");
      square.classList.add("board-square");
      square.setAttribute("data-index", index);
      square.addEventListener("click", function () {
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

  return { displayInitBoardState, displayUpdatedBoardState };
})();

const game = (() => {
  // Run game logic here
  // TODO: Find another way to get player names.
  const _nameX = prompt("Please enter the name for who will be X:");
  const _nameO = prompt("Please enter the name for who will be O:");
  const _playerX = player(_nameX, "X");
  const _playerO = player(_nameO, "O");
  const randomNum = Math.round(Math.random());
  let turn = randomNum === 1 ? "X" : "O";

  // TODO: For debugging. Remove later.
  console.log({ _playerX });
  console.log({ _playerO });

  const changeTurn = (playerTurn) => {
    return playerTurn === "X" ? _playerO.team : _playerX.team;
  };

  const start = () => {
    //TODO: Change from using an alert
    alert(`${turn === "X" ? _nameX : _nameO} (${turn}) goes first!`);
    displayController.displayInitBoardState();
  };

  return { start, turn, changeTurn };
})();

game.start();
