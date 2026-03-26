import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";


import HomePage from "./pages/Home.jsx";
import ProductPage from "./pages/ProductsPage.jsx";
import Info from "./pages/About.jsx";
import Collection from "./pages/Collection.jsx"
import ContactPage from "./pages/Contact.jsx";
import NavBar from "./components/NavBar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<Info />} />
        <Route path="/Collection" element={<Collection/>}/>
        <Route path="/Contact" element={<ContactPage/>}/>



      </Routes>
    </BrowserRouter>
  </StrictMode>
);