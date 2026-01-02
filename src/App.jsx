import { PostHogProvider } from "@posthog/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import posthog from "posthog-js";
import { RouterProvider } from "react-router";

import BaseRouter from "@app/routers/BaseRouter";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2025-05-24",
});

const router = BaseRouter();

const App = () => (
  <PostHogProvider client={posthog}>
    <RouterProvider router={router} />
    <SpeedInsights />
  </PostHogProvider>
);

export default App;
