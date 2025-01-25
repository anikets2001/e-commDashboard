import './App.css';
import React from "react";
import Nav from "./components/Nav";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<h1>Products</h1>} />
          <Route path="/add" element={<h1>add</h1>} />
          <Route path="/update" element={<h1>update</h1>} />
          <Route path="/logout" element={<h1>logout</h1>} />
          <Route path="/profile" element={<h1>profile</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
