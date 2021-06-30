import player from "./player.js";

// CPU Player AI
export default (name, team) => {
  const prototype = player(name, team);
  name = "CPU " + prototype.getName();

  console.log("My name is", name);
  console.log("My team is", prototype.getTeam());
  return Object.assign({}, prototype); //add ', {function1, etc...}' after proto
};
