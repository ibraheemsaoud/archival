import { createTheme } from "@mui/material/styles";
import { getDesignTokens } from "./consts/pallet.const";
import { CHESTNUT, YELLOW } from "./consts/colors.const";

export const theme = (mode) =>
  createTheme({
    ...getDesignTokens?.(mode),
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
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
      MuiContainer: {
        styleOverrides: {
          root: {
            padding: "0 !important",
            backgroundColor: YELLOW[100],
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            textDecoration: "none",
          },
          h6: {
            color: CHESTNUT[100],
          },
          h5: {
            color: CHESTNUT[700],
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: CHESTNUT[600],
          },
        },
      },
    },
  });
