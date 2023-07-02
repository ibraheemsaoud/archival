import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { Grid, Typography } from "@mui/material";
import { EraCard, AppWrapper } from "../../components";
import { ITopic } from "../../interfaces/topic.interface";
import { EraCreator } from "./EraCreator";

export const EraList = () => {
  const { eras, topic } = useLoaderData() as any as {
    eras: IEra[];
    topic?: ITopic;
  };

  if (!topic) return null;

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
                <EraCard era={era} topicId={topic.id} />
              </Grid>
            ))}
            <EraCreator topicId={topic.id} />
          </Grid>
        </Grid>
        <Grid item md={3} />
      </Grid>
    </AppWrapper>
  );
};
