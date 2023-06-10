import { PaletteMode, ThemeOptions, createTheme } from "@mui/material";
import { CHESTNUT, GRAYS, YELLOW } from "./colors.const";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { main: mainColor } });

export const getDesignTokens = (mode: PaletteMode): ThemeOptions => {
  return {
    palette: {
      chestnut: createColor("#CD5849"),
      darkChestnut: createColor("#6f281f"),
      gray: createColor("#72809D"),
      indigo: createColor("#4a39c6"),
      yellow: createColor("#e59f1a"),
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: CHESTNUT,
            divider: CHESTNUT[800],
            background: {
              default: YELLOW[100],
              paper: YELLOW[200],
            },
            text: {
              primary: CHESTNUT[700],
              secondary: CHESTNUT[600],
            },
          }
        : {
            // palette values for dark mode
            primary: CHESTNUT,
            divider: YELLOW[300],
            background: {
              default: GRAYS[800],
              paper: GRAYS[700],
            },
            text: {
              primary: CHESTNUT[200],
              secondary: CHESTNUT[800],
            },
          }),
    },
  };
};
