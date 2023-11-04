import { Box, Button } from "@mui/material";
import { IComment } from "../../interfaces/comment.interface";
import { useUser } from "../../hooks";
import { useRequestUserProfile } from "../../requests/useRequestUserProfile";

export const Comment = ({
  comment,
  onDelete,
}: {
  comment: IComment;
  onDelete: (commentId: string) => void;
}) => {
  const { user } = useUser();
  const { data: userProfile, isLoading: isProfileLoading } =
    useRequestUserProfile(comment.userId);

  const deleteComment = (commentId: string) => () => {
    onDelete(commentId);
  };

  return (
    <Box
      display="flex"
      sx={{
        borderBottom: `1px solid ${comment.post.season.secondaryColor}`,
        paddingBottom: "4px",
        margin: 1,
      }}
    >
      {isProfileLoading ? (
        <Box
          sx={{
            background: comment.post.season.secondaryColor,
            width: "40px",
            height: "40px",
            borderRadius: "40px",
          }}
        />
      ) : (
        <Box
          sx={{
            background: comment.post.season.secondaryColor,
            width: "40px",
            height: "40px",
            borderRadius: "40px",
            backgroundImage: `url(${userProfile?.imageURL})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      )}
      <Box
        sx={{
          borderRadius: "4px",
          padding: "0px 8px 0px 8px",
          fontSize: "14px",
          whiteSpace: "pre-wrap",
          lineHeight: "20px",
        }}
      >
        {comment.comment}
      </Box>
      {user?.$id === comment.userId && (
        <Button
          size="small"
          variant="text"
          color="red"
          onClick={deleteComment(comment.$id)}
          sx={{
            maxHeight: "30px",
            marginTop: "auto",
            marginLeft: "auto",
          }}
        >
          Delete
        </Button>
      )}
    </Box>
  );
};
