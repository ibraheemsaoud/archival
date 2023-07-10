import { TextField, TextFieldProps } from "@mui/material";

export const H3TextField = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      InputProps={{
        sx: (theme) => ({
          margin: 0,
          fontSize: "3rem",
          marginBottom: "0.35em",
          // color: theme.typography.h3.color,
          padding: 0,
          color: `${theme.typography.h3.color} !important`,
        }),
      }}
      inputProps={{
        style: {
          textAlign: "center",
          padding: 0,
        },
      }}
    />
  );
};
