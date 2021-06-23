import { game } from "./main.js";
import displayController from "./displayController.js";

export default (() => {
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
