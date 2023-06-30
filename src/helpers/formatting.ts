
export const turnStringToValidTeamName = (eraId: string) => {
  return eraId.slice(0, 36);
};