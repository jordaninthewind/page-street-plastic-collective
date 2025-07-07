import { CssBaseline, Stack, ThemeProvider } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';

import { Title } from '@app/components';
import theme from '@app/theme';

import '@app/containers/Layout.css';

const Layout = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Stack direction="column" spacing={2}  className="container">
      <Title>Page Street Plastic Collective</Title>
        {children}
    </Stack >
    <Analytics />
  </ThemeProvider>
  );

export default Layout; 