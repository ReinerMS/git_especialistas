import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./routes/AppRoutes";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);