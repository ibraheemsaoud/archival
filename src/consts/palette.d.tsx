import { PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface CustomPalette {
    platinum?: PaletteColorOptions;
    pumpkin?: PaletteColorOptions;
    lightPumpkin?: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    platinum?: true;
    pumpkin?: true;
    lightPumpkin?: true;
  }
}
