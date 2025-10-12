import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';
import { useEffect } from 'react';

import { Title } from '@app/components';
import { trackEvent } from '@app/services/analytics';
import theme from '@app/theme';

import '@app/containers/Layout.css';

const Layout = ({ children }) => {
  useEffect(() => {
    trackEvent('site_loaded');
  }, []);

  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Stack direction="column" spacing={2}  className="container">
      <Title>Page Street Plastic Collective</Title>
        {children}
    </Stack >
    <Analytics />
  </ThemeProvider>
  );
};

export default Layout; 