import { createBrowserRouter } from "react-router";
import LandingPage from "./pages/LandingPage";
import WebsiteEditor from "./pages/WebsiteEditor";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/admin",
    Component: WebsiteEditor,
  },
]);