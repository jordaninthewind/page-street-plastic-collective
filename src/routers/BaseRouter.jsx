import { Navigate, createBrowserRouter } from "react-router";

import { Layout } from "@app/containers";
import { Home, Map } from "@app/pages";

const BaseRouter = () => {
  return createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/map",
          element: <Map />,
        },
        {
          path: "*",
          element: <Navigate to="/" />,
        },
      ],
    },
  ]);
};

export default BaseRouter;
