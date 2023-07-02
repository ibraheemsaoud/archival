import { Box, Typography, Link, Button, Grid } from "@mui/material";
import { IComment } from "../../../interfaces/comment.interface";
import { useUser } from "../../../hooks";
import { useRequestDeleteComment } from "../../../requests";

export const Comment = ({ comment }: { comment: IComment }) => {
  const { user } = useUser();
  const isOwner = user?.$id === comment.userId;

  const { mutate: deleteComment } = useRequestDeleteComment();

  const handleDelete = () => {
    deleteComment(comment);
  };

  const showSmartDate = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    const intervals = [
      {
        label: "year",
        seconds: 31536000,
      },
      {
        label: "month",
        seconds: 2592000,
      },
      {
        label: "day",
        seconds: 86400,
      },
      {
        label: "hour",
        seconds: 3600,
      },
      {
        label: "minute",
        seconds: 60,
      },
      {
        label: "second",
        seconds: 1,
      },
    ];
    let counter;
    for (let i = 0; i < intervals.length; i++) {
      counter = Math.floor(seconds / intervals[i].seconds);
      if(counter === 0 && i === intervals.length - 1) {
        return "Just now";
      }
      if (counter > 0) {
        return `${counter} ${intervals[i].label}${counter > 1 ? "s" : ""} ago`;
      }
    }
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
          {isOwner && (
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
