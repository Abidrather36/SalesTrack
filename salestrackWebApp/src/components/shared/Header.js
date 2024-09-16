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
                        alt="User Avatar"
                        className="avatar avatar-rounded-circle"
                        src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                      />
                      <span className="avatar-child avatar-badge bg-success" />
                    </div>
                  </a>
                  <div
                    aria-labelledby="sidebarAvatar"
                    className="dropdown-menu dropdown-menu-end"
                  >
                    <a
                      className="nav-link"
                      style={{ cursor: "pointer" }} 
                    >
                      <i
                        className="bi bi-person-circle"
                        style={{ marginRight: "5px" }}
                      />{" "}
                      Profile
                    </a>

                    <a
                      className="nav-link"
                      onClick={handleLogout}
                      style={{ cursor: "pointer" }}
                    >
                      <i
                        className="bi bi-box-arrow-left"
                        style={{ marginRight: "10px" }}
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
