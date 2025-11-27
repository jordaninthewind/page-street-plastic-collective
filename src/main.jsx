import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import BaseRouter from "@app/routers/BaseRouter";

import "@app/index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={BaseRouter()} />
  </StrictMode>,
);
