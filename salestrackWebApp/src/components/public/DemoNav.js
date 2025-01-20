import React, { useState, useEffect } from "react";

const DemoNav = () => {
  const [isShrunk, setIsShrunk] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsShrunk(true);
      } else {
        setIsShrunk(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navbarStyle = {
    position: "fixed",
    top: 0,
    width: "100%",
    backgroundColor: "#03045e",
    color: "white",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: isShrunk ? "10px 50px" : "20px 50px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
    transition: "all 0.3s ease-in-out",
    zIndex: 1000,
  };

  const logoStyle = {
    fontSize: isShrunk ? "1.5rem" : "2rem",
    transition: "font-size 0.3s ease-in-out",
  };

  const navItemsStyle = {
    display: "flex",
    gap: "20px",
  };

  const navItemStyle = {
    textDecoration: "none",
    color: "white",
    fontSize: "1rem",
    transition: "color 0.3s ease-in-out",
  };

  const contentStyle = {
    padding: "100px 50px",
    marginTop: "80px",
    height: "2000px", // Just for demo purposes
  };

  return (
    <>
      <div style={navbarStyle}>
        <div style={logoStyle}>My Logo</div>
        <div style={navItemsStyle}>
          <a href="#" style={navItemStyle}>
            Home
          </a>
          <a href="#" style={navItemStyle}>
            About
          </a>
          <a href="#" style={navItemStyle}>
            Services
          </a>
          <a href="#" style={navItemStyle}>
            Contact
          </a>
        </div>
      </div>
      <div style={contentStyle}>
        <h1>Scroll Down</h1>
        <p>Keep scrolling to see the navbar shrink and grow back to its original size!</p>
      </div>
    </>
  );
};

export default DemoNav;
