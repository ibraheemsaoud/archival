import { IEntry, IEntryCreate } from "../interfaces/entry.interface";

export const entryList: IEntry[] = [
  {
    id: "1",
    title: "Runway show",
    timestamp: new Date("2021-01-03T00:00:00.000Z"),
    eraId: "1",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
    },
    link: "https://www.youtube.com/watch?v=UDYtcuWJR3Q",
    text: "In this collection Issey Miyake is inspired by the beauty of the nature. The collection is made of recycled materials.",
  },
  {
    id: "2",
    title: "Store link",
    timestamp: new Date("2021-01-01T00:00:00.000Z"),
    eraId: "1",
    type: "Analysis",
    interaction: {
      shares: 0,
      likes: 1,
      comments: 10,
      clicks: 2,
      reactions: 60,
    },
    link: "https://eu-store.isseymiyake.com/",
    text: "",
  },
  {
    id: "3",
    title: "Runway show",
    timestamp: new Date(),
    eraId: "3",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
    },
    link: "https://www.youtube.com/watch?v=sLkDxqI37TM",
    text: "",
  },
  {
    id: "4",
    title: "Website link",
    timestamp: new Date(),
    eraId: "3",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
    },
    link: "https://www.irisvanherpen.com/",
    text: "",
  },
  {
    id: "5",
    title: "Runway show",
    timestamp: new Date(),
    eraId: "2",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
    },
    link: "https://www.youtube.com/watch?v=6SX50BOmArI",
    text: "",
  },
  {
    id: "6",
    title: "Website link",
    timestamp: new Date(),
    eraId: "2",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
    },
    link: "https://www.luisvuitton.com/",
    text: "",
  },
  {
    id: "7",
    title: "Website link",
    timestamp: new Date(),
    eraId: "1",
    type: "Analysis",
    interaction: {
      shares: 1,
      likes: 10,
      comments: 20,
      clicks: 5,
      reactions: 120,
    },
    link: "https://cdn.shopify.com/s/files/1/0569/3554/7070/files/IM_top_brandtop_pc230501_2000x.jpg?v=1684145520",
    text: "",
  },
];

export const useRequestEntry = (entryId: string) => {
  const entry = entryList.filter((entry) => entry.id === entryId)?.[0];
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

  const entries = entryList.filter((entry) => entry.eraId === eraId);
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
      entryList.push({
        id: "7",
        title: entry.title,
        timestamp: new Date(),
        eraId: "2",
        type: "Analysis",
        interaction: {
          shares: 1,
          likes: 10,
          comments: 20,
          clicks: 5,
          reactions: 120,
        },
        link: "https://www.luisvuitton.com/",
        text: "",
      });
    },
  };
};
