export default (name, team) => {
  // Assign player either X or O
  // Do other player stuff here if needed
  if (name.length === 0) {
    team === "X" ? (name = "Player X") : (name = "Player O");
  }

  return { name, team };
};
