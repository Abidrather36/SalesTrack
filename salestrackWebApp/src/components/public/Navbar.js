// import { PrimeIcons } from "primereact/api";
// import React from "react";
// import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

// let projectLogoName = "Sales Track";

// function Navbar() {
//   return (
//     <div>
//       <header
//         id="header"
//         className="header d-flex align-items-center fixed-top"
//         style={{
//           backgroundColor: "#ffffff",
//         }}
//       >
//         <div className="container-fluid container-xl position-relative d-flex align-items-center">
//           <a
//             href="index.html"
//             className="logo d-flex align-items-center me-auto"
//           >
//             <NavLink to="/">
//               <h1
//                 className="sitename"
//                 style={{
//                   fontSize: "24px",
//                   fontWeight: "bold",
//                   color: "#333",
//                   margin: 0,
//                 }}
//               >
//                 <img src={logo} style={{ maxHeight: "76px" }} />
//               </h1>
//             </NavLink>
//           </a>
//           <nav
//             id="navmenu"
//             className="navmenu"
//             style={{
//               marginLeft: "auto",
//             }}
//           >
//             <ul
//               style={{
//                 listStyle: "none",
//                 padding: 0,
//                 margin: 0,
//                 display: "flex",
//                 gap: "10px",
//               }}
//             >
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : "" // Add active-link class if active
//                   }
//                   style={{
//                     textDecoration: "none",
//                     color: "#333",
//                     fontWeight: "600",
//                   }}
//                 >
//                   HOME
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/enquiry"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : ""
//                   }
//                   style={{
//                     textDecoration: "none",
//                     color: "#333",
//                     fontWeight: "600",
//                   }}
//                 >
//                   ENQUIRY
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : ""
//                   }
//                   style={{
//                     textDecoration: "none",
//                     color: "#333",
//                     fontWeight: "600",
//                   }}
//                 >
//                   CONTACT
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : ""
//                   }
//                   style={{
//                     textDecoration: "none",
//                     color: "#333",
//                     fontWeight: "600",
//                   }}
//                 >
//                   ABOUT
//                 </NavLink>
//               </li>
//             </ul>
//             <i
//               className="mobile-nav-toggle d-xl-none bi bi-list"
//               style={{ fontSize: "24px" }}
//             ></i>
//           </nav>
//           <NavLink
//             to="/login"
//             className="btn-getstarted"
//             style={{
//               color: "var(--contrast-color)",
//               fontSize: "14px",
//               padding: "8px 25px",
//               margin: "0 0 0 30px",
//               borderRadius: "50px",
//               transition: "0.3s",
//               textDecoration: "none",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//             <i
//               className={PrimeIcons.SIGN_IN}
//               style={{ marginRight: "10px" }}
//             ></i>
//             Log In
//           </NavLink>
//         </div>
//       </header>

//       {/* Internal CSS for active link styling */}
//     <style>
//   {`
//     /* Active link styling */
//     .active-link {
//       color: #00bcd4 !important; /* Aquablue color */
//       font-weight: 700 !important; /* Slightly heavier font for active links */
//       border-bottom: 2px solid #00bcd4; /* Underline the active link */
//       transition: all 0.3s ease; /* Smooth transition */
//     }

//     /* Default link styling */
//     nav ul li a {
//       text-decoration: none; /* Remove underline */
//       color: #555; /* Subtle gray for default links */
//       font-family: 'Roboto', sans-serif; /* Clean, modern font */
//       font-weight: 500; /* Medium font weight for better readability */
//       padding: 5px 10px; /* Add some padding for spacing */
//       transition: all 0.3s ease; /* Smooth transitions for hover/active states */
//     }

//     /* Hover effect */
//     nav ul li a:hover {
//       color: #00bcd4; /* Aquablue hover effect */
//       background-color: rgba(0, 188, 212, 0.1); /* Subtle aquablue background */
//       border-radius: 5px; /* Rounded corners for hover state */
//     }

//     /* Nav container styling */
//     nav ul {
//       margin: 0;
//       padding: 0;
//       display: flex;
//       gap: 20px; /* Increase gap between links */
//     }

//     /* Navbar responsiveness */
//     @media (max-width: 768px) {
//       nav ul {
//         flex-direction: column; /* Stack links vertically on smaller screens */
//         gap: 10px; /* Adjust spacing */
//       }
//     }
//   `}
// </style>

//     </div>
//   );
// }

// export default Navbar;

//Original

import { PrimeIcons } from "primereact/api";
import React from "react";
import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
import "./Navbar.css"

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
                <img src={logo} style={{ maxHeight: "76px" }} />
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


//Deepseek//

// import { PrimeIcons } from "primereact/api";
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

// function Navbar() {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div>
//       <header
//         className="header d-flex align-items-center fixed-top"
//         style={{
//           backgroundColor: "#ffffff",
//           boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
//           zIndex: 1000,
//         }}
//       >
//         <div className="container-fluid container-xl d-flex justify-content-between align-items-center">
//           <NavLink to="/" className="logo d-flex align-items-center">
//             <img src={logo} alt="Logo" style={{ maxHeight: "60px" }} />
//           </NavLink>

//           <nav className={`navmenu ${isMobileMenuOpen ? "open" : ""}`}>
//             <ul className="nav-list">
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) => (isActive ? "active-link" : "")}
//                 >
//                   HOME
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/enquiry"
//                   className={({ isActive }) => (isActive ? "active-link" : "")}
//                 >
//                   ENQUIRY
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className={({ isActive }) => (isActive ? "active-link" : "")}
//                 >
//                   CONTACT
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className={({ isActive }) => (isActive ? "active-link" : "")}
//                 >
//                   ABOUT
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li className="mobile-login">
//                 <NavLink to="/login" className="btn-getstarted">
//                   <i className={PrimeIcons.SIGN_IN}></i>
//                   Log In
//                 </NavLink>
//               </li>
//             </ul>
//           </nav>

//           <NavLink to="/login" className="btn-getstarted desktop-login">
//             <i className={PrimeIcons.SIGN_IN}></i>
//             Log In
//           </NavLink>

//           <button
//             className={`mobile-nav-toggle ${isMobileMenuOpen ? "open" : ""}`}
//             onClick={toggleMobileMenu}
//             aria-label="Toggle navigation"
//           >
//             <span className="toggle-icon"></span>
//           </button>
//         </div>
//       </header>

//       <style>
//         {`
//           .header {
//             padding: 1rem 0;
//           }

//           .navmenu {
//             display: flex;
//             align-items: center;
//           }

//           .nav-list {
//             display: flex;
//             gap: 2rem;
//             margin: 0;
//             padding: 0;
//             list-style: none;
//           }

//           .nav-list a {
//             text-decoration: none;
//             color: #333;
//             font-weight: 500;
//             position: relative;
//             padding: 0.5rem 0;
//             transition: color 0.3s ease;
//           }

//           .underline {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background-color: #00bcd4;
//             transition: width 0.3s ease-out;
//           }

//           .nav-list a:hover .underline,
//           .active-link .underline {
//             width: 100%;
//           }

//           .active-link {
//             color: #00bcd4 !important;
//             font-weight: 600 !important;
//           }

//           .btn-getstarted {
//             background: #00bcd4;
//             color: white !important;
//             padding: 0.5rem 1.5rem;
//             border-radius: 50px;
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             transition: background 0.3s ease;
//           }

//           .btn-getstarted:hover {
//             background: #0097a7;
//           }

//           .mobile-nav-toggle {
//             display: none;
//             background: none;
//             border: none;
//             padding: 0.5rem;
//             cursor: pointer;
//             z-index: 1001;
//           }

//           .toggle-icon {
//             display: block;
//             width: 24px;
//             height: 2px;
//             background: #333;
//             position: relative;
//             transition: all 0.3s ease;
//           }

//           .toggle-icon::before,
//           .toggle-icon::after {
//             content: '';
//             position: absolute;
//             width: 24px;
//             height: 2px;
//             background: #333;
//             transition: all 0.3s ease;
//           }

//           .toggle-icon::before {
//             transform: translateY(-6px);
//           }

//           .toggle-icon::after {
//             transform: translateY(6px);
//           }

//           .mobile-nav-toggle.open .toggle-icon {
//             background: transparent;
//           }

//           .mobile-nav-toggle.open .toggle-icon::before {
//             transform: rotate(45deg);
//           }

//           .mobile-nav-toggle.open .toggle-icon::after {
//             transform: rotate(-45deg);
//           }

//           .mobile-login {
//             display: none;
//           }

//                   @media (max-width: 768px) {
//             .navmenu {
//               position: fixed;
//               top: 80px;
//               left: -100%;
//               width: 100%;
//               height: calc(100vh - 80px);
//               background: white;
//               flex-direction: column;
//               padding: 2rem;
//               transition: transform 0.3s ease-in-out;
//               box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
//               z-index: 1002;
//               display: flex;
//             }

//             .navmenu.open {
//               transform: translateX(100%);
//               left: 0;
//             }

//             .nav-list {
//               flex-direction: column;
//               gap: 1.5rem;
//               width: 100%;
//               text-align: center;
//             }

//             .mobile-nav-toggle {
//               display: block;
//               z-index: 1003;
//             }

//             .desktop-login {
//               display: none;
//             }

//             .mobile-login {
//               display: block;
//               margin-top: 2rem;
//             }

//             .btn-getstarted {
//               justify-content: center;
//               width: 100%;
//             }
//               }


//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default Navbar;



//Deepseek 2//


// import { PrimeIcons } from "primereact/api";
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

// function Navbar() {
//   const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div>
//       <header
//         className="header d-flex align-items-center fixed-top"
//         style={{
//           backgroundColor: "#ffffff",
//           boxShadow: "0 2px 15px rgba(0, 0, 0, 0.1)",
//           zIndex: 1000,
//         }}
//       >
//         <div className="container-fluid container-xl d-flex justify-content-between align-items-center">
//           <NavLink to="/" className="logo d-flex align-items-center">
//             <img src={logo} alt="Logo" style={{ maxHeight: "60px" }} />
//           </NavLink>

//           <nav className={`navmenu ${isMobileMenuOpen ? "open" : ""}`}>
//             <ul className="nav-list">
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) => (isActive ? "active-link" : "")}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   HOME
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/enquiry"
//                   className={({ isActive }) => (isActive ? "active-link" : "")}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   ENQUIRY
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className={({ isActive }) => (isActive ? "active-link" : "")}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   CONTACT
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className={({ isActive }) => (isActive ? "active-link" : "")}
//                   onClick={() => setMobileMenuOpen(false)}
//                 >
//                   ABOUT
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li className="mobile-login">
//                 <NavLink to="/login" className="btn-getstarted" onClick={() => setMobileMenuOpen(false)}>
//                   <i className={PrimeIcons.SIGN_IN}></i>
//                   Log In
//                 </NavLink>
//               </li>
//             </ul>
//           </nav>

//           <NavLink to="/login" className="btn-getstarted desktop-login">
//             <i className={PrimeIcons.SIGN_IN}></i>
//             Log In
//           </NavLink>

//           <button
//             className={`mobile-nav-toggle ${isMobileMenuOpen ? "open" : ""}`}
//             onClick={toggleMobileMenu}
//             aria-label="Toggle navigation"
//           >
//             <span className="toggle-icon"></span>
//           </button>
//         </div>
//       </header>

//       <style>
//         {`
//           .header {
//             padding: 1rem 0;
//           }

//           .navmenu {
//             display: flex;
//             align-items: center;
//           }

//           .nav-list {
//             display: flex;
//             gap: 2rem;
//             margin: 0;
//             padding: 0;
//             list-style: none;
//           }

//           .nav-list a {
//             text-decoration: none;
//             color: #333;
//             font-weight: 500;
//             position: relative;
//             padding: 0.5rem 0;
//             transition: color 0.3s ease;
//           }

//           .underline {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background-color: #00bcd4;
//             transition: width 0.3s ease-out;
//           }

//           .nav-list a:hover .underline,
//           .active-link .underline {
//             width: 100%;
//           }

//           .active-link {
//             color: #00bcd4 !important;
//             font-weight: 600 !important;
//           }

//           .btn-getstarted {
//             background: #00bcd4;
//             color: white !important;
//             padding: 0.5rem 1.5rem;
//             border-radius: 50px;
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             transition: background 0.3s ease;
//           }

//           .btn-getstarted:hover {
//             background: #0097a7;
//           }

//           .mobile-nav-toggle {
//             display: none;
//             background: none;
//             border: none;
//             padding: 0.5rem;
//             cursor: pointer;
//             z-index: 1001;
//           }

//           .toggle-icon {
//             display: block;
//             width: 24px;
//             height: 2px;
//             background: #333;
//             position: relative;
//             transition: all 0.3s ease;
//           }

//           .toggle-icon::before,
//           .toggle-icon::after {
//             content: '';
//             position: absolute;
//             width: 24px;
//             height: 2px;
//             background: #333;
//             transition: all 0.3s ease;
//           }

//           .toggle-icon::before {
//             transform: translateY(-6px);
//           }

//           .toggle-icon::after {
//             transform: translateY(6px);
//           }

//           .mobile-nav-toggle.open .toggle-icon {
//             background: transparent;
//           }

//           .mobile-nav-toggle.open .toggle-icon::before {
//             transform: rotate(45deg);
//           }

//           .mobile-nav-toggle.open .toggle-icon::after {
//             transform: rotate(-45deg);
//           }

//           .mobile-login {
//             display: none;
//           }

//           @media (max-width: 768px) {
//             .header {
//               padding: 0.5rem 0;
//             }

//             .logo img {
//               max-height: 50px !important;
//             }

//             .navmenu {
//               position: fixed;
//               top: 92px;
//               left: 0;
//               width: 100%;
//               height: calc(100vh - 92px);
//               background: white;
//               flex-direction: column;
//               padding: 1rem;
//               transition: transform 0.3s ease-in-out;
//               transform: translateX(-100%);
//               box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
//               z-index: 1002;
//             }

//             .navmenu.open {
//               transform: translateX(0);
//             }

//             .nav-list {
//               flex-direction: column;
//               gap: 1.5rem;
//               width: 100%;
//               text-align: center;
//             }

//             .mobile-nav-toggle {
//               display: block;
//               z-index: 1003;
//             }

//             .desktop-login {
//               display: none;
//             }

//             .mobile-login {
//               display: block;
//               margin-top: 2rem;
//             }

//             .btn-getstarted {
//               justify-content: center;
//               width: 100%;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default Navbar;



//Qwen //
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { PrimeIcons } from "primereact/api";
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
// import "./Navbar.css";

// function Navbar() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//     <header
//       id="header"
//       className="header fixed-top"
//       style={{
//         backgroundColor: "#ffffff",
//         zIndex: 1000,
//       }}
//     >
//       <div className="container-fluid d-flex align-items-center justify-content-between">
//         {/* Logo */}
//         <NavLink to="/" className="logo d-flex align-items-center">
//           <img
//             src={logo}
//             alt="Logo"
//             style={{
//               maxHeight: "50px",
//               marginRight: "10px",
//             }}
//           />
//           <h1
//             className="sitename"
//             style={{
//               fontSize: "24px",
//               fontWeight: "bold",
//               color: "#333",
//               margin: 0,
//             }}
//           >
//             Sales Track
//           </h1>
//         </NavLink>

//         {/* Mobile Nav Toggle */}
//         <i
//           className={`mobile-nav-toggle bi ${isMenuOpen ? "bi-x" : "bi-list"}`}
//           onClick={toggleMenu}
//           style={{
//             fontSize: "28px",
//             cursor: "pointer",
//             display: "none",
//           }}
//         ></i>

//         {/* Navigation Menu */}
//         <nav
//           className={`navmenu ${isMenuOpen ? "active" : ""}`}
//           style={{
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           <ul
//             className="nav-links"
//             style={{
//               listStyle: "none",
//               padding: 0,
//               margin: 0,
//               display: "flex",
//               gap: "20px",
//             }}
//           >
//             <li>
//               <NavLink
//                 to="/"
//                 className={({ isActive }) => (isActive ? "active-link" : "")}
//                 style={{
//                   textDecoration: "none",
//                   color: "#333",
//                   fontWeight: "600",
//                   position: "relative",
//                   paddingBottom: "5px",
//                   transition: "color 0.3s ease",
//                 }}
//               >
//                 HOME
//                 <span className="underline"></span>
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/enquiry"
//                 className={({ isActive }) => (isActive ? "active-link" : "")}
//                 style={{
//                   textDecoration: "none",
//                   color: "#333",
//                   fontWeight: "600",
//                   position: "relative",
//                   paddingBottom: "5px",
//                   transition: "color 0.3s ease",
//                 }}
//               >
//                 ENQUIRY
//                 <span className="underline"></span>
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/contact"
//                 className={({ isActive }) => (isActive ? "active-link" : "")}
//                 style={{
//                   textDecoration: "none",
//                   color: "#333",
//                   fontWeight: "600",
//                   position: "relative",
//                   paddingBottom: "5px",
//                   transition: "color 0.3s ease",
//                 }}
//               >
//                 CONTACT
//                 <span className="underline"></span>
//               </NavLink>
//             </li>
//             <li>
//               <NavLink
//                 to="/about"
//                 className={({ isActive }) => (isActive ? "active-link" : "")}
//                 style={{
//                   textDecoration: "none",
//                   color: "#333",
//                   fontWeight: "600",
//                   position: "relative",
//                   paddingBottom: "5px",
//                   transition: "color 0.3s ease",
//                 }}
//               >
//                 ABOUT
//                 <span className="underline"></span>
//               </NavLink>
//             </li>
//           </ul>

//           {/* Login Button */}
//           <NavLink
//             to="/login"
//             className="btn-getstarted"
//             style={{
//               color: "#fff",
//               backgroundColor: "#00bcd4",
//               padding: "8px 20px",
//               borderRadius: "50px",
//               textDecoration: "none",
//               fontWeight: "600",
//               transition: "background-color 0.3s ease",
//             }}
//           >
//             <i
//               className={PrimeIcons.SIGN_IN}
//               style={{ marginRight: "8px" }}
//             ></i>
//             Log In
//           </NavLink>
//         </nav>
//       </div>

//       {/* Internal CSS */}
//       <style>
//         {`
//           /* Active Link Styling */
//           .active-link {
//             color: #00bcd4 !important;
//             font-weight: 700 !important;
//           }

//           /* Underline Animation */
//           .underline {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background-color: #00bcd4;
//             transition: width 0.3s ease-out;
//           }

//           nav ul li a:hover .underline,
//           nav ul li a.active-link .underline {
//             width: 100%;
//           }

//           /* Responsive Design */
//           @media (max-width: 992px) {
//             .mobile-nav-toggle {
//               display: block;
//             }

//             .navmenu {
//               position: fixed;
//               top: 60px;
//               left: 0;
//               width: 100%;
//               background: #fff;
//               flex-direction: column;
//               align-items: center;
//               padding: 20px 0;
//               box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
//               transform: translateX(${isMenuOpen ? "0" : "100%"});
//               transition: transform 0.3s ease-in-out;
//             }

//             .nav-links {
//               flex-direction: column;
//               gap: 15px;
//             }

//             .btn-getstarted {
//               margin-top: 20px;
//             }
//           }

//           /* Hide Navmenu by Default on Mobile */
//           .navmenu:not(.active) {
//             display: none;
//           }

//           /* Small Screen Adjustments */
//           @media (max-width: 480px) {
//             .sitename {
//               display: none;
//             }

//             .logo img {
//               maxHeight: 40px;
//             }

//             .btn-getstarted {
//               width: 100%;
//               text-align: center;
//             }
//           }
//         `}
//       </style>
//     </header>
//   );
// }

// export default Navbar;

//In this Burger Works 
// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import { PrimeIcons } from "primereact/api";
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

// import "./Navbar.css";

// const Navbar = () => {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <header className="navbar">
//       <div className="navbar-container">
//         {/* Logo */}
//         <NavLink to="/" className="logo">
//           <img src={logo} alt="Sales Track" className="logo-img" />
//         </NavLink>

//         {/* Burger Icon for Mobile */}
//         <button
//           className="menu-toggle"
//           onClick={() => setMenuOpen(!menuOpen)}
//           aria-label="Toggle Menu"
//         >
//           <i className={menuOpen ? PrimeIcons.TIMES : PrimeIcons.BARS}></i>
//         </button>

//         {/* Navigation Menu */}
//         <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
//           <NavLink to="/" activeClassName="active">
//             HOME
//           </NavLink>
//           <NavLink to="/enquiry" activeClassName="active">
//             ENQUIRY
//           </NavLink>
//           <NavLink to="/contact" activeClassName="active">
//             CONTACT
//           </NavLink>
//           <NavLink to="/about" activeClassName="active">
//             ABOUT
//           </NavLink>
//         </nav>

//         {/* Login Button */}
//         <NavLink to="/login" className="btn-login">
//           <i className={PrimeIcons.SIGN_IN}></i> Log In
//         </NavLink>
//       </div>
//     </header>
//   );
// };

// export default Navbar;
