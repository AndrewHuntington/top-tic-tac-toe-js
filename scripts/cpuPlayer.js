import player from "./player.js";

// CPU Player AI
export default (name, team) => {
  // Inherit from Player
  const prototype = player(name, team);

  console.log("My name is", prototype.getName());
  console.log("My team is", prototype.getTeam());
  return Object.assign({}, prototype); //add ', {function1, etc...}' after proto
};
