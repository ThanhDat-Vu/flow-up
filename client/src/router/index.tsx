import { RouteObject, createBrowserRouter, redirect } from "react-router-dom";
import Home from "../pages/Home";
import Settings from "../pages/Settings";
import Login from "../pages/Login";
import { getAuthUser } from "../api";
import waitforit from "../utils/waitforit";

const authLoader = async () => {
  return await waitforit(async () => {
    const user = await getAuthUser();
    if (!user) return redirect("/login");
    return user;
  });
};

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/settings",
    element: <Settings />,
    loader: authLoader,
  },
  {
    path: "/login",
    element: <Login />,
  },
];

export default createBrowserRouter(routes);
