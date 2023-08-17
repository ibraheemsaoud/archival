import { IComment } from "./comment.interface";
import { IPost } from "./post.interface";
import { IReference } from "./reference.interface";

export type ISeasonData = IPost & {
  comments: IComment[];
  references: IReference[];
};
