import {
  AppWrapper,
  Error,
  Loader,
  TopToolbar,
  UserProfile,
} from "../../components";
import { Box, Button, Link, Typography } from "@mui/material";
import {
  useLoaderData,
  Link as NavLink,
  useSearchParams,
} from "react-router-dom";
import { useUser } from "../../hooks";
import { replaceRouteParams } from "../../helpers";
import { POST } from "../../consts/links.const";
import {
  useRequestDeleteStyling,
  useRequestStyling,
} from "../../requests/useRequestStyling";
import { useRequestUserProfile } from "../../requests/useRequestUserProfile";
import { useRequestPost } from "../../requests/useRequestPost";

export const Styling = () => {
  const [searchParams] = useSearchParams();
  const { user } = useUser();
  const { stylingId } = useLoaderData() as any as {
    stylingId: string;
  };

  const { data: styling, isLoading, error } = useRequestStyling(stylingId);

  const postId = searchParams.get("postIdParam") || styling?.mainPost?.$id;

  const { data: post } = useRequestPost(postId);
  const { data: userProfile } = useRequestUserProfile(styling?.userId);
  const { mutate: onDelete } = useRequestDeleteStyling();

  const deleteStyling = (stylingId: string) => () => {
    onDelete(stylingId);
  };

  if (isLoading || !styling || !post) return <Loader />;

  const isMainPost = styling.mainPost?.$id === postId;

  const backAddress = replaceRouteParams(POST, {
    postId: post.$id,
  });

  return (
    <AppWrapper>
      <TopToolbar
        backAddress={backAddress}
        logo={post.season.brand.logoLink}
        title={post.season.name}
      />
      <Error error={error} />
      <Box>
        <Box position="relative">
          <Box
            sx={{
              backgroundImage: `url(${styling.imageUrl})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "600px",
              maxWidth: "70%",
              marginLeft: "auto",
              marginRight: "auto",
              backgroundPositionX: "center",
              backgroundPositionY: "top",
            }}
          />
          <Link
            underline="hover"
            component={NavLink}
            to={replaceRouteParams(POST, { postId: post.$id })}
            sx={{ flex: 1, paddingLeft: 1 }}
          >
            <Box
              sx={{
                backgroundImage: `url(${post.pictureLink})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                height: "150px",
                backgroundPositionX: "center",
                backgroundPositionY: "top",
                display: "fixed",
                position: "absolute",
                bottom: 8,
                right: 16,
                width: 86,
                borderRadius: 2,
              }}
            />
          </Link>
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
