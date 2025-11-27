import { createBrowserRouter } from "react-router";

import App from "@app/App";

const BaseRouter = () => {
  return createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
  ]);
};

export default BaseRouter;
