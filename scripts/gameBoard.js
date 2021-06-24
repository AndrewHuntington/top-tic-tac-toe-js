import game from "./game.js";
import displayController from "./displayController.js";

export default (() => {
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

  function resetBoard() {
    currentState.forEach((e, index) => {
      currentState[index] = "&nbsp;";
    });

    if (game.gameOver) {
      game.gameOver = false;
    }
  }

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

  return { currentState, resetBoard, cellClick };
})();