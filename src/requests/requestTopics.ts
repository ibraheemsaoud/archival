import { ITopic } from "../interfaces/topic.interface";

const list: ITopic[] = [
  {
    id: "1",
    slug: "hauteCouture",
    title: "Haute Couture",
    description:
      "Check out all the new shows from the biggest brands in the fashion world.",
  },
  {
    id: "2",
    slug: "readyToWear",
    title: "Ready to Wear",
    description: "All the new seasons from the brands you love and adore.",
  },
  {
    id: "3",
    slug: "music",
    title: "Music",
    description: "Keep up to date with what your favorite arists are doing rn.",
  },
  {
    id: "4",
    slug: "tv",
    title: "TV",
    description: "Keep updated with all the shows and their cultural empact.",
  },
  {
    id: "4",
    slug: "movies",
    title: "Movies",
    description: "Movies and their rollout, news and reviews.",
  },
];

export const requestTopics = () => {
  return {
    data: list,
    isLoading: false,
    error: undefined,
  };
};

export const requestTopic = (query: { id?: string; slug?: string }) => {
  const topic = list.find(
    (topic) => topic.id === query.id || topic.slug === query.slug
  );
  return {
    data: topic,
    isLoading: false,
    error: undefined,
  };
};
