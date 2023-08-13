import { PaletteMode, ThemeOptions, createTheme } from "@mui/material";

const { palette } = createTheme();
const { augmentColor } = palette;
const createColor = (mainColor: string) =>
  augmentColor({ color: { 500: mainColor } });

export const getDesignTokens = (
  mode: PaletteMode,
  color?: string
): ThemeOptions => {
  //#f7eee3
  const platinum = createColor("#CCDBDC");
  const pumpkin = createColor("#4a3215");
  const lightPumpkin = createColor("#fdfcf9");
  const eraAccent = color ? createColor(color) : pumpkin;

  return {
    palette: {
      platinum,
      pumpkin,
      lightPumpkin,
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: eraAccent,
            divider: eraAccent.dark,
            background: {
              default: lightPumpkin.light,
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
