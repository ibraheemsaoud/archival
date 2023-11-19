import { AppWrapper, BrandCard, FashionWeekCard, Loader } from "../../components";
import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IBrand } from "../../interfaces/brand.interface";
import { IFashionWeek } from "../../interfaces/fashionWeek.interface";

export const Home = () => {
  const { brands, fashionWeeks } = useLoaderData() as any as {
    brands?: IBrand[];
    fashionWeeks?: IFashionWeek[];
  };

  if (!brands) return <Loader />;

  return (
    <AppWrapper>
      <Box
        sx={{
          display: "flex",
          padding: 1,
          borderBottom: "1px solid #e0e0e0",
          overflowX: "auto",
        }}
      >
        {brands?.map((brand) => (
          <Box key={`BRAND_CARD_${brand.$id}`} sx={{ marginRight: 1 }}>
            <BrandCard brand={brand} />
          </Box>
        ))}
      </Box>
      {fashionWeeks?.map((fashionWeek) => (
        <FashionWeekCard fashionWeek={fashionWeek} key={fashionWeek.$id} />
      ))}
    </AppWrapper>
  );
};
