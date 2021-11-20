import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import Layout from "./screens/Layout";
import ProductScreen from "./screens/ProductScreen";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomeScreen />} />
            <Route path="product/:id" element={<ProductScreen />} />
            <Route path="*" element={<div>404 NOT FOUND!</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
