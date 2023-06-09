import { ITopic } from "../interfaces/topic.interface";

const list: ITopic[] = [
  {
    id: "1",
    title: "topic 1",
    description: "topic 1 description",
  },
  {
    id: "2",
    title: "topic 2",
    description: "topic 2 description",
  },
  {
    id: "3",
    title: "topic 3",
    description: "topic 3 description",
  },
  {
    id: "4",
    title: "topic 4",
    description: "topic 4 description",
  },
];
export const requestTopics = () => {
  return {
    data: list,
    isLoading: false,
    error: undefined,
  };
};
