import React from "react";
import Navbar from "../public/Navbar";
import Footer from "../public/Footer";
import { Outlet } from "react-router-dom";

function PublicLayout() {
  return (
    <>
      <Navbar />
      <main style={{marginTop:"100px"}}><Outlet/></main>
      <Footer />
    </>
  );
}

export default PublicLayout;
