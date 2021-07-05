export default (name, team) => {
  const getName = () => name;
  const getTeam = () => team;
  const isCPU = false;

  if (name.length === 0) {
    team === "X" ? (name = "Player X") : (name = "Player O");
  }

  return { getName, getTeam, isCPU };
};
