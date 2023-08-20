import { getDesignTokens } from "./consts/palette.const";
import { createTheme } from "@mui/material";

export const theme = (mode, primaryColor, secondaryColor) => {
  const palette = getDesignTokens(mode, primaryColor, secondaryColor);
  return createTheme({
    ...palette,
    typography: {
      fontFamily: "IBM Plex Sans Condensed",
      h5: {
        color: palette.palette.text.primary,
      },
      h3: {
        color: palette.palette.text.primary,
      },
      body1: {
        color: palette.palette.text.primary,
      },
    },
    components: {
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
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
            color: palette.palette.text.primary,
          },
          body1: {
            color: palette.palette.text.primary,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: palette.palette.primary.light,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          outlinedPrimary: {
            color: palette.palette.text.primary,
            borderColor: palette.palette.text.primary,
            backgroundColor: palette.palette.primary.light,
          },
        },
      },
    },
  });
};
