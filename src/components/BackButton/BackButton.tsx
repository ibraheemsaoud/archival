import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
export const BackButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return (
    <Button onClick={onClick} variant="contained">
      back
    </Button>
  );
};
