import { Box, Button, Typography } from "@mui/material";
import { IUserSimpleProfile } from "../../interfaces/user.interface";
import { Loader } from "../Loader";

export const UserProfile = ({ user }: { user?: IUserSimpleProfile }) => {
  if (!user) return <Loader />;
  return (
    <Button sx={{ display: "inline-flex", borderRadius: "10px" }} size="small">
      <Box
        sx={{
          backgroundImage: `url(${user.imageURL})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          overflow: "hidden",
          marginRight: 0.5,
        }}
      />
      <Typography variant="body2">{user.userName}</Typography>
    </Button>
  );
};
