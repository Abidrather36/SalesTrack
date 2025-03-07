import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../utils/WhatsApp Image 2024-11-07 at 10.47.28_009bb6b7.jpg";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import webLogo from "../../utils/i need an Image logo for my website SalesteRn (1).jpg"

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const userRole = user.userRole || "";
  let profileRoute;

  if (userRole === 1) {
    profileRoute = "/admin/profile";
  } else if (userRole === 2) {
    profileRoute = "/companyAdmin/profile";
  } else if (userRole === 3) {
    profileRoute = "/salesExecutive/profile";
  } else {
    profileRoute = "/salesManager/profile";
  }

  const handleLogout = (e) => {
    e.stopPropagation();
    confirmDialog({
      message: "Are you sure you want to log out from your account?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      acceptLabel: "Yes, log out!",
      rejectLabel: "Cancel",
      acceptClassName: "p-button-secondary",
      rejectClassName: "p-button-danger",
      className: "custom-dialog",
      accept: () => {
        localStorage.clear();
        navigate("/login");
        window.location.reload();
      },
    });
  };
  const handleChangePasswordRoute = () => {
    if (userRole === 1) {
      return "/admin/changePassword";
    } else if (userRole === 2) {
      return "/companyAdmin/changePassword";
    } else if (userRole === 3) {
      return "/salesExecutive/changePassword";
    } else {
      return "/salesManager/changePassword"; 
    }
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
                    <div
                      className="avatar-parent-child"
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        cursor: "pointer",
                        transition: "transform 0.2s ease",
                      }}
                    >
                      <img
                        alt="User Avatar"
                        src={webLogo}
                        style={{
                          width: "50px",
                          height: "50px",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "1rem",
                          color: "#03045e",
                          fontWeight: "600",
                        }}
                      >
                        {user.fullName}
                      </span>
                    </div>
                  </a>

                  <div
                    aria-labelledby="sidebarAvatar"
                    className="dropdown-menu dropdown-menu-end"
                    style={{
                      padding: "15px",
                      minWidth: "280px",
                      textAlign: "left",
                      backgroundColor: "#f4f9f7",
                      borderRadius: "8px",
                      boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div
                      className="dropdown-header d-flex align-items-center"
                      style={{ marginBottom: "10px" }}
                    >
                      <img
                        alt="User Avatar"
                        className="avatar avatar-rounded-circle me-3"
                        src={logoImg}
                        style={{
                          width: "40px",
                          height: "40px",
                          borderRadius: "50%",
                          border: "2px solid #0077b6",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <h5
                          className="dropdown-header-name"
                          style={{
                            margin: 0,
                            fontSize: "1rem",
                            color: "#03045e",
                            fontWeight: "600",
                          }}
                        >
                          {userRole === 1
                            ? "Admin"
                            : userRole === 2
                            ? `${user.fullName}`
                            : userRole === 3
                            ? "Executive/Developer"
                            : "Manager"}
                        </h5>
                        <p
                          className="text-muted"
                          style={{
                            margin: 0,
                            fontSize: "0.85rem",
                            color: "#555",
                          }}
                        >
                          {userRole === 1
                            ? "Managing the whole portal"
                            : userRole === 2
                            ? "Managing company"
                            : userRole === 3
                            ? ""
                            : ""}
                        </p>
                      </div>
                    </div>
                    <hr className="dropdown-divider" />
                    <Link
                      to={profileRoute}
                      className="dropdown-item"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 15px",
                        borderRadius: "6px",
                        transition: "background-color 0.3s, transform 0.2s",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#03045e",
                        textDecoration: "none",
                      }}
                    >
                      <i
                        className="bi bi-person-circle"
                        style={{
                          marginRight: "10px",
                          color: "#0077b6",
                          fontSize: "1.1rem",
                        }}
                      />
                      Profile
                    </Link>
                    {/* New Link for Change Password */}
                    <Link
                      to={handleChangePasswordRoute()}
                      className="dropdown-item"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 15px",
                        borderRadius: "6px",
                        transition: "background-color 0.3s, transform 0.2s",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#03045e",
                        textDecoration: "none",
                      }}
                    >
                      <i
                        className="bi bi-lock"
                        style={{
                          marginRight: "10px",
                          color: "#0077b6",
                          fontSize: "1.1rem",
                        }}
                      />
                      Change Password
                    </Link>
                    <Link
                      onClick={handleLogout}
                      className="dropdown-item"
                      style={{
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        padding: "10px 15px",
                        borderRadius: "6px",
                        transition: "background-color 0.3s, transform 0.2s",
                        fontFamily: "'Poppins', sans-serif",
                        fontSize: "0.9rem",
                        fontWeight: "500",
                        color: "#d33",
                        textDecoration: "none",
                      }}
                    >
                      <i
                        className="bi bi-box-arrow-left"
                        style={{
                          marginRight: "10px",
                          fontSize: "1.1rem",
                        }}
                      />
                      Logout
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmDialog />
    </header>
  );
};

export default Header;


// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logoImg from "../../utils/WhatsApp Image 2024-11-07 at 10.47.28_009bb6b7.jpg";
// import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";

// const Header = () => {
//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));
//   const userRole = user.userRole || "";
//   const [isAnimating, setIsAnimating] = useState(false);

//   let profileRoute;

//   if (userRole === 1) {
//     profileRoute = "/admin/profile";
//   } else if (userRole === 2) {
//     profileRoute = "/companyAdmin/profile";
//   } else if (userRole === 3) {
//     profileRoute = "/salesExecutive/profile";
//   } else {
//     profileRoute = "/salesManager/profile";
//   }

//   const handleLogout = () => {
//     confirmDialog({
//       message: "Are you sure you want to log out from your account?",
//       header: "Confirmation",
//       icon: "pi pi-exclamation-triangle",
//       acceptLabel: "Yes, log out!",
//       rejectLabel: "Cancel",
//       acceptClassName: "p-button-secondary",
//       rejectClassName: "p-button-danger",
//       className: "custom-dialog",
//       accept: () => {
//         localStorage.clear();
//         navigate("/login");
//         window.location.reload();
//       },
//     });
//   };

//   const handleProfileClick = () => {
//     setIsAnimating(true);
//     setTimeout(() => setIsAnimating(false), 1000); // Reset animation after 1s
//   };

//   return (
//       <>
//         <style>
//           {`
//             .dropdown-menu {
//               padding: 20px;
//               min-width: 320px;
//               text-align: left;
//               background-color: #f4f9f7;
//               border-radius: 10px;
//               box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
//               opacity: 0;
//               transform: translateY(-10px);
//               transition: all 0.3s ease-in-out;
//             }

//             .dropdown:hover .dropdown-menu {
//               opacity: 1;
//               transform: translateY(0);
//             }

//             .dropdown-item {
//               cursor: pointer;
//               display: flex;
//               align-items: center;
//               padding: 10px 15px;
//               border-radius: 5px;
//               transition: background-color 0.3s, transform 0.3s;
//             }

//             .dropdown-item:hover {
//               background-color: #90e0ef;
//               transform: scale(1.05);
//             }

//             .avatar-parent-child {
//               display: flex;
//               align-items: center;
//               gap: 15px;
//               cursor: pointer;
//               transition: transform 0.2s ease;
//             }

//             .avatar-parent-child:hover {
//               transform: scale(1.1);
//             }

//             .dropdown-header-name {
//               margin: 0;
//               font-size: 1.2rem;
//               color: #03045e;
//               font-weight: bold;
//             }
//           `}
//         </style>
//     <header className="bg-surface-primary border-bottom pt-6">
//       <div className="container-fluid">
//         <div className="mb-npx">
//           <div className="row align-items-center">
//             <div>
//               <div
//                 className="navbar-user"
//                 style={{
//                   display: "flex",
//                   justifyContent: "flex-end",
//                   paddingBottom: "10px",
//                 }}
//               >
//                 <div className="dropdown">
//                   <a
//                     aria-expanded="false"
//                     aria-haspopup="true"
//                     data-bs-toggle="dropdown"
//                     id="sidebarAvatar"
//                     role="button"
//                   >
//                     <div
//                       className="avatar-parent-child"
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         gap: "15px",
//                         cursor: "pointer",
//                         transition: "transform 0.2s ease",
//                       }}
//                     >
//                       <img
//                         alt="User Avatar"
//                         className="avatar avatar-rounded-circle"
//                         src={logoImg}
//                         style={{
//                           width: "60px",
//                           height: "60px",
//                           borderRadius: "50%",
//                           border: "3px solid #00b4d8",
//                           boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.15)",
//                         }}
//                       />
//                       <span
//                         style={{
//                           fontSize: "1.25rem",
//                           color: "#03045e",
//                           fontWeight: "bold",
//                           textShadow: "1px 1px 2px rgba(0, 0, 0, 0.1)",
//                         }}
//                       >
//                         {user.fullName}
//                       </span>
//                     </div>
//                   </a>

//                   <div
//                     aria-labelledby="sidebarAvatar"
//                     className={`dropdown-menu dropdown-menu-end ${
//                       isAnimating ? "profile-animate" : ""
//                     }`}
//                     style={{
//                       padding: "20px",
//                       minWidth: "320px",
//                       textAlign: "left",
//                       backgroundColor: "#f4f9f7",
//                       borderRadius: "10px",
//                       boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
//                     }}
//                   >
//                     <div
//                       className="dropdown-header d-flex align-items-center"
//                       style={{ marginBottom: "15px" }}
//                     >
//                       <img
//                         alt="User Avatar"
//                         className="avatar avatar-rounded-circle me-3"
//                         src={logoImg}
//                         style={{
//                           width: "50px",
//                           height: "50px",
//                           borderRadius: "50%",
//                           border: "2px solid #0077b6",
//                           marginRight: "15px",
//                         }}
//                       />
//                       <div>
//                         <h5
//                           className="dropdown-header-name"
//                           style={{
//                             margin: 0,
//                             fontSize: "1.2rem",
//                             color: "#03045e",
//                             fontWeight: "bold",
//                           }}
//                         >
//                           {userRole === 1
//                             ? "Admin"
//                             : userRole === 2
//                             ? `${user.fullName}`
//                             : userRole === 3
//                             ? "Sales Executive"
//                             : "Sales Manager"}
//                         </h5>
//                         <p
//                           className="text-muted"
//                           style={{
//                             margin: 0,
//                             fontSize: "0.9rem",
//                             color: "#555",
//                           }}
//                         >
//                           {userRole === 1
//                             ? "Managing the whole portal"
//                             : userRole === 2
//                             ? "Managing company"
//                             : userRole === 3
//                             ? "Managing Leads"
//                             : "Managing Sales"}
//                         </p>
//                       </div>
//                     </div>
//                     <hr className="dropdown-divider" />
//                     <Link
//                       to={profileRoute}
//                       className="dropdown-item"
//                       style={{
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         padding: "10px 15px",
//                         borderRadius: "5px",
//                         transition: "background-color 0.3s",
//                       }}
//                       onClick={handleProfileClick}
//                     >
//                       <i
//                         className="bi bi-person-circle"
//                         style={{ marginRight: "10px", color: "#0077b6" }}
//                       />
//                       Profile
//                     </Link>
//                     <Link
//                       onClick={handleLogout}
//                       className="dropdown-item"
//                       style={{
//                         cursor: "pointer",
//                         display: "flex",
//                         alignItems: "center",
//                         padding: "10px 15px",
//                         borderRadius: "5px",
//                         transition: "background-color 0.3s",
//                         textDecoration: "none",
//                       }}
//                       onMouseEnter={(e) =>
//                         (e.target.style.backgroundColor = "#ffb3c1")
//                       }
//                       onMouseLeave={(e) =>
//                         (e.target.style.backgroundColor = "transparent")
//                       }
//                     >
//                       <i
//                         className="bi bi-box-arrow-left"
//                         style={{ marginRight: "10px", color: "#d33" }}
//                       />
//                       Logout
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <ConfirmDialog />
//     </header>
//     </>
//   );
// };

// export default Header;
