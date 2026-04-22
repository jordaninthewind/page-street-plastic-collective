declare module "@mui/material/styles" {
  interface Palette {
    accent: {
      main: string;
    };
  }
  interface PaletteOptions {
    accent?: {
      main?: string;
    };
  }
  interface Theme {
    custom: {
      environmental: {
        positive: string;
        neutral: string;
        negative: string;
      };
      plasticTypes: {
        pet: string;
        hdpe: string;
        pvc: string;
        ldpe: string;
        pp: string;
        ps: string;
        other: string;
      };
    };
  }
  interface ThemeOptions {
    custom?: {
      environmental?: {
        positive?: string;
        neutral?: string;
        negative?: string;
      };
      plasticTypes?: {
        pet?: string;
        hdpe?: string;
        pvc?: string;
        ldpe?: string;
        pp?: string;
        ps?: string;
        other?: string;
      };
    };
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    sectionTitle: true;
    subtitle: true;
    list: true;
    listText: true;
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    accent: true;
  }
}

declare module "@mui/material/SvgIcon" {
  interface SvgIconPropsColorOverrides {
    accent: true;
  }
}

export {};
