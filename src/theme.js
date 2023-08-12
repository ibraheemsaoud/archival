import { getDesignTokens } from "./consts/palette.const";
import { createTheme } from "@mui/material";

export const theme = (mode, accentColor) => {
  const palette = getDesignTokens(mode, accentColor);
  return createTheme({
    ...palette,
    typography: {
      fontFamily: "IBM Plex Sans Condensed",
      h5: {
        color: palette.palette.text.primary,
      },
      h3: {
        color: palette.palette.green.dark,
      },
      body1: {
        color: palette.palette.green.dark,
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: ({ ownerState }) => ({
            ...(ownerState.variant === "contained" &&
              ownerState.color === "primary" &&
              {
                // backgroundColor: "#202020",
                // color: "#fff",
              }),
          }),
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            textDecoration: "none",
          },
          h6: {
            color: palette.palette.text.primary,
          },
          h5: {
            color: palette.palette.text.primary,
          },
          h4: {
            color: palette.palette.text.primary,
          },
          h3: {
            color: palette.palette.green.dark,
          },
          body1: {
            color: palette.palette.green.dark,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.platinum.light,
          },
        },
      },
    },
  });
};
