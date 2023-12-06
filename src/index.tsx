import type { Root } from "react-dom/client";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const root: Root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <App />
);
