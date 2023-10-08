export const turnStringToValidTeamName = (eraId: string) => {
  return eraId.slice(0, 36);
};

export const nameToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "")
    .slice(0, 36);
};
