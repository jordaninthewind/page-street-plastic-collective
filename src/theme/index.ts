import { createTheme } from "@mui/material/styles";

const colors = {
  primary: {
    main: "#9C27B0",
    light: "#E91E63",
    dark: "#6A1B9A",
    contrastText: "#FFFFFF",
  },
  secondary: {
    main: "#D32F2F",
    light: "#E91E63",
    dark: "#6A1B9A",
    contrastText: "#FFFFFF",
  },
  success: {
    main: "#4CAF50",
    light: "#66BB6A",
    dark: "#1B5E20",
    contrastText: "#FFFFFF",
  },
  warning: {
    main: "#F57C00",
    light: "#FFB74D",
    dark: "#E65100",
    contrastText: "#FFFFFF",
  },
  error: {
    main: "#D32F2F",
    light: "#EF5350",
    dark: "#C62828",
    contrastText: "#FFFFFF",
  },
  info: {
    main: "#0288D1",
    light: "#29B6F6",
    dark: "#01579B",
    contrastText: "#FFFFFF",
  },
  grey: {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#757575",
    700: "#616161",
    800: "#424242",
    900: "#212121",
  },
  accent: {
    main: "#D32F2F",
  },
  background: {
    default: "rgba(248, 246, 236, 1)",
    paper: "#FFFFFF",
  },
  text: {
    primary: "#212121",
    secondary: "#757575",
    disabled: "#BDBDBD",
  },
};

const typography = {
  fontFamily: '"Open Sans", sans-serif',
  h1: {
    fontSize: "2.5rem",
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
  },
  h2: {
    fontSize: "2rem",
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: "-0.01em",
  },
  h3: { fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.3 },
  h4: { fontSize: "1.5rem", fontWeight: 500, lineHeight: 1.4 },
  h5: { fontSize: "1.25rem", fontWeight: 500, lineHeight: 1.4 },
  h6: { fontSize: "1.125rem", fontWeight: 500, lineHeight: 1.4 },
  body1: { fontSize: "1rem", lineHeight: 1.6, letterSpacing: "0.01em" },
  body2: { fontSize: "0.875rem", lineHeight: 1.5, letterSpacing: "0.01em" },
  button: {
    fontSize: "0.875rem",
    fontWeight: 500,
    textTransform: "none",
    letterSpacing: "0.02em",
  },
  caption: { fontSize: "0.75rem", lineHeight: 1.4, letterSpacing: "0.02em" },
  overline: {
    fontSize: "0.75rem",
    fontWeight: 500,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
  },
};

const customTypographyVariants = {
  sectionTitle: {
    fontSize: 34,
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    textTransform: "uppercase" as const,
    wordBreak: "keep-all" as const,
  },
  subtitle: {
    fontSize: "2rem",
    fontWeight: 500,
    lineHeight: 1.4,
    letterSpacing: "0.02em",
  },
  list: {
    fontSize: "1rem",
    lineHeight: 1.5,
    letterSpacing: "0.01em",
  },
  listText: {
    fontSize: "4rem",
    fontWeight: 600,
    lineHeight: 1.2,
    letterSpacing: "-0.02em",
    color: colors.accent.main,
  },
};

const theme = createTheme({
  palette: colors,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  typography: { ...typography, ...customTypographyVariants } as any,
  spacing: 8,
  shape: { borderRadius: 8 },
  breakpoints: {
    values: { xs: 0, sm: 600, md: 960, lg: 1280, xl: 1920 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: "10px 24px",
          textTransform: "none",
          fontWeight: 500,
          boxShadow: "none",
          "&:hover": { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)" },
        },
        contained: {
          "&:hover": { boxShadow: "0 4px 12px rgba(0, 0, 0, 0.2)" },
        },
        outlined: { borderWidth: 2, "&:hover": { borderWidth: 2 } },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
          "&:hover": { boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)" },
        },
      },
    },
    MuiPaper: { styleOverrides: { root: { borderRadius: 8 } } },
    MuiInputBase: {
      styleOverrides: { root: { backgroundColor: "rgba(255, 255, 255, 0.5)" } },
    },
    MuiListItem: { defaultProps: { disableGutters: true } },
    MuiTextField: {
      styleOverrides: {
        root: { "& .MuiOutlinedInput-root": { borderRadius: 8 } },
      },
    },
    MuiAppBar: {
      styleOverrides: { root: { boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)" } },
    },
    MuiDrawer: { styleOverrides: { paper: { borderRadius: 0 } } },
    MuiChip: { styleOverrides: { root: { borderRadius: 16, fontWeight: 500 } } },
    MuiFab: {
      styleOverrides: {
        root: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
          "&:hover": { boxShadow: "0 6px 16px rgba(0, 0, 0, 0.2)" },
        },
      },
    },
  },
  custom: {
    environmental: {
      positive: "#4CAF50",
      neutral: "#FF9800",
      negative: "#F44336",
    },
    plasticTypes: {
      pet: "#2196F3",
      hdpe: "#4CAF50",
      pvc: "#FF9800",
      ldpe: "#9C27B0",
      pp: "#795548",
      ps: "#607D8B",
      other: "#9E9E9E",
    },
  },
});

export default theme;
