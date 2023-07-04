import { Box, Typography, Link, Button, Grid } from "@mui/material";
import { IComment } from "../../../interfaces/comment.interface";
import {
  useRequestDeleteComment,
  useRequestPermissions,
} from "../../../requests";
import { showSmartDate } from "./comment.helper";
import { Server } from "../../../config/server";

export const Comment = ({ comment }: { comment: IComment }) => {
  const { data: permissions } = useRequestPermissions(
    Server.commentCollectionId,
    comment.eraId,
    comment.$id
  );
  const hasDeleteAccess = permissions?.delete;

  const { mutate: deleteComment } = useRequestDeleteComment();

  const handleDelete = () => {
    deleteComment(comment);
  };

  return (
    <Box
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        paddingX: 2,
        paddingY: 1,
        background: theme.palette.background.default,
        marginY: 1,
      })}
    >
      <Typography variant="body2" paddingTop={1} paddingBottom={2}>
        {comment.message}
      </Typography>
      <Grid
        container
        sx={(theme) => ({
          borderTop: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Grid item xs={12} md={6}>
          {hasDeleteAccess && (
            <Button
              variant="text"
              color="error"
              size="small"
              onClick={handleDelete}
            >
              Delete
            </Button>
          )}
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          display="flex"
          alignItems="center"
          justifyContent="flex-end"
        >
          <Typography variant="body2">
            <Link>{comment.userId}</Link> -{" "}
            {showSmartDate(new Date(comment.$createdAt))}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};
