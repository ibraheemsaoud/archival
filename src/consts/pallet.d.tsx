import { PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface CustomPalette {
    green?: PaletteColorOptions;
    platinum?: PaletteColorOptions;
    brown?: PaletteColorOptions;
    yellow?: PaletteColorOptions;
    eggplant?: PaletteColorOptions;
    gray?: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    green?: true;
    platinum?: true;
    brown?: true;
    yellow?: true;
    eggplant?: true;
    gray?: true;
  }
}
