import {
  AppWrapper,
  Error,
  Loader,
  TopToolbar,
  UserProfile,
} from "../../components";
import { Box, Button, Typography } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { useUser } from "../../hooks";
import { replaceRouteParams } from "../../helpers";
import { POST } from "../../consts/links.const";
import {
  useRequestDeleteStyling,
  useRequestStyling,
} from "../../requests/useRequestStyling";
import { useRequestSeason } from "../../requests/useRequestSeason";
import { useRequestUserProfile } from "../../requests/useRequestUserProfile";

export const Styling = () => {
  const { user } = useUser();
  const { stylingId } = useLoaderData() as any as {
    stylingId: string;
  };

  const { data: styling, isLoading, error } = useRequestStyling(stylingId);
  const { data: season } = useRequestSeason(styling?.post.season.$id);
  const { data: userProfile } = useRequestUserProfile(styling?.userId);
  const { mutate: onDelete } = useRequestDeleteStyling();

  const deleteStyling = (stylingId: string) => () => {
    onDelete(stylingId);
  };

  if (isLoading || !styling) return <Loader />;

  const backAddress = replaceRouteParams(POST, { postId: styling.post.$id });

  return (
    <AppWrapper>
      <TopToolbar
        backAddress={backAddress}
        logo={season?.brand.logoLink}
        title={styling.post.season.name}
      />
      <Error error={error} />
      <Box>
        <Box display="flex">
          <Box
            sx={{
              backgroundImage: `url(${styling.post.pictureLink})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              flexGrow: 1,
              height: "400px",
              backgroundPositionX: "center",
              backgroundPositionY: "top",
            }}
          />
          <Box
            sx={{
              backgroundImage: `url(${styling.imageUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              flexGrow: 1,
              height: "400px",
              backgroundPositionX: "center",
              backgroundPositionY: "top",
            }}
          />
        </Box>
        <Box marginX={2} marginBottom={4}>
          <Box
            sx={{
              marginY: 1,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <UserProfile user={userProfile} />
            <Box>
              {user?.$id === styling.userId && (
                <Button
                  color="red"
                  size="small"
                  onClick={deleteStyling(stylingId)}
                >
                  delete
                </Button>
              )}
            </Box>
          </Box>
          <Box sx={{ margin: 1 }}>
            <Typography variant="body2" component="div">
              {styling.description}
            </Typography>
          </Box>
        </Box>
      </Box>
    </AppWrapper>
  );
};
