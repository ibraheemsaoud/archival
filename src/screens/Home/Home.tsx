import {
  AppWrapper,
  BrandCard,
  FashionWeekCard,
  Loader,
} from "../../components";
import { Box } from "@mui/material";
import { useLoaderData } from "react-router-dom";
import { IBrand } from "../../interfaces/brand.interface";
import { useRequestMainPageEntries } from "../../requests/useRequestMainPageEntries";
import { useEffect } from "react";

export const Home = () => {
  const { brands } = useLoaderData() as any as {
    brands?: IBrand[];
  };

  const { data, isLoading, mutate } = useRequestMainPageEntries();
  useEffect(() => {
    mutate();
  }, [mutate]);

  if (!brands || isLoading) return <Loader />;

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
      {data?.map((item) => {
        if (item.type === "featured_fashion_week") {
          return (
            <FashionWeekCard
              fashionWeek={item.entry}
              key={`FFW_${item.entry.$id}`}
              isFeatured
            />
          );
        } else if (item.type === "current_fashion_week") {
          return (
            <FashionWeekCard
              fashionWeek={item.entry}
              key={`CFW_${item.entry.$id}`}
            />
          );
        } else {
          return null;
        }
      })}
    </AppWrapper>
  );
};
