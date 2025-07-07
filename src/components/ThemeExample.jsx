import React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  Chip,
  Grid,
  Paper,
} from '@mui/material';
import {
  usePlasticCollectiveTheme,
  getEnvironmentalImpactColor,
  getPlasticTypeColor,
  getRecyclingStatusColor,
  getImpactLevelColor,
} from '@app/theme';

const ThemeExample = () => {
  const theme = usePlasticCollectiveTheme();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Page Street Plastic Collective Theme
      </Typography>
      
      {/* Color Palette */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Color Palette
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
                <Typography variant="body2">Primary</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, bgcolor: 'secondary.main', color: 'secondary.contrastText' }}>
                <Typography variant="body2">Secondary</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, bgcolor: 'success.main', color: 'success.contrastText' }}>
                <Typography variant="body2">Success</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Paper sx={{ p: 2, bgcolor: 'warning.main', color: 'warning.contrastText' }}>
                <Typography variant="body2">Warning</Typography>
              </Paper>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Environmental Impact Colors */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Environmental Impact Colors
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label="Positive Impact"
              sx={{ bgcolor: theme.custom.environmental.positive, color: 'white' }}
            />
            <Chip
              label="Neutral Impact"
              sx={{ bgcolor: theme.custom.environmental.neutral, color: 'white' }}
            />
            <Chip
              label="Negative Impact"
              sx={{ bgcolor: theme.custom.environmental.negative, color: 'white' }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Plastic Type Colors */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Plastic Type Colors
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {Object.entries(theme.custom.plasticTypes).map(([type, color]) => (
              <Chip
                key={type}
                label={type.toUpperCase()}
                sx={{ bgcolor: color, color: 'white', fontSize: '0.75rem' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Recycling Status */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Recycling Status
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Chip
              label="Recyclable"
              sx={{ bgcolor: getRecyclingStatusColor('recyclable'), color: 'white' }}
            />
            <Chip
              label="Partially Recyclable"
              sx={{ bgcolor: getRecyclingStatusColor('partially-recyclable'), color: 'white' }}
            />
            <Chip
              label="Non-Recyclable"
              sx={{ bgcolor: getRecyclingStatusColor('non-recyclable'), color: 'white' }}
            />
          </Box>
        </CardContent>
      </Card>

      {/* Impact Levels */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Impact Levels (1-5 Scale)
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5].map((level) => (
              <Chip
                key={level}
                label={`Level ${level}`}
                sx={{ bgcolor: getImpactLevelColor(level), color: 'white' }}
              />
            ))}
          </Box>
        </CardContent>
      </Card>

      {/* Buttons */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Button Styles
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button variant="contained" color="primary">
              Primary Button
            </Button>
            <Button variant="contained" color="secondary">
              Secondary Button
            </Button>
            <Button variant="outlined" color="primary">
              Outlined Button
            </Button>
            <Button variant="text" color="primary">
              Text Button
            </Button>
          </Box>
        </CardContent>
      </Card>

      {/* Typography */}
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Typography Scale
          </Typography>
          <Typography variant="h1" gutterBottom>
            H1 Heading
          </Typography>
          <Typography variant="h2" gutterBottom>
            H2 Heading
          </Typography>
          <Typography variant="h3" gutterBottom>
            H3 Heading
          </Typography>
          <Typography variant="body1" gutterBottom>
            Body 1 text - This is the main body text used throughout the application.
          </Typography>
          <Typography variant="body2" gutterBottom>
            Body 2 text - This is secondary body text, slightly smaller than body 1.
          </Typography>
          <Typography variant="caption" display="block">
            Caption text - Used for small, secondary information.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThemeExample; 