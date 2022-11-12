import { RouteObject, createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
];

export default createBrowserRouter(routes);
