import { useLoaderData } from "react-router-dom";
import { IEra } from "../../interfaces/era.interface";
import { AppWrapper, Timeline } from "../../components";
import { Box } from "@mui/material";
import { EditEra, SuggestNewEntry } from "./Edit";
import { useRoles } from "../../hooks";

export const Era = () => {
  const { era } = useLoaderData() as any as {
    era: IEra;
  };
  const { hasEditAccess } = useRoles(era?.id);

  if (!era) return <div>Not found</div>;

  return (
    <AppWrapper>
      <Box textAlign="center" marginTop={6}>
        <Timeline era={era} />
        {era.allowSuggestions && <SuggestNewEntry eraId={era.id} />}
        {hasEditAccess && <EditEra era={era} />}
      </Box>
    </AppWrapper>
  );
};
