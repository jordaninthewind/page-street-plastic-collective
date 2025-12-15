import { usePostHog } from "@posthog/react";
import { Analytics } from "@vercel/analytics/react";

import { useEffect } from "react";

import { CssBaseline, Stack, ThemeProvider } from "@mui/material";

import "@app/containers/Layout/Layout.css";
import theme from "@app/theme";

const Layout = ({ children }) => {
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.identify(window.navigator.userAgent);

    posthog?.capture("page_view", {
      url: window.location.href,
    });
  }, [posthog]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Stack direction="column" className="layout">
        {children}
      </Stack>
      <Analytics />
    </ThemeProvider>
  );
};

export default Layout;
