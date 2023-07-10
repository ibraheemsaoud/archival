import { TextField, TextFieldProps } from "@mui/material";

export const Body1TextField = (props: TextFieldProps) => {
  return (
    <TextField
      {...props}
      InputProps={{
        sx: (theme) => ({
          margin: 0,
          padding: 0,
          fontSize: "1rem",
          lineHeight: "1.5",
          marginBottom: "0.35em",
          color: `${theme.typography.body1.color} !important`,
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
