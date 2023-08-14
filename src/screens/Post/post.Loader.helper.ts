import { Params } from "react-router-dom";
import { requestPost } from "../../requests/requestPost";
import { requestReferences } from "../../requests/requestReference";

export const postLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: references } = await requestReferences(params.postId);
    const { data: post } = await requestPost(params.postId);

    return {
      references,
      post,
    };
  };