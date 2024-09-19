import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
                    style={{
                      padding: "20px",
                      minWidth: "320px",
                      maxWidth: "300px",
                      textAlign: "left",
                      paddingRight: "20px",
                    }}
                  >
                    <div
                      className="dropdown-header d-flex align-items-center"
                      style={{ marginBottom: "15px" }}
                    >
                      <img
                        alt="User Avatar"
                        className="avatar avatar-rounded-circle me-3"
                        src="https://images.unsplash.com/photo-1548142813-c348350df52b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=3&w=256&h=256&q=80"
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <h5
                          className="dropdown-header-name"
                          style={{ margin: 0 }}
                        >
                        {JSON.parse(localStorage.getItem('user')).userRole===1?"Admin":"SalesExecutive"}
                        </h5>
                        <p className="text-muted" style={{ margin: 0 }}>
                        {JSON.parse(localStorage.getItem('user')).userRole===1?"Managing the whole portal":"Managing Leads"}
                        </p>
                      </div>
                    </div>

                    <hr className="dropdown-divider" />

                    <Link
                      to="/admin/profile"
                      className="dropdown-item"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="bi bi-person-circle"
                        style={{ marginRight: "10px" }}
                      />
                      Profile
                    </Link>

                    <a
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                      }}
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
