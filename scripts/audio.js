export default () => {
  const playerSound = () => {
    const audio = new Audio("../sounds/player-move.mp3");
    audio.play();
  };

  const cpuSound = () => {
    const audio = new Audio("../sounds/cpu-move.mp3");
    audio.play();
  };

  const winSound = () => {
    const audio = new Audio("../sounds/win.mp3");
    audio.play();
  };

  const loseSound = () => {
    const audio = new Audio("../sounds/lose.mp3");
    audio.play();
  };

  const tieSound = () => {
    const audio = new Audio("../sounds/tie.mp3");
    audio.play();
  };
  return { playerSound, cpuSound, winSound, loseSound, tieSound };
};
