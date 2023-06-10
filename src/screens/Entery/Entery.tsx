import React from "react";
import { useLoaderData } from "react-router-dom";
import { IEntery } from "../../interfaces/entery.interface";
import { IComment } from "../../interfaces/comment.interface";
import { Header } from "../../components";

export const Entery = () => {
  const { entry, comments } = useLoaderData() as any as {
    entry: IEntery;
    comments: IComment[];
  };
  if (!entry) return <div>Not found</div>;
  if (!comments) return <div>Loading...</div>;
  return (
    <div>
      <Header title={entry.title} />
      <p>{entry.eraId}</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </div>
  );
};
