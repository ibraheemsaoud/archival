import { ITopic } from "../interfaces/topic.interface";

const list: ITopic[] = [
  {
    id: "1",
    title: "Haute Couture",
    description:
      "Check out all the new shows from the biggest brands in the fashion world.",
  },
  {
    id: "2",
    title: "Ready to Wear",
    description: "All the new seasons from the brands you love and adore.",
  },
  {
    id: "3",
    title: "Music",
    description: "Keep up to date with what your favorite arists are doing rn.",
  },
  {
    id: "4",
    title: "TV",
    description: "Keep updated with all the shows and their cultural empact.",
  },
  {
    id: "4",
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
