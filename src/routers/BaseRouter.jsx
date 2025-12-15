import { createBrowserRouter } from "react-router";

import { Home, Map } from "@app/pages";

const BaseRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/map",
      element: <Map />,
    },
  ]);
};

export default BaseRouter;
