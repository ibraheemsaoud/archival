import { getDesignTokens } from "./consts/palette.const";
import { createTheme } from "@mui/material";

export const theme = (mode, primaryColor, secondaryColor) => {
  const palette = getDesignTokens(mode, primaryColor, secondaryColor);
  return createTheme({
    ...palette,
    typography: {
      fontFamily: "IBM Plex Sans Condensed",
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
            color: palette.palette.text.primary,
          },
        },
      },
      // MuiButton: {
      //   styleOverrides: {
      //     outlinedPrimary: {
      //       color: palette.palette.text.primary,
      //       borderColor: palette.palette.text.primary,
      //       backgroundColor: palette.palette.background.light,
      //       "&:selected": {
      //         color: palette.palette.text.primary,
      //         borderColor: palette.palette.text.primary,
      //         backgroundColor: palette.palette.background.light,
      //       },
      //     },
      //   },
      // },
    },
  });
};
