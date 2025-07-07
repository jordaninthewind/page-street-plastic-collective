import { CssBaseline, ThemeProvider } from '@mui/material';
import { Analytics } from '@vercel/analytics/react';

import { Title } from '@app/components';
import theme from '@app/theme';

import '@app/containers/Layout.css';

const Layout = ({ children }) => (
    <ThemeProvider theme={theme}>
      <div className="container">
        <CssBaseline />
        <main className="content">
        <Title>Page Street Plastic Collective</Title>
          {children}
        </main>
        <Analytics />
      </div>
  </ThemeProvider>
  );

export default Layout; 