import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <header className="bg-surface-primary border-bottom pt-6">
      <div className="container-fluid">
        <div className="mb-npx">
          <div className="row align-items-center">
            <div className="col-sm-6 col-12 mb-4 mb-sm-0">
              <h1 className="h2 mb-0 ls-tight"></h1>
            </div>
            <div>
              <div
                className="navbar-user"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  paddingBottom: "10px",
                }}
              >
                <div className="dropdown">
                  <a
                    aria-expanded="false"
                    aria-haspopup="true"
                    data-bs-toggle="dropdown"
                    href="#"
                    id="sidebarAvatar"
                    role="button"
                  >
                    <div className="avatar-parent-child">
                      <img
                        alt="Image Placeholder"
                        className="avatar avatar-rounded-circle"
                        src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                      />
                      <span className="avatar-child avatar-badge bg-success" />
                    </div>
                  </a>
                  <div
                    aria-labelledby="sidebarAvatar"
                    className="dropdown-menu dropdown-menu-end"
                  >
                    <a className="nav-link">
                      <i
                        className="bi bi-person-circle"
                        style={{ marginRight: "5px",cursor: "pointer" }} 
                      />{" "}
                      Profile
                    </a>

                    <a
                      className="nav-link"
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-left"
                      style={{ marginRight: "10px",cursor:"pointer" }}

                       />
                      Logout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
