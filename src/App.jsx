import { PostHogErrorBoundary, PostHogProvider } from "@posthog/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import posthog from "posthog-js";
import { RouterProvider } from "react-router";

import { ErrorFallback } from "@app/components";
import BaseRouter from "@app/routers/BaseRouter";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
});

const router = BaseRouter();

const App = () => (
  <PostHogProvider client={posthog}>
    <PostHogErrorBoundary fallback={<ErrorFallback />}>
      <RouterProvider router={router} />
      <SpeedInsights />
    </PostHogErrorBoundary>
  </PostHogProvider>
);

export default App;
