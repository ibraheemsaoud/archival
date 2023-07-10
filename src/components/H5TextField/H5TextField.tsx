import { TextField, TextFieldProps } from "@mui/material";

export const H5TextField = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      InputProps={{
        sx: (theme) => ({
          margin: 0,
          fontSize: "1.5rem",
          marginBottom: "0.35em",
          color: theme.typography.h5.color,
          padding: 0,
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
