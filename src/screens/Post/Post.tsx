import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IPost } from "../../interfaces/post.interface";
import { AppWrapper } from "../../components";
import { IReference } from "../../interfaces/reference.interface";

export const Post = () => {
  const { references, post } = useLoaderData() as any as {
    references?: IReference[];
    post?: IPost;
  };

  if (!post) return <div>Loading...</div>;

  return (
    <AppWrapper>
      <Box sx={{ flexGrow: 1 }}>{post.pictureLink}</Box>
      {references?.map((reference: IReference) => {
        return <div>{reference.referenceType}</div>;
      })}
    </AppWrapper>
  );
};
