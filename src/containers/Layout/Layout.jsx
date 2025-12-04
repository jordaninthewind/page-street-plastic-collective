import { CssBaseline, Stack, ThemeProvider } from "@mui/material";
import { Analytics } from "@vercel/analytics/react";
import { usePostHog } from "@posthog/react";
import { useEffect } from "react";

import theme from "@app/theme";

import "@app/containers/Layout/Layout.css";

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
