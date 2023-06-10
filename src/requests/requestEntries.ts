import { IEntery } from "../interfaces/entery.interface";

const list: IEntery[] = [
  {
    id: "1",
    title: "Entery 1",
    timestamp: new Date(),
    userId: "1",
    eraId: "1",
    type: "Analysis",
  },
  {
    id: "2",
    title: "Entery 2",
    timestamp: new Date(),
    userId: "1",
    eraId: "1",
    type: "Analysis",
  },
  {
    id: "3",
    title: "Entery 3",
    timestamp: new Date(),
    userId: "1",
    eraId: "1",
    type: "Analysis",
  },
  {
    id: "4",
    title: "Entery 4",
    timestamp: new Date(),
    userId: "1",
    eraId: "2",
    type: "Analysis",
  },
  {
    id: "5",
    title: "Entery 5",
    timestamp: new Date(),
    userId: "1",
    eraId: "2",
    type: "Analysis",
  },
  {
    id: "6",
    title: "Entery 6",
    timestamp: new Date(),
    userId: "1",
    eraId: "3",
    type: "Analysis",
  },
];

export const requestEntey = (entryId: string) => {
  const entry = list.filter((entry) => entry.id === entryId)?.[0];
  return {
    data: entry,
    isLoading: false,
    error: undefined,
  };
};

export const requestEntries = (eraId: string) => {
  const entries = list.filter((entry) => entry.eraId === eraId);
  return {
    data: entries,
    isLoading: false,
    error: undefined,
  };
};
