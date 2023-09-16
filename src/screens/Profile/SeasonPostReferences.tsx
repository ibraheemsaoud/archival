import { Grid, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
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
            borderRadius: 1,
            border: "1px solid #c4c4c4",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              backgroundImage: `url(${reference.season.coverImage})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "60px",
              maxHeight: "-webkit-fill-available",
              minHeight: "60px",
              marginRight: 1,
            }}
          />
          <Box sx={{ flex: 1 }}>
            <Link
              to={replaceRouteParams(SEASON, {
                seasonId: reference.season.slug,
              })}
            >
              <Typography variant="h6" component="div">
                {reference.season.brand.name} - {reference.season.name}
              </Typography>
            </Link>
            <Typography
              variant="body1"
              component="div"
              sx={{
                overflow: "auto",
                wordBreak: "break-all",
              }}
            >
              {reference.imageLink}
            </Typography>
          </Box>
          <Button
            size="small"
            variant="text"
            color="red"
            onClick={deleteReference(reference.$id)}
            sx={{ maxHeight: "45px", marginTop: "auto" }}
          >
            Delete
          </Button>
        </Box>
      ))}
    </Grid>
  );
};
