import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { Grid, Typography } from "@mui/material";
import { EraCard, AppWrapper } from "../../components";
import { ITopic } from "../../interfaces/topic.interface";
import { CreateNewEra } from "./CreateNewEra";

export const EraList = () => {
  const { eras, topic } = useLoaderData() as any as {
    eras: IEra[];
    topic: ITopic;
  };

  return (
    <AppWrapper>
      <Grid container spacing={1}>
        <Grid item md={9}>
          <Typography variant="h4" gutterBottom>
            {topic.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            {topic.description}
          </Typography>
          <br />
          <Grid container spacing={2}>
            {eras?.map((era) => (
              <Grid item xs={12} lg={6} key={era.id}>
                <EraCard key={era.id} era={era} topicSlug={topic.slug} />
              </Grid>
            ))}
            <CreateNewEra topicId={topic.id} />
          </Grid>
        </Grid>
        <Grid item md={3}>
          {/* <Box
            marginTop={2}
            padding={2}
            sx={(theme) => ({
              background: theme.palette.background.paper,
              border: `1px solid ${theme.palette.divider}`,
              borderRadius: 1,
              height: "600px",
            })}
          >
            side bar
            <br />
            here you will have some tools to filter the eras
            <br />
            also the deffinition of the tags that are used in this topic
            <br />
          </Box> */}
        </Grid>
      </Grid>
    </AppWrapper>
  );
};
