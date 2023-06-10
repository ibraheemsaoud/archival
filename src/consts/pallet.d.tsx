import { PaletteColorOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface CustomPalette {
    chestnut?: PaletteColorOptions;
    darkChestnut?: PaletteColorOptions;
    gray?: PaletteColorOptions;
    indigo?: PaletteColorOptions;
    yellow?: PaletteColorOptions;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    chestnut?: true;
    darkChestnut?: true;
    gray?: true;
    indigo?: true;
    yellow?: true;
  }
}
