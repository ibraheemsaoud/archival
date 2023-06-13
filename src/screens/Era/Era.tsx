import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box } from "@mui/material";
import { CreateNewEntry } from "./CreateNewEntry";

export const Era = () => {
  const { era } = useLoaderData() as any as {
    era: IEra;
  };

  if (!era) return <div>Not found</div>;

  return (
    <AppWrapper>
      <Box textAlign="center" marginTop={6}>
        <Timeline era={era} />
        <CreateNewEntry eraId={era.id} />
      </Box>
    </AppWrapper>
  );
};
