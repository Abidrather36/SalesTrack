import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Public/Components/Home";
import Footer from "./Public/Components/Footer";
import Login from "./Public/Components/Auth/Login";
import "./App.css"; // Import global styles if needed
import Navbar from "./Public/Components/Navbar";
import RegisterEnquiry from "./Public/Components/Auth/RegisterEnquiry";
import Contact from "./Public/Components/Contact";
import About from "./Public/Components/About";
const App = () => {
  return (
    <>
      <div style={{marginBottom:"80px"}}>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/enquiry" element={<RegisterEnquiry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <div>
        <About />
      </div>
      <div>
        <Contact />
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
};

export default App;
