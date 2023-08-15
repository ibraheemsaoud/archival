import { Params } from "react-router-dom";
import { requestPost } from "../../requests/requestPost";
import { requestReferences } from "../../requests/requestReference";
import { requestComments } from "../../requests/requestComment";

export const postLoader =
  () =>
  async ({ params }: { params: Params<string> }) => {
    const { data: references } = await requestReferences(params.postId);
    const { data: post } = await requestPost(params.postId);
    const { data: comments } = await requestComments(params.postId);

    return {
      references,
      post,
      comments,
    };
  };
