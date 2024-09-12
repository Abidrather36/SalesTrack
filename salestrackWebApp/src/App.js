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
import PublicRoutes from "./Public/Components/PublicRoutes";
import AdminRoutes from "./Models/Admin/AdminRoutes";
import EnquiryList from "./Admin/Component/EnquiryList";
import { ToastContainer } from "react-toastify";

const App = () => {
  const location = useLocation();
  const pathSet = ["/", "/login", "/about", "/contact", "/enquiry", "/home"];

  return (
    <>
      <ToastContainer />
    {pathSet.includes(location.pathname) && (
      <div className={{marginTop:"80px"}}>
        <Navbar />
      </div>
    )}

      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
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

     {pathSet.includes(location.pathname) && (
       <div style={{ marginBottom: "80px" }}>
       <Footer />
     </div>
     )}
    </>
  );
};

export default App;
