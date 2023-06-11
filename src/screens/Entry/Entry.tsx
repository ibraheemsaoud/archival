import { useLoaderData } from "react-router-dom";
import { IEntry } from "../../interfaces/entry.interface";
import { IComment } from "../../interfaces/comment.interface";
import { AppWrapper } from "../../components";

export const Entry = () => {
  const { entry, comments } = useLoaderData() as any as {
    entry: IEntry;
    comments: IComment[];
  };
  if (!entry) return <div>Not found</div>;
  if (!comments) return <div>Loading...</div>;
  return (
    <AppWrapper>
      <p>{entry.eraId}</p>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.content}</li>
        ))}
      </ul>
    </AppWrapper>
  );
};
