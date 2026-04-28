import { Navigate, createBrowserRouter } from "react-router";

import { Layout } from "@app/components";
import { Home, Map } from "@app/pages";

const BaseRouter = () =>
  createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/map", element: <Map /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ]);

export default BaseRouter;
