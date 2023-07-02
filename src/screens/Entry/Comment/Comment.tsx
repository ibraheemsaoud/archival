import { Box, Typography, Link } from "@mui/material";
import { IComment } from "../../../interfaces/comment.interface";

export const Comment = ({ comment }: { comment: IComment }) => {
  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 1,
        paddingX: 2,
        paddingY: 1,
        background: theme.palette.background.default,
        marginY: 4,
      })}
    >
      <Typography variant="body2">{comment.message}</Typography>
      <Typography variant="body2" textAlign="end">
        <Link>{comment.userId}</Link> -{" "}
        {new Date(comment.$createdAt).toLocaleString()}
      </Typography>
    </Box>
  );
};
