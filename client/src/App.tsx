import { HelmetProvider } from "react-helmet-async";
import { CssBaseline } from "@mui/material";
import { RouterProvider } from "react-router-dom";
import router from "./router";
import { Notifier } from "./components/common";
import "nprogress/nprogress.css";

export default function App() {
  return (
    <HelmetProvider>
      <CssBaseline />
      <RouterProvider router={router} />
      <Notifier />
    </HelmetProvider>
  );
}
