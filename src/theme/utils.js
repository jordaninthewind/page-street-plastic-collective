import { useTheme } from '@mui/material/styles';

/**
 * Custom hook to access the plastic collective theme properties
 */
export const usePlasticCollectiveTheme = () => {
  const theme = useTheme();
  return {
    ...theme,
    custom: theme.custom || {},
  };
};

/**
 * Get environmental impact color based on impact level
 * @param {string} impact - 'positive', 'neutral', or 'negative'
 * @returns {string} Color value
 */
export const getEnvironmentalImpactColor = (impact) => {
  const theme = useTheme();
  return theme.custom?.environmental?.[impact] || theme.palette.grey[500];
};

/**
 * Get plastic type color based on plastic type
 * @param {string} plasticType - 'pet', 'hdpe', 'pvc', 'ldpe', 'pp', 'ps', 'other'
 * @returns {string} Color value
 */
export const getPlasticTypeColor = (plasticType) => {
  const theme = useTheme();
  return theme.custom?.plasticTypes?.[plasticType] || theme.palette.grey[500];
};

/**
 * Get a color that represents the recycling status
 * @param {string} status - 'recyclable', 'partially-recyclable', 'non-recyclable'
 * @returns {string} Color value
 */
export const getRecyclingStatusColor = (status) => {
  const theme = useTheme();
  switch (status) {
    case 'recyclable':
      return theme.palette.success.main;
    case 'partially-recyclable':
      return theme.palette.warning.main;
    case 'non-recyclable':
      return theme.palette.error.main;
    default:
      return theme.palette.grey[500];
  }
};

/**
 * Get a color that represents the environmental impact level
 * @param {number} impactLevel - 1-5 scale where 1 is low impact, 5 is high impact
 * @returns {string} Color value
 */
export const getImpactLevelColor = (impactLevel) => {
  const theme = useTheme();
  if (impactLevel <= 1) return theme.palette.success.main;
  if (impactLevel <= 2) return theme.palette.success.light;
  if (impactLevel <= 3) return theme.palette.warning.main;
  if (impactLevel <= 4) return theme.palette.warning.dark;
  return theme.palette.error.main;
};

/**
 * Get spacing value in pixels
 * @param {number} multiplier - Number of spacing units
 * @returns {string} Spacing value in pixels
 */
export const getSpacing = (multiplier) => {
  const theme = useTheme();
  return theme.spacing(multiplier);
};

/**
 * Get responsive breakpoint value
 * @param {string} breakpoint - 'xs', 'sm', 'md', 'lg', 'xl'
 * @returns {number} Breakpoint value in pixels
 */
export const getBreakpointValue = (breakpoint) => {
  const theme = useTheme();
  return theme.breakpoints.values[breakpoint];
};

/**
 * Check if current screen size matches breakpoint
 * @param {string} breakpoint - 'xs', 'sm', 'md', 'lg', 'xl'
 * @param {string} direction - 'up', 'down', 'only'
 * @returns {boolean} Whether the breakpoint matches
 */
export const useBreakpoint = (breakpoint, direction = 'up') => {
  const theme = useTheme();
  const matches = theme.breakpoints[direction](breakpoint);
  return matches;
};

/**
 * Get theme-aware shadow
 * @param {number} elevation - Shadow elevation (1-24)
 * @returns {string} Box shadow value
 */
export const getShadow = (elevation = 1) => {
  const theme = useTheme();
  return theme.shadows[elevation];
};

/**
 * Get theme-aware border radius
 * @param {number} multiplier - Border radius multiplier
 * @returns {string} Border radius value
 */
export const getBorderRadius = (multiplier = 1) => {
  const theme = useTheme();
  return `${theme.shape.borderRadius * multiplier}px`;
}; 