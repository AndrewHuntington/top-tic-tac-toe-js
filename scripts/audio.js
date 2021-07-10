export default () => {
  // To make work on GitHub Pages
  const GITHUB_URL =
    "https://github.com/AndrewHuntington/top-tic-tac-toe-js/raw/master/sounds/";

  const playerSound = () => {
    // const audio = new Audio("../sounds/player-move.mp3");
    const audio = new Audio(`${GITHUB_URL}player-move.mp3`);
    audio.play();
  };

  const cpuSound = () => {
    // const audio = new Audio("../sounds/cpu-move.mp3");
    const audio = new Audio(`${GITHUB_URL}cpu-move.mp3`);
    audio.play();
  };

  const winSound = () => {
    // const audio = new Audio("../sounds/win.mp3");
    const audio = new Audio(`${GITHUB_URL}win.mp3`);
    audio.play();
  };

  const loseSound = () => {
    // const audio = new Audio("../sounds/lose.mp3");
    const audio = new Audio(`${GITHUB_URL}lose.mp3`);
    audio.play();
  };

  const tieSound = () => {
    // const audio = new Audio("../sounds/tie.mp3");
    const audio = new Audio(`${GITHUB_URL}tie.mp3`);
    audio.play();
  };
  return { playerSound, cpuSound, winSound, loseSound, tieSound };
};
