import { Navigate, createBrowserRouter } from "react-router";

import { Layout } from "@app/containers";
import { Home, Map, Profile } from "@app/pages";

const BaseRouter = () => {
  return createBrowserRouter([
    {
      path: "/profile",
      element: <Profile />,
    },
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
