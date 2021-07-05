import player from "./player.js";

// CPU Player AI
export default (name, team) => {
  // Inherit from Player
  const prototype = player(name, team);
  prototype.isCPU = true;

  //TODO: Pick a random square
  function cpuTakeTurn() {
    // Get game board array
    // Filter out taken squares
    // Pick random available square
    // Display on screen
    // Change turn

    console.log("My turn!");
  }

  return Object.assign({}, prototype, { cpuTakeTurn });
};
