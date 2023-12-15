import { Box, Typography } from "@mui/material";
import { useUser } from "../../../hooks";
import { useRequestAddPostToStyling } from "../../../requests/useRequestStyling";
import { IPost } from "../../../interfaces/post.interface";
import { PostSearch } from "../../../components";
import { IStyling } from "../../../interfaces/styling.interface";

export const PostAddition = ({ styling }: { styling: IStyling }) => {
  const { mutate, isLoading } = useRequestAddPostToStyling(styling);
  const { user } = useUser();

  const onSelect = (post: IPost | null) => {
    if (!user || !post) return;
    mutate(post.$id);
  };

  const postIds = styling.posts.map((post) => post.$id);
  postIds.push(styling.mainPost.$id);

  return (
    <Box position="relative" padding="24px 12px">
      <Typography
        variant="h6"
        component="div"
        sx={{
          textDecoration: "underline",
          marginBottom: 1,
        }}
      >
        Add Linked Post for the Items and Inspirations
      </Typography>

      <PostSearch
        onSelect={onSelect}
        excludedIds={postIds}
        isDisabled={isLoading}
      />
    </Box>
  );
};
