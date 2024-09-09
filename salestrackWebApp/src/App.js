import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import HomePage from "./Public/Components/Home";
import Footer from "./Public/Components/Footer";
import Login from "./Public/Components/Auth/Login";
import "./App.css"; // Import global styles if needed
import Navbar from "./Public/Components/Navbar";
import RegisterEnquiry from "./Public/Components/Auth/RegisterEnquiry";
import Contact from "./Public/Components/Contact";
import About from "./Public/Components/About";
import AdminSignUp from "./Admin/Component/adminSignUp";
import AdminDashboard from "./Admin/Component/adminDashboard";

const App = () => {
  const location = useLocation();

  return (
    <>
      <div style={{ marginBottom: "80px" }}>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<Login />} />
        <Route path="/enquiry" element={<RegisterEnquiry />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/adminSignUp" element={<AdminSignUp />} />
        <Route path="/adminDashboard" element={<AdminDashboard />} />
      </Routes>

      {location.pathname === "/" && (
        <>
          <div>
            <About />
          </div>
          <div>
            <Contact />
          </div>
        </>
      )}

      <div>
        <Footer />
      </div>
    </>
  );
};

export default App;
