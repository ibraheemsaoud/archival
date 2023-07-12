import { Avatar } from "@mui/material";

export const UserPicture = ({ userId }: { userId: string }) => {
  return (
    <Avatar
      alt={userId}
      sx={{ display: "inline-flex", width: 30, height: 30, marginLeft: 1 }}
    />
  );
};
