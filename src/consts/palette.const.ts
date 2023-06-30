import { PaletteMode, ThemeOptions, createTheme } from "@mui/material";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { 500: mainColor } });

export const getDesignTokens = (mode: PaletteMode, color?: string): ThemeOptions => {
  const green = createColor("#1E453E");
  const platinum = createColor("#CCDBDC");
  const brown = createColor("#957964");
  const yellow = createColor("#FFC914");
  const eggplant = createColor("#603140");
  const gray = createColor("#72809D");
  const eraAccent = color ? createColor(color) : green;

  return {
    palette: {
      green,
      platinum,
      brown,
      yellow,
      eggplant,
      gray,
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: eraAccent,
            divider: eraAccent.dark,
            background: {
              default: '#f7fcff',
              paper: platinum.light,
            },
            text: {
              primary: eraAccent.dark,
              secondary: platinum.dark,
            },
          }
        : {
            // palette values for dark mode
            primary: eraAccent,
            divider: eraAccent.light,
            background: {
              default: platinum.dark,
              paper: platinum.light,
            },
            text: {
              primary: eraAccent.light,
              secondary: platinum.light,
            },
          }),
    },
  };
};
