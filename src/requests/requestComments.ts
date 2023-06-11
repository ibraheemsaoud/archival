import { IComment } from "../interfaces/comment.interface";

const list: IComment[] = [
  {
    id: "1",
    content: "Comment 1",
    timestamp: new Date(),
    userId: "1",
    entryId: "1",
  },
  {
    id: "2",
    content: "Comment 2",
    timestamp: new Date(),
    userId: "1",
    entryId: "1",
  },
  {
    id: "3",
    content: "Comment 3",
    timestamp: new Date(),
    userId: "2",
    entryId: "2",
  },
  {
    id: "4",
    content: "Comment 4",
    timestamp: new Date(),
    userId: "2",
    entryId: "2",
  },
  {
    id: "5",
    content: "Comment 5",
    timestamp: new Date(),
    userId: "3",
    entryId: "3",
  },
  {
    id: "6",
    content: "Comment 6",
    timestamp: new Date(),
    userId: "3",
    entryId: "3",
  },
];

export const requestComment = (commentId: string) => {
  const comment = list.filter((comment) => comment.id === commentId)?.[0];
  return {
    data: comment,
    isLoading: false,
    error: undefined,
  };
};

export const requestComments = (entryId: string) => {
  const comments = list.filter((comment) => comment.entryId === entryId);
  return {
    data: comments,
    isLoading: false,
    error: undefined,
  };
};
