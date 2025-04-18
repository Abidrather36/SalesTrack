// Original//
// import { PrimeIcons } from "primereact/api";
// import React from "react";
// import { NavLink } from "react-router-dom"; // Use NavLink instead of Link
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
// import "./Navbar.css"
// import webLogo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg"
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
//                 <img src={webLogo} style={{ maxHeight: "76px" }} />
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
//                 gap: "20px",
//                 overflow: "hidden",
//                 position: "relative",
//               }}
//             >
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : ""
//                   }
//                   style={{
//                     textDecoration: "none",
//                     color: "#333",
//                     fontWeight: "600",
//                     position: "relative",
//                     paddingBottom: "5px", /* Space for underline */
//                     transition: "color 0.3s ease",
//                   }}
//                 >
//                   HOME
//                   <span className="underline"></span>
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
//                     position: "relative",
//                     paddingBottom: "5px", /* Space for underline */
//                     transition: "color 0.3s ease",
//                   }}
//                 >
//                   ENQUIRY
//                   <span className="underline"></span>
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
//                     position: "relative",
//                     paddingBottom: "5px", /* Space for underline */
//                     transition: "color 0.3s ease",
//                   }}
//                 >
//                   CONTACT
//                   <span className="underline"></span>
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
//                     position: "relative",
//                     paddingBottom: "5px", /* Space for underline */
//                     transition: "color 0.3s ease",
//                   }}
//                 >
//                   ABOUT
//                   <span className="underline"></span>
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

//       {/* Internal CSS for active link styling and lazy underline animation */}
//       <style>
//         {`
//           /* Active link styling */
//           .active-link {
//             color: #00bcd4 !important; /* Aquablue color */
//             font-weight: 700 !important; /* Slightly heavier font for active links */
//           }

//           /* Default link styling */
//           nav ul li a {
//             text-decoration: none; /* Remove underline */
//             color: #555; /* Subtle gray for default links */
//             font-family: 'Roboto', sans-serif; /* Clean, modern font */
//             font-weight: 500; /* Medium font weight for better readability */
//             padding: 5px 10px; /* Add some padding for spacing */
//             transition: color 0.3s ease, transform 0.3s ease; /* Smooth transitions */
//             position: relative;
//           }

//           /* Hover effect */
//           nav ul li a:hover {
//             color: #00bcd4; /* Aquablue hover effect */
//           }

//           /* Underline styling */
//           .underline {
//             position: absolute;
//             bottom: 0;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background-color: #00bcd4;
//             transition: width 0.6s ease-out;
//           }

//           nav ul li a:hover .underline {
//             width: 100%; /* Expand underline to full width on hover */
//           }

//           nav ul li a.active-link .underline {
//             width: 100%; /* Full width underline for active links */
//             transition: width 0.3s ease-out; /* Faster transition for active links */
//           }

//           /* Nav container styling */
//           nav ul {
//             margin: 0;
//             padding: 0;
//             display: flex;
//             gap: 20px; /* Increase gap between links */
//           }

//           /* Navbar responsiveness */
//           @media (max-width: 768px) {
//             nav ul {
//               flex-direction: column; /* Stack links vertically on smaller screens */
//               gap: 10px; /* Adjust spacing */
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }
 
// export default Navbar;

///Breadcrumb working and responsive //
import { PrimeIcons } from "primereact/api";

import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import webLogo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div>
      <header
        id="header"
        className="header d-flex align-items-center fixed-top"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center me-auto">
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
                <img src={webLogo} style={{ maxHeight: "76px" }} alt="Logo" />
              </h1>
            </NavLink>
          </a>

          <nav
            id="navmenu"
            className={`navmenu ${isMobileMenuOpen ? "mobile-active" : ""}`}
          >
            <ul>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "active-link link-default" : "link-default"
                  }
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
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
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ABOUT
                  <span className="underline"></span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <div className="d-flex align-items-center">
            <NavLink to="/login" className="btn-getstarted">
              <i className={PrimeIcons.SIGN_IN}></i>
              Log In
            </NavLink>
            <i
              className={`mobile-nav-toggle bi ${
                isMobileMenuOpen ? "bi-x" : "bi-list"
              }`}
              onClick={toggleMobileMenu}
            ></i>
          </div>
        </div>
      </header>

      <style>
  {`
    .active-link {
      color: #00bcd4 !important;
      font-weight: 700 !important;
    }

    .navmenu ul {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      gap: 20px;
    }

    .navmenu li a {
      text-decoration: none;
      color: #333;
      font-weight: 600;
      position: relative;
      padding-bottom: 1px;
      transition: color 0.4s ease-in-out;
    }

    .underline {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 0;
      height: 2px;
      background-color: #00bcd4;
      transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .navmenu li a:hover .underline,
    .navmenu li a.active-link .underline {
      width: 100%;
    }

    .btn-getstarted {
      color: var(--contrast-color);
      font-size: 14px;
      padding: 8px 25px;
      margin-left: 30px;
      border-radius: 50px;
      transition: all 0.4s ease-in-out;
      text-decoration: none;
      display: flex;
      align-items: center;
      gap: 10px;
      background-color: transparent;
    }

    .btn-getstarted:hover {
      background-color: #00bcd4;
      color: white;
    }

    .mobile-nav-toggle {
      font-size: 26px;
      cursor: pointer;
      display: none;
      color: #333;
      transition: transform 0.4s ease-in-out;
    }

    .mobile-nav-toggle:hover {
      transform: scale(1.1);
    }

    @media (max-width: 1199px) {
      .mobile-nav-toggle {
        display: block;
      }

      .link-default{
        textDecoration: "none",
        color: "#333",
        fontWeight: "600",
        position: "relative",
        paddingBottom: "5px", /* Space for underline */
        transition: "color 0.3s ease"
      }

      .navmenu {
        position: fixed;
        top: 0;
        right: 0;
        width: 300px;
        height: 100vh;
        background: #fff;
        padding: 80px 20px 20px;
        transform: translateX(100%);
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
        z-index: 999;
      }

      .navmenu.mobile-active {
        transform: translateX(0);
      }

      .navmenu ul {
        flex-direction: column;
        gap: 30px;
      }

      .btn-getstarted {
        margin-left: 15px;
      }
    }

    @media (max-width: 576px) {
      .sitename img {
        max-height: 60px;
      }

      .btn-getstarted {
        padding: 6px 15px;
        font-size: 12px;
      }
    }
  `}
</style>

    </div>
  );
}

export default Navbar;


//DS//

// import { PrimeIcons } from "primereact/api";

// import React, { useState } from "react";
// import { NavLink } from "react-router-dom";
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
// import "./Navbar.css";
// import webLogo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

// let projectLogoName = "Sales Track";

// function Navbar() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <div>
//       <header
//         id="header"
//         className="header d-flex align-items-center fixed-top"
//         style={{
//           backgroundColor: "#ffffff",
//           boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
//         }}
//       >
//         <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
//           <a href="index.html" className="logo d-flex align-items-center me-auto">
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
//                 <img src={webLogo} style={{ maxHeight: "76px" }} alt="Logo" />
//               </h1>
//             </NavLink>
//           </a>

//           <nav
//             id="navmenu"
//             className={`navmenu ${isMobileMenuOpen ? "mobile-active" : ""}`}
//           >
//             <ul>
//               <li>
//                 <NavLink
//                   to="/"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : ""
//                   }
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   HOME
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/enquiry"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : ""
//                   }
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   ENQUIRY
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/contact"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : ""
//                   }
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   CONTACT
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//               <li>
//                 <NavLink
//                   to="/about"
//                   className={({ isActive }) =>
//                     isActive ? "active-link" : ""
//                   }
//                   onClick={() => setIsMobileMenuOpen(false)}
//                 >
//                   ABOUT
//                   <span className="underline"></span>
//                 </NavLink>
//               </li>
//             </ul>
//           </nav>

//           <div className="d-flex align-items-center">
//             <NavLink to="/login" className="btn-getstarted">
//               <i className={PrimeIcons.SIGN_IN}></i>
//               Log In
//             </NavLink>
//             <i
//               className={`mobile-nav-toggle bi ${
//                 isMobileMenuOpen ? "bi-x" : "bi-list"
//               }`}
//               onClick={toggleMobileMenu}
//             ></i>
//           </div>
//         </div>
//       </header>

//       <style>
//         {`
//           /* Active link styling */
//           .active-link {
//             color: #00bcd4 !important;
//             font-weight: 700 !important;
//           }

//           /* Nav container styling */
//           .navmenu ul {
//             margin: 0;
//             padding: 0;
//             display: flex;
//             gap: 20px;
//             list-style: none;
//           }

//           /* Default link styling */
//           .navmenu ul li a {
//             text-decoration: none;
//             color: #555;
//             font-family: 'Roboto', sans-serif;
//             font-weight: 500;
//             padding: 5px 10px;
//             transition: color 0.3s ease;
//             position: relative;
//           }

//           /* Hover effect */
//           .navmenu ul li a:hover {
//             color: #00bcd4;
//           }

//           /* Underline styling - fixed position */
//           .underline {
//             position: absolute;
//             bottom: -5px;
//             left: 0;
//             width: 0;
//             height: 2px;
//             background-color: #00bcd4;
//             transition: width 0.3s ease-out;
//           }

//           .navmenu ul li a:hover .underline,
//           .navmenu ul li a.active-link .underline {
//             width: 100%;
//           }

//           .btn-getstarted {
//             color: var(--contrast-color);
//             font-size: 14px;
//             padding: 8px 25px;
//             margin-left: 30px;
//             border-radius: 50px;
//             transition: 0.3s;
//             text-decoration: none;
//             display: flex;
//             align-items: center;
//             gap: 10px;
//           }

//           .mobile-nav-toggle {
//             font-size: 24px;
//             cursor: pointer;
//             display: none;
//             color: #333;
//           }

//           @media (max-width: 991px) {
//             .mobile-nav-toggle {
//               display: block;
//             }

//             .navmenu {
//               position: fixed;
//               top: 0;
//               right: -100%;
//               width: 300px;
//               height: 100vh;
//               background: #fff;
//               padding: 80px 20px 20px;
//               transition: right 0.3s ease-in-out;
//               box-shadow: -2px 0 5px rgba(0,0,0,0.2);
//               z-index: 999;
//             }

//             .navmenu.mobile-active {
//               right: 0;
//             }

//             .navmenu ul {
//               flex-direction: column;
//               gap: 30px;
//             }

//             .btn-getstarted {
//               margin-left: 15px;
//             }
//           }

//           @media (max-width: 576px) {
//             .sitename img {
//               max-height: 60px;
//             }

//             .btn-getstarted {
//               padding: 6px 15px;
//               font-size: 12px;
//             }
//           }
//         `}
//       </style>
//     </div>
//   );
// }

// export default Navbar;
























