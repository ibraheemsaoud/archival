import { Box, Button } from "@mui/material";
import { IPost } from "../../../interfaces/post.interface";

export const Post = ({ post }: { post: IPost }) => {
  const commonProps: any = {
    width: "75px",
    height: "100px",
    borderRadius: 2,
    // margin: 1,
    overflow: "hidden",
  };
  const imageProps = post.pictureLink
    ? {
        backgroundImage: `url(${post.pictureLink})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }
    : {};

  return (
    <Button
      size="small"
      variant="text"
      sx={{
        backgroundColor: "transparent",
        minWidth: 108,
        maxWidth: 108,
        maxHeight: 144,
        minHeight: 144,
        marginTop: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            background: "#8b8e8e",
            color: "#ffffff",
            ...commonProps,
            ...imageProps,
          }}
        />
        {post.postTitle}
      </Box>
    </Button>
  );
};
