import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Docs from "./routes/Docs";
import "./index.css";

const root = document.getElementById("root");

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/docs", element: <Docs /> },
]);

if (root) {
  createRoot(root).render(<RouterProvider router={router} />);
}
