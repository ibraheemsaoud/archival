import { PaletteMode, ThemeOptions, createTheme } from "@mui/material";
import { CHESTNUT, GRAYS, INDIGO, YELLOW } from "./colors.const";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { 500: mainColor } });

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  const green = createColor("#1E453E");
  const platinum = createColor("#CCDBDC");
  const brown = createColor("#957964");
  const yellow = createColor("#FFC914");
  const eggplant = createColor("#603140");
  const gray = createColor("#72809D");

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
            primary: green,
            divider: green.dark,
            background: {
              default: platinum.light,
              paper: platinum.main,
            },
            text: {
              primary: green.dark,
              secondary: platinum.dark,
            },
          }
        : {
            // palette values for dark mode
            primary: green,
            divider: green.light,
            background: {
              default: platinum.dark,
              paper: platinum.light,
            },
            text: {
              primary: green.light,
              secondary: platinum.light,
            },
          }),
    },
  };
};
