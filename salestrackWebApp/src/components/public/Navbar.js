import { PrimeIcons } from "primereact/api";
import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
import "./Navbar.css"
import webLogo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg"
let projectLogoName = "Sales Track";

function Navbar() {
  return (
    <div>
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
        style={{
          backgroundColor: "#ffffff",
        }}
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto"
          >
            <NavLink to="/">
              <h1
                className="sitename"
                style={{
                  fontSize: "24px",
                  fontWeight: "bold",
                  color: "#333",
                  margin: 0,
                }}
              >
                <img src={webLogo} style={{ maxHeight: "76px" }} />
              </h1>
            </NavLink>
          </a>
          <nav
            id="navmenu"
            className="navmenu"
            style={{
              marginLeft: "auto",
            }}
          >
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                gap: "20px",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "600",
                    position: "relative",
                    paddingBottom: "5px", /* Space for underline */
                    transition: "color 0.3s ease",
                  }}
                >
                  HOME
                  <span className="underline"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/enquiry"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "600",
                    position: "relative",
                    paddingBottom: "5px", /* Space for underline */
                    transition: "color 0.3s ease",
                  }}
                >
                  ENQUIRY
                  <span className="underline"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "600",
                    position: "relative",
                    paddingBottom: "5px", /* Space for underline */
                    transition: "color 0.3s ease",
                  }}
                >
                  CONTACT
                  <span className="underline"></span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "active-link" : ""
                  }
                  style={{
                    textDecoration: "none",
                    color: "#333",
                    fontWeight: "600",
                    position: "relative",
                    paddingBottom: "5px", /* Space for underline */
                    transition: "color 0.3s ease",
                  }}
                >
                  ABOUT
                  <span className="underline"></span>
                </NavLink>
              </li>
            </ul>
            <i
              className="mobile-nav-toggle d-xl-none bi bi-list"
              style={{ fontSize: "24px" }}
            ></i>
          </nav>
          <NavLink
            to="/login"
            className="btn-getstarted"
            style={{
              color: "var(--contrast-color)",
              fontSize: "14px",
              padding: "8px 25px",
              margin: "0 0 0 30px",
              borderRadius: "50px",
              transition: "0.3s",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <i
              className={PrimeIcons.SIGN_IN}
              style={{ marginRight: "10px" }}
            ></i>
            Log In
          </NavLink>
        </div>
      </header>

      {/* Internal CSS for active link styling and lazy underline animation */}
      <style>
        {`
          /* Active link styling */
          .active-link {
            color: #00bcd4 !important; /* Aquablue color */
            font-weight: 700 !important; /* Slightly heavier font for active links */
          }

          /* Default link styling */
          nav ul li a {
            text-decoration: none; /* Remove underline */
            color: #555; /* Subtle gray for default links */
            font-family: 'Roboto', sans-serif; /* Clean, modern font */
            font-weight: 500; /* Medium font weight for better readability */
            padding: 5px 10px; /* Add some padding for spacing */
            transition: color 0.3s ease, transform 0.3s ease; /* Smooth transitions */
            position: relative;
          }

          /* Hover effect */
          nav ul li a:hover {
            color: #00bcd4; /* Aquablue hover effect */
          }

          /* Underline styling */
          .underline {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background-color: #00bcd4;
            transition: width 0.6s ease-out;
          }

          nav ul li a:hover .underline {
            width: 100%; /* Expand underline to full width on hover */
          }

          nav ul li a.active-link .underline {
            width: 100%; /* Full width underline for active links */
            transition: width 0.3s ease-out; /* Faster transition for active links */
          }

          /* Nav container styling */
          nav ul {
            margin: 0;
            padding: 0;
            display: flex;
            gap: 20px; /* Increase gap between links */
          }

          /* Navbar responsiveness */
          @media (max-width: 768px) {
            nav ul {
              flex-direction: column; /* Stack links vertically on smaller screens */
              gap: 10px; /* Adjust spacing */
            }
          }
        `}
      </style>
    </div>
  );
}
 
export default Navbar;







