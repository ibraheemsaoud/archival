import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./pallet";

export const theme = (mode) =>
  createTheme({
    ...getDesignTokens(mode),
    components: {
      MuiBackdrop: {},
      // Name of the component
      MuiButtonBase: {
        defaultProps: {
          // The props to change the default for.
          disableRipple: true, // No more ripple, on the whole application 💣!
        },
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" && {
                backgroundColor: "#202020",
                color: "#fff",
              }),
          }),
        },
      },
    },
  });
