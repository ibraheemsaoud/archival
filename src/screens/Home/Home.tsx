import { AppWrapper, BrandCard, FashionWeekCard } from "../../components";
import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IBrand } from "../../interfaces/brand.interface";
import { IFashionWeek } from "../../interfaces/fashionWeek.interface";

export const Home = () => {
  const { brands, fashionWeek } = useLoaderData() as any as {
    brands?: IBrand[];
    fashionWeek?: IFashionWeek;
  };

  if (!brands) return <div>Loading...</div>;

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
      {fashionWeek && <FashionWeekCard fashionWeek={fashionWeek} />}
    </AppWrapper>
  );
};
