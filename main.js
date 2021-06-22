// TODO: Refactor:
// * Separate code into different files

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
    const cellText = document.querySelector(`[data-index="${index}"]`)
      .firstChild.innerHTML;

    if (cellText !== "X" && cellText !== "O") {
      if (!game.gameOver) {
        currentState[index] = game.turn;
        displayController.displayUpdatedBoardState();
        game.gameOver = game.checkWin();
        game.turn = game.changeTurn(game.turn);
        displayController.displayPlayerTurn();
      }
    }
  };

  return { currentState, cellClick };
})();

const displayController = (() => {
  // Display game board to index.html
  const _boardArea = document.querySelector("#game-board");
  const _boardState = gameBoard.currentState;

  const displayPlayerInfo = () => {
    // Display player names and turn on game screen
    const playerDisplay = document.querySelector("#player-display");

    playerDisplay.innerHTML = `${game.playerX.name} Vs. ${game.playerO.name}`;
    displayPlayerTurn();
  };

  const displayPlayerTurn = () => {
    const playerTurn = document.querySelector("#player-turn");

    playerTurn.innerHTML = `Player Turn: ${
      game.turn === "X" ? game.playerX.name : game.playerO.name
    } [${game.turn}]`;
  };

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

  return {
    displayInitBoardState,
    displayUpdatedBoardState,
    displayPlayerInfo,
    displayPlayerTurn,
  };
})();

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

  const checkWin = () => {
    const _winCombo = {
      topRow: gameBoard.currentState.slice(0, 3),
      midRow: gameBoard.currentState.slice(3, 6),
      bottomRow: gameBoard.currentState.slice(6),
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

    return false;
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
