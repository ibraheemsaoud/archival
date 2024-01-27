import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import {
  AppWrapper,
  FashionWeekCard,
  Loader,
  TopToolbar,
} from "../../components";
import { HOME } from "../../consts/links.const";
import { useRequestFashionWeek } from "../../requests/useRequestFashionWeek";

export const FashionWeek = () => {
  const { fashionWeekId: fashionWeekSlug } = useLoaderData() as any as {
    fashionWeekId?: string;
  };
  const { data: fashionWeek } = useRequestFashionWeek(fashionWeekSlug);

  if (!fashionWeek) return <Loader />;

  return (
    <AppWrapper>
      <TopToolbar backAddress={HOME} title={fashionWeek.name} />
      <Box sx={{ margin: 2 }}>
        <FashionWeekCard fashionWeek={fashionWeek} isOnDedicatedScreen />
      </Box>
    </AppWrapper>
  );
};
