import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css"; // Import global styles if needed

import { ToastContainer } from "react-toastify";
import PublicRoutes from "./components/public/PublicRoutes";
import About from "./components/public/About";
import Contact from "./components/public/Contact";
import AdminRoutes from "./components/admin/AdminRoutes";
import Footer from "./components/public/Footer";
import Navbar from "./components/public/Navbar";

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
