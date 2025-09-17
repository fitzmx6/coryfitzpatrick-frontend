import React from "react";
import { createRoot } from "react-dom/client";
import RouterWrapper from "./components/router";
import "./styles/style.css";
import "./styles/rwdgrid.min.css";
import registerServiceWorker from "./registerServiceWorker";

const rootElement = document.getElementById("wrapper");

if (!rootElement) {
    throw new Error('Failed to find the root element with id "wrapper"');
}

const root = createRoot(rootElement);
root.render(<RouterWrapper />);

registerServiceWorker();
