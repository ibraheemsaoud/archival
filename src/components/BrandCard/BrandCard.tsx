import { Card, CardActionArea, CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { BRAND } from "../../consts/links.const";
import { replaceRouteParams } from "../../helpers";
import { IBrand } from "../../interfaces/brand.interface";

export const BrandCard = ({
  brand,
  cardType = "mini",
}: {
  brand: IBrand;
  cardType?: "mini" | "full";
}) => {
  const { logoLink, slug, primaryColor = "#ffffff" } = brand;
  const minWidth = cardType === "mini" ? 90 : 140;
  const maxWidth = cardType === "mini" ? 90 : 140;
  const minHeight = cardType === "mini" ? 90 : 140;
  const maxHeight = cardType === "mini" ? 90 : 140;
  return (
    <Card
      sx={{
        backgroundColor: primaryColor,
        borderRadius: 4,
        minWidth,
        maxWidth,
        minHeight,
        maxHeight,
      }}
    >
      <Link to={replaceRouteParams(BRAND, { brandId: slug })}>
        <CardActionArea>
          <CardMedia
            sx={{ objectFit: "contain", padding: "8px" }}
            component="img"
            height={cardType === "mini" ? 90 : 140}
            image={logoLink || "\\static\\images\\placeholder.jpeg"}
          />
        </CardActionArea>
      </Link>
    </Card>
  );
};
