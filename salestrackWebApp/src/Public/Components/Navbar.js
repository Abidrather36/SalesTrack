import { PrimeIcons } from 'primereact/api';
import React from 'react'
import { Link } from 'react-router-dom'
let projectLogoName = "Sales Track";

function Navbar() {
  return (
    <div>
       <header
        id="header"
        className="header d-flex align-items-center fixed-top"
        style={{
          backgroundColor: "#ffffff", 
          padding: "10px 0",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", 
        }}
      >
        <div className="container-fluid container-xl position-relative d-flex align-items-center">
          <a
            href="index.html"
            className="logo d-flex align-items-center me-auto"
          >
            <h1
              className="sitename"
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                color: "#333", 
                margin: 0,
              }}
            >
              {projectLogoName.toLocaleLowerCase()}
            </h1>
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
                gap: "10px",
                fontWeight: "bolder",
              }}
            >
              <li>
                <Link
                  to="/"
                  className="active"
                  style={{ textDecoration: "none", color: "#333" }}
                >
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/enquiry"
                  style={{ textDecoration: "none", color: "#333" }}
                >
             ENQUIRY
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  style={{ textDecoration: "none", color: "#333" }}
                >
            CONTACT
                </Link>
              </li>
            </ul>
            <i
              className="mobile-nav-toggle d-xl-none bi bi-list"
              style={{ fontSize: "24px" }}
            ></i>
          </nav>
          <Link
            to="/signin"
            className="btn-getstarted"
            style={{
              color: "var(--contrast-color)",
              background: "var(--accent-color)",
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
           <i className={PrimeIcons.SIGN_IN} style={{marginRight:"10px"}}></i>
           Log In
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Navbar
