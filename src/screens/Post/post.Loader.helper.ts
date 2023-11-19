import { Params } from "react-router-dom";

export const postLoader =
  () =>
  async ({ params }: { params: Params<string> }) => ({
    postId: params.postId,
  });
