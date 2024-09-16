import React from "react";
import { Link } from "react-router-dom";

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
            src="https://i.ibb.co/hVx7Ch6/Whats-App-Image-2024-09-10-at-15-34-22-df8919c0.jpg"
          />
        </a>
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav">
           
            {labels.map(label=>{
              return (
                <li key={label.id}>
                  <Link to={label.link} className="nav-link">
                   {label.icon} {label.label}
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
