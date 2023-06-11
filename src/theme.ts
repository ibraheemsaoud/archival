import type {} from "@mui/lab/themeAugmentation";
import { getDesignTokens } from "./consts/palette.const";
import { PaletteMode, createTheme } from "@mui/material";

export const theme = (mode: PaletteMode) => {
  const palette = getDesignTokens(mode);
  return createTheme({
    ...palette,
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
            color: (palette as any).palette.platinum.light,
          },
          h5: {
            color: (palette as any).palette.green.dark,
          },
          h4: {
            color: (palette as any).palette.green.dark,
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            backgroundColor: (palette as any).palette.platinum.light,
          },
        },
      },
    },
  });
};
