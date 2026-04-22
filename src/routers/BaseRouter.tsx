import { Navigate, createBrowserRouter } from "react-router";

import { Layout } from "@app/components";
import { Home, Map } from "@app/pages";
import {
  Contributors,
  CoverTheCity,
  Model3D,
  Problem,
  SupportUs,
} from "@app/pages/Home/sections";

const BaseRouter = () =>
  createBrowserRouter([
    {
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/map", element: <Map /> },
        { path: "/problem", element: <Problem /> },
        { path: "/print", element: <Model3D /> },
        { path: "/support", element: <SupportUs /> },
        { path: "/contributors", element: <Contributors /> },
        { path: "/cover-the-city", element: <CoverTheCity /> },
        { path: "*", element: <Navigate to="/" /> },
      ],
    },
  ]);

export default BaseRouter;
