import { PaletteMode, ThemeOptions, createTheme } from "@mui/material";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { 500: mainColor } });

export const getDesignTokens = (
  mode: PaletteMode,
  primaryColor?: string,
  secondaryColor?: string
): ThemeOptions => {
  const pumpkin = createColor("#1f1307");
  const lightPumpkin = createColor("#f7eee3");
  const red = createColor("#f44336");
  let primary = mode === "light" ? pumpkin : lightPumpkin;
  let secondary = mode === "light" ? lightPumpkin : pumpkin;

  if (primaryColor) {
    primary = createColor(primaryColor);
  }
  if (secondaryColor) {
    secondary = createColor(secondaryColor);
  }

  return {
    palette: {
      red,
      mode,
      primary,
      secondary,
      ...(mode === "light"
        ? {
            divider: primary.dark,
            background: {
              default: secondary.light,
              paper: primary.light,
            },
            text: {
              primary: secondary.dark,
              secondary: secondary.light,
            },
          }
        : {
            divider: primary.light,
            background: {
              default: secondary.dark,
              paper: primary.dark,
            },
            text: {
              primary: secondary.dark,
              secondary: secondary.light,
            },
          }),
    },
  };
};
