import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Nav from "./pages/Nav";
import Home from "./pages/Home";
import Youtube from "./pages/Youtube";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Nav />}>
                <Route index element={<Home />} />
                <Route path="/ytdl" element={<Youtube />} />
            </Route>
        </Routes>
    </BrowserRouter>
);
