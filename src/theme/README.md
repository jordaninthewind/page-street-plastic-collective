# Page Street Plastic Collective MUI Theme

This directory contains the Material-UI theme configuration for the Page Street Plastic Collective project.

## Files

- `theme.js` - Main theme configuration
- `utils.js` - Theme utility functions and hooks
- `index.js` - Theme exports
- `README.md` - This documentation

## Theme Features

### Color Palette

The theme uses a nature-inspired color palette suitable for an environmental/sustainability website:

- **Primary**: Forest green (#2E7D32) - Represents nature and sustainability
- **Secondary**: Ocean blue (#1976D2) - Represents water and environmental awareness
- **Success**: Green (#388E3C) - Positive environmental impact
- **Warning**: Orange (#F57C00) - Attention and awareness
- **Error**: Red (#D32F2F) - Environmental concerns and urgent issues
- **Info**: Blue (#0288D1) - Information and education

### Custom Theme Properties

The theme includes custom properties specific to the plastic collective:

#### Environmental Impact Colors

```javascript
theme.custom.environmental.positive; // #4CAF50
theme.custom.environmental.neutral; // #FF9800
theme.custom.environmental.negative; // #F44336
```

#### Plastic Type Colors

```javascript
theme.custom.plasticTypes.pet; // #2196F3 (Blue)
theme.custom.plasticTypes.hdpe; // #4CAF50 (Green)
theme.custom.plasticTypes.pvc; // #FF9800 (Orange)
theme.custom.plasticTypes.ldpe; // #9C27B0 (Purple)
theme.custom.plasticTypes.pp; // #795548 (Brown)
theme.custom.plasticTypes.ps; // #607D8B (Blue Grey)
theme.custom.plasticTypes.other; // #9E9E9E (Grey)
```

## Usage

### Basic Theme Usage

```javascript
import { useTheme } from "@mui/material/styles";

const MyComponent = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "primary.contrastText",
        p: 2,
      }}
    >
      Hello World
    </Box>
  );
};
```

### Using Custom Theme Properties

```javascript
import { usePlasticCollectiveTheme } from "@app/theme";

const MyComponent = () => {
  const theme = usePlasticCollectiveTheme();

  return (
    <Chip
      label="PET Plastic"
      sx={{
        bgcolor: theme.custom.plasticTypes.pet,
        color: "white",
      }}
    />
  );
};
```

### Using Utility Functions

```javascript
import {
  getEnvironmentalImpactColor,
  getImpactLevelColor,
  getPlasticTypeColor,
  getRecyclingStatusColor,
} from "@app/theme";

const MyComponent = () => {
  return (
    <Box>
      <Chip
        label="Positive Impact"
        sx={{ bgcolor: getEnvironmentalImpactColor("positive") }}
      />
      <Chip label="PET" sx={{ bgcolor: getPlasticTypeColor("pet") }} />
      <Chip
        label="Recyclable"
        sx={{ bgcolor: getRecyclingStatusColor("recyclable") }}
      />
      <Chip label="Low Impact" sx={{ bgcolor: getImpactLevelColor(1) }} />
    </Box>
  );
};
```

## Component Styling

The theme includes custom styling for common MUI components:

### Buttons

- Rounded corners (8px border radius)
- No text transform (preserves original case)
- Hover effects with subtle shadows
- Consistent padding (10px 24px)

### Cards

- Rounded corners (12px border radius)
- Subtle shadows with hover effects
- Consistent spacing

### Text Fields

- Rounded input borders (8px border radius)
- Consistent styling

### Chips

- Rounded corners (16px border radius)
- Medium font weight

## Responsive Design

The theme includes standard MUI breakpoints:

- `xs`: 0px and up
- `sm`: 600px and up
- `md`: 960px and up
- `lg`: 1280px and up
- `xl`: 1920px and up

## Typography

The theme uses Roboto as the primary font with a comprehensive typography scale:

- `h1` - 2.5rem, bold
- `h2` - 2rem, semibold
- `h3` - 1.75rem, semibold
- `h4` - 1.5rem, medium
- `h5` - 1.25rem, medium
- `h6` - 1.125rem, medium
- `body1` - 1rem, regular
- `body2` - 0.875rem, regular
- `button` - 0.875rem, medium
- `caption` - 0.75rem, regular
- `overline` - 0.75rem, medium, uppercase

## Spacing

The theme uses an 8px base spacing unit, which means:

- `theme.spacing(1)` = 8px
- `theme.spacing(2)` = 16px
- `theme.spacing(3)` = 24px
- And so on...

## Example Component

See `src/components/ThemeExample.jsx` for a comprehensive example of how to use all theme features.

## Adding to Your App

To add the theme example to your app temporarily for testing:

```javascript
import { ThemeExample } from "@app/components";

// Add to your App.jsx or any section
<ThemeExample />;
```

This will show all the theme colors, typography, and component styles in one place.
