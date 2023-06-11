import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { Grid } from "@mui/material";
import { EraCard, AppWrapper } from "../../components/";
import { ITopic } from "../../interfaces/topic.interface";

export const EraSelector = () => {
  const { eras, topic } = useLoaderData() as any as {
    eras: IEra[];
    topic: ITopic;
  };

  return (
    <AppWrapper headerProps={{ title: "EraSelector" }}>
      <Grid container spacing={2}>
        {eras?.map((era) => (
          <Grid item xs={3} key={era.id}>
            <EraCard key={era.id} era={era} topic={topic} />
          </Grid>
        ))}
      </Grid>
    </AppWrapper>
  );
};
