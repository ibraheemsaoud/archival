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
  const platinum = createColor("#CCDBDC");
  const pumpkin = createColor("#4a3215");
  const lightPumpkin = createColor("#fdfcf9");
  const lightPumpkin2 = createColor("#f7eee3");
  const red = createColor("#f44336");
  const primary = primaryColor ? createColor(primaryColor) : pumpkin;
  const secondary = secondaryColor ? createColor(secondaryColor) : lightPumpkin2;

  return {
    palette: {
      platinum,
      pumpkin,
      lightPumpkin,
      red,
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: primary,
            divider: primary.dark,
            background: {
              default: lightPumpkin.light,
              paper: secondary.light,
            },
            text: {
              primary: primary.dark,
              secondary: secondary.dark,
            },
          }
        : {
            // palette values for dark mode
            primary: primary,
            divider: primary.light,
            background: {
              default: secondary.dark,
              paper: secondary.light,
            },
            text: {
              primary: primary.light,
              secondary: secondary.light,
            },
          }),
    },
  };
};
