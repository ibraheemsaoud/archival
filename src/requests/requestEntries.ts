import { IEntry } from "../interfaces/entry.interface";

const list: IEntry[] = [
  {
    id: "1",
    title: "Runway show",
    timestamp: new Date(),
    userId: "1",
    eraId: "1",
    type: "Analysis",
    variant: "link",
    link: "https://www.youtube.com/watch?v=UDYtcuWJR3Q",
  },
  {
    id: "2",
    title: "Store link",
    timestamp: new Date(),
    userId: "1",
    eraId: "1",
    type: "Analysis",
    variant: "link",
    link: "https://eu-store.isseymiyake.com/",
  },
  {
    id: "3",
    title: "Runway show",
    timestamp: new Date(),
    userId: "3",
    eraId: "3",
    type: "Analysis",
    variant: "link",
    link: "https://www.youtube.com/watch?v=sLkDxqI37TM",
  },
  {
    id: "4",
    title: "Website link",
    timestamp: new Date(),
    userId: "3",
    eraId: "3",
    type: "Analysis",
    variant: "link",
    link: "https://www.irisvanherpen.com/",
  },
  {
    id: "5",
    title: "Runway show",
    timestamp: new Date(),
    userId: "2",
    eraId: "2",
    type: "Analysis",
    variant: "link",
    link: "https://www.youtube.com/watch?v=6SX50BOmArI",
  },
  {
    id: "6",
    title: "Website link",
    timestamp: new Date(),
    userId: "2",
    eraId: "2",
    type: "Analysis",
    variant: "link",
    link: "https://www.luisvuitton.com/",
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

export const requestEntries = (eraId?: string) => {
  if (!eraId) {
    return {
      data: [],
      isLoading: false,
      error: undefined,
    };
  }

  const entries = list.filter((entry) => entry.eraId === eraId);
  return {
    data: entries,
    isLoading: false,
    error: undefined,
  };
};
