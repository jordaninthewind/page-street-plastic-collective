import { PostHogErrorBoundary, usePostHog } from "@posthog/react";
import { Analytics } from "@vercel/analytics/react";
import { SnackbarProvider } from "notistack";
import { Outlet } from "react-router";

import { useEffect } from "react";

import { CssBaseline, Stack, ThemeProvider } from "@mui/material";

import { Copywrite, ErrorFallback, Header } from "@app/components";
import { Modal } from "@app/containers";
import "@app/containers/Layout/Layout.css";
import theme from "@app/theme";

const Layout = () => {
  const posthog = usePostHog();

  useEffect(() => {
    posthog?.identify(window.navigator.userAgent);

    posthog?.capture("page_view", {
      url: window.location.href,
    });
  }, [posthog]);

  return (
    <PostHogErrorBoundary fallback={(props) => <ErrorFallback {...props} />}>
      <ThemeProvider theme={theme}>
        <SnackbarProvider>
          <CssBaseline />
          <Stack direction="column" className="layout">
            <Header />
            <Outlet />
            <Copywrite />
            <Modal />
          </Stack>
          <Analytics />
        </SnackbarProvider>
      </ThemeProvider>
    </PostHogErrorBoundary>
  );
};

export default Layout;
