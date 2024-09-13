import React from "react";
import Navbar from "../public/Navbar";
import Footer from "../public/Footer";

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{marginTop:"100px"}}>{children}</main>
      <Footer />
    </>
  );
}

export default PublicLayout;
