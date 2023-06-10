import { ChevronLeft } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { useMatch, useNavigate } from "react-router-dom";

interface IBackButton {
  variant?: "wrapper" | "contained";
  children?: React.ReactNode;
}

export const BackButton = ({
  variant = "contained",
  children,
}: IBackButton) => {
  const match = useMatch("/");
  const isOnTheHomePage = !!match;

  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  if (isOnTheHomePage) {
    if (variant) {
      return (
        <Typography variant="h6">
          <Button onClick={onClick} variant="contained" disabled>
            <ChevronLeft style={{ color: "transparent" }} />
            {children}
          </Button>
        </Typography>
      );
    }
    return null;
  }

  if (variant) {
    return (
      <Typography variant="h6">
        <Button onClick={onClick} variant="contained" color="darkChestnut">
          <ChevronLeft />
          {children}
        </Button>
      </Typography>
    );
  }

  return (
    <Button onClick={onClick} variant="contained">
      back
    </Button>
  );
};
