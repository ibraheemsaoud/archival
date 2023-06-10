import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { Grid } from "@mui/material";
import { EraCard, AppWrapper } from "../../components/";

export const EraSelector = () => {
  const { eras } = useLoaderData() as any as { eras: IEra[] };

  return (
    <AppWrapper headerProps={{ title: "EraSelector" }}>
      <Grid container spacing={2}>
        {eras?.map((era) => (
          <Grid item xs={3} key={era.id}>
            <EraCard key={era.id} era={era} />
          </Grid>
        ))}
      </Grid>
    </AppWrapper>
  );
};
