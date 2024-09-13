import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import About from "./components/public/About";
import Contact from "./components/public/Contact";
import AdminRoutes from "./components/admin/AdminRoutes";
import PublicLayout from "./components/shared/PublicLayout";
import HomePage from "./components/public/Home";
import Login from "./components/public/Login";
import RegisterEnquiry from "./components/public/RegisterEnquiry";

const App = () => {
  const location = useLocation();
  const pathSet = ["/", "/login", "/about", "/contact", "/enquiry", "/home"];

  return (
    <>
      <ToastContainer />

      {pathSet.includes(location.pathname) ? (
        <PublicLayout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/signin" element={<Login />} />
            <Route path="/enquiry" element={<RegisterEnquiry />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </PublicLayout>
      ) : (
        <AdminRoutes/>

      )}
    </>
  );
};

export default App;
