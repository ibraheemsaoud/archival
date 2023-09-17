import { Grid, Typography, Box, Button, Link } from "@mui/material";
import { Link as NavLink } from "react-router-dom";
import { SEASON } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { IReference } from "../../interfaces/reference.interface";
import { useRequestDeleteReference } from "../../requests/useRequestReference";

export const SeasonPostReferences = ({
  references,
}: {
  references?: IReference[];
}) => {
  const { mutate: onDelete } = useRequestDeleteReference();

  const deleteReference = (referenceId: string) => () => {
    onDelete(referenceId);
  };
  return (
    <Grid item xs={12} md={12}>
      {references?.length ? (
        <Typography variant="h6" component="div">
          Season References
        </Typography>
      ) : null}
      {references?.map((reference) => (
        <Box
          key={reference.$id}
          sx={{
            display: "flex",
            flexDirection: "column",
            borderRadius: 1,
            border: "1px solid #c4c4c4",
            overflow: "hidden",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box
              sx={{
                backgroundImage: `url(${reference.season.coverImage})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "top",
                minWidth: "60px",
                maxWidth: "60px",
                maxHeight: "60px",
                minHeight: "60px",
              }}
            />
            <Link
              underline="hover"
              component={NavLink}
              to={replaceRouteParams(SEASON, {
                seasonId: reference.season.slug,
              })}
              sx={{ flex: 1, paddingLeft: 1 }}
            >
              <Typography variant="h6" component="div">
                {reference.season.brand.name} - {reference.season.name}
              </Typography>
            </Link>
            <Button
              size="small"
              variant="text"
              color="red"
              onClick={deleteReference(reference.$id)}
            >
              Delete
            </Button>
          </Box>
          <Box
            sx={{
              backgroundImage: `url(${reference.imageLink})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              minHeight: "450px",
            }}
          />
        </Box>
      ))}
    </Grid>
  );
};
