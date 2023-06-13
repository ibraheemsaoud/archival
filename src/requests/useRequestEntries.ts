import { IEntry, IEntryCreate } from "../interfaces/entry.interface";

const list: IEntry[] = [
  {
    id: "1",
    title: "Runway show",
    timestamp: new Date("2021-01-03T00:00:00.000Z"),
    userId: "1",
    eraId: "1",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
      height: 300,
    },
    variant: "normal",
    link: "https://www.youtube.com/watch?v=UDYtcuWJR3Q",
    text: "",
  },
  {
    id: "2",
    title: "Store link",
    timestamp: new Date("2021-01-01T00:00:00.000Z"),
    userId: "1",
    eraId: "1",
    type: "Analysis",
    interaction: {
      shares: 0,
      likes: 1,
      comments: 10,
      clicks: 2,
      reactions: 60,
      height: 120,
    },
    variant: "normal",
    link: "https://eu-store.isseymiyake.com/",
    text: "",
  },
  {
    id: "3",
    title: "Runway show",
    timestamp: new Date(),
    userId: "3",
    eraId: "3",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
      height: 300,
    },
    variant: "normal",
    link: "https://www.youtube.com/watch?v=sLkDxqI37TM",
    text: "",
  },
  {
    id: "4",
    title: "Website link",
    timestamp: new Date(),
    userId: "3",
    eraId: "3",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
      height: 300,
    },
    variant: "normal",
    link: "https://www.irisvanherpen.com/",
    text: "",
  },
  {
    id: "5",
    title: "Runway show",
    timestamp: new Date(),
    userId: "2",
    eraId: "2",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
      height: 300,
    },
    variant: "normal",
    link: "https://www.youtube.com/watch?v=6SX50BOmArI",
    text: "",
  },
  {
    id: "6",
    title: "Website link",
    timestamp: new Date(),
    userId: "2",
    eraId: "2",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
      height: 300,
    },
    variant: "normal",
    link: "https://www.luisvuitton.com/",
    text: "",
  },
];

export const useRequestEntry = (entryId: string) => {
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

export const useRequestCreateEntry = () => {
  return {
    data: undefined,
    isLoading: false,
    error: undefined,
    mutate: (entry: IEntryCreate) => {
      list.push({
        id: "7",
        title: entry.title,
        timestamp: new Date(),
        userId: "2",
        eraId: "2",
        type: "Analysis",
        interaction: {
          shares: 1,
          likes: 10,
          comments: 20,
          clicks: 5,
          reactions: 120,
          height: 300,
        },
        variant: "normal",
        link: "https://www.luisvuitton.com/",
        text: "",
      });
    },
  };
};
