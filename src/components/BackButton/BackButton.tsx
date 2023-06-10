import React from "react";
import { useNavigate } from "react-router-dom";
export const BackButton = () => {
  const navigate = useNavigate();

  const onClick = () => {
    navigate(-1);
  };

  return <button onClick={onClick}>back</button>;
};
