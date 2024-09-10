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

const App = () => {
  const location = useLocation();

  return (
    // <>
    //   <div style={{ marginBottom: "80px" }}>
    //     <Navbar />
    //   </div>

    //   <Routes>
    //     <Route path="/*" element={<PublicRoutes/>}/>
    //     <Route path="/admin/*" element={<AdminRoutes />} /> 
    //   </Routes>

    //   {location.pathname === "/" && (
    //     <>
    //       <div>
    //         <About />
    //       </div>
    //       <div>
    //         <Contact />
    //       </div>
    //     </>
    //   )}

    //   <div>
    //     <Footer />
    //   </div>
    // </>
<EnquiryList/>
  );
};

export default App;
