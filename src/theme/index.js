import { createTheme } from '@mui/material/styles';

// Color palette inspired by nature and sustainability
const colors = {
  // Primary colors - purple
  primary: {
    main: '#9C27B0', // Lavender
    light: '#E91E63', // Light pink
    dark: '#6A1B9A', // Dark purple
    contrastText: '#FFFFFF',
  },
  // Secondary colors - pink
  secondary: {
    main: '#9C27B0', // Lavender
    light: '#E91E63', // Light pink
    dark: '#6A1B9A', // Dark purple
    contrastText: '#FFFFFF',
  },
  // Success colors - green
  success: {
    main: '#388E3C', // Success green
    light: '#66BB6A',
    dark: '#1B5E20',
    contrastText: '#FFFFFF',
  },
  // Warning colors - orange
  warning: {
    main: '#F57C00', // Orange for awareness
    light: '#FFB74D',
    dark: '#E65100',
    contrastText: '#FFFFFF',
  },
  // Error colors - red
  error: {
    main: '#D32F2F', // Red for urgent issues
    light: '#EF5350',
    dark: '#C62828',
    contrastText: '#FFFFFF',
  },
  // Info colors - blue
  info: {
    main: '#0288D1', // Info blue
    light: '#29B6F6',
    dark: '#01579B',
    contrastText: '#FFFFFF',
  },
  // Neutral colors - grey
  grey: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },
  // Background colors - white
  background: {
    default: '#FAFAFA',
    paper: '#FFFFFF',
  },
  // Text colors - black
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#BDBDBD',
  },
};

// Typography configuration
const typography = {
  fontFamily: '"Open Sans", sans-serif',
  sectionTitle: {
    fontSize: '4.75rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
  },
  h1: {
    fontSize: '2.5rem',
    fontWeight: 700,
    lineHeight: 1.2,
    letterSpacing: '-0.02em',
  },
  h2: {
    fontSize: '2rem',
    fontWeight: 600,
    lineHeight: 1.3,
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '1.75rem',
    fontWeight: 600,
    lineHeight: 1.3,
  },
  h4: {
    fontSize: '1.5rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h5: {
    fontSize: '1.25rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  h6: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: 1.4,
  },
  body1: {
    fontSize: '1rem',
    lineHeight: 1.6,
    letterSpacing: '0.01em',
  },
  body2: {
    fontSize: '0.875rem',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  list: {
    fontSize: '1rem',
    lineHeight: 1.5,
    letterSpacing: '0.01em',
  },
  button: {
    fontSize: '0.875rem',
    fontWeight: 500,
    textTransform: 'none',
    letterSpacing: '0.02em',
  },
  caption: {
    fontSize: '0.75rem',
    lineHeight: 1.4,
    letterSpacing: '0.02em',
  },
  overline: {
    fontSize: '0.75rem',
    fontWeight: 500,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
  },
};

// Spacing configuration
const spacing = 8;

// Shape configuration
const shape = {
  borderRadius: 8,
};

// Breakpoints configuration
const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
};

// Component-specific theme overrides
const components = {
  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        padding: '10px 24px',
        textTransform: 'none',
        fontWeight: 500,
        boxShadow: 'none',
        '&:hover': {
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
        },
      },
      contained: {
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
        },
      },
      outlined: {
        borderWidth: 2,
        '&:hover': {
          borderWidth: 2,
        },
      },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        '&:hover': {
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
        },
      },
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        borderRadius: 8,
      },
    },
  },
  MuiInputBase: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
      },
    },
  },
  MuiTextField: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-root': {
          borderRadius: 8,
        },
      },
    },
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        borderRadius: 0,
      },
    },
  },
  MuiChip: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        fontWeight: 500,
      },
    },
  },
  MuiFab: {
    styleOverrides: {
      root: {
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        '&:hover': {
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
};

// Create the theme
const theme = createTheme({
  palette: colors,
  typography,
  spacing,
  shape,
  breakpoints,
  components,
  // Custom theme properties for the plastic collective
  custom: {
    // Environmental impact colors
    environmental: {
      positive: '#4CAF50', // Positive environmental impact
      neutral: '#FF9800', // Neutral impact
      negative: '#F44336', // Negative impact
    },
    // Plastic types colors
    plasticTypes: {
      pet: '#2196F3', // PET - Blue
      hdpe: '#4CAF50', // HDPE - Green
      pvc: '#FF9800', // PVC - Orange
      ldpe: '#9C27B0', // LDPE - Purple
      pp: '#795548', // PP - Brown
      ps: '#607D8B', // PS - Blue Grey
      other: '#9E9E9E', // Other - Grey
    },
  },
});

export default theme;
