import { Params } from "react-router-dom";
import { requestPost } from "../../requests/requestPost";

export const postLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: post } = await requestPost(params.postId);

    return {
      post,
    };
  };
