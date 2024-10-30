import React from "react";
import { Link } from "react-router-dom";
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg"

function Sidebar({ labels = [] }) {
  return (
    <nav
      className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
      id="navbarVertical"
    >
      <div className="container-fluid">
        <button
          aria-controls="sidebarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
          className="navbar-toggler ms-n2"
          data-bs-target="#sidebarCollapse"
          data-bs-toggle="collapse"
          type="button"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
          <img
            alt=""
            src={logo}
            style={{width:"250px",height:"60px"}}
          />
        </a>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav">
           
            {labels.map(label=>{
              return (
                <li key={label.id} >
                  <Link to={label.link} className="nav-link" style={{fontSize:"17px"}}>
                   <span style={{marginRight:"10px"}}>{label.icon}</span> {label.label}
                  </Link>
                </li>
              )
            })}
          </ul>

          <hr className="navbar-divider my-5 opacity-20" />
        </div>
      </div>
    </nav>
  );
}

export default Sidebar;
