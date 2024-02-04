import React from "react";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./components/App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "../src/CSS/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
