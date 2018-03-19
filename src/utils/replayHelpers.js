export const formatGameMode = (numPlayers) => {
  const firstNum = parseInt(numPlayers / 2);
  const secondNum = numPlayers - firstNum;
  return `${secondNum}v${firstNum}`;
};
