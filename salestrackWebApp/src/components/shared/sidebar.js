// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg"

// function Sidebar({ labels = [] }) {
//   return (
//     <nav
//       className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
//       id="navbarVertical"
//     >
//       <div className="container-fluid">
//         <button
//           aria-controls="sidebarCollapse"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//           className="navbar-toggler ms-n2"
//           data-bs-target="#sidebarCollapse"
//           data-bs-toggle="collapse"
//           type="button"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>
//         <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
//           <img
//             alt=""
//             src={logo}
//             style={{width:"250px",height:"60px"}}
//           />
//         </a>
//         <div className="collapse navbar-collapse" id="sidebarCollapse">
//           <ul className="navbar-nav">
           
//             {labels.map(label=>{
//               return (
//                 <li key={label.id} >
//                   <Link to={label.link} className="nav-link" style={{fontSize:"17px"}}>
//                    <span style={{marginRight:"10px"}}>{label.icon}</span> {label.label}
//                   </Link>
//                 </li>
//               )
//             })}
//           </ul>

//           <hr className="navbar-divider my-5 opacity-20" />
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Sidebar;


// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

// function Sidebar({ labels = [] }) {
//   return (
//     <>
//       <style>
//         {`
//           .navbar {
//             transition: all 0.3s ease-in-out;
//           }

//           .nav-link {
//             font-size: 17px;
//             font-weight: 500;
//             color: #333;
//             display: flex;
//             align-items: center;
//             text-decoration: none;
//             transition: all 0.3s ease-in-out;
//             padding: 10px 15px;
//             border-radius: 8px;
//           }

//           .nav-link:hover {
//             background-color: #f8f9fa;
//             color: #007bff;
//             transform: scale(1.05);
//             box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
//           }

//           .icon-wrapper {
//             margin-right: 10px;
//             transition: transform 0.3s ease-in-out;
//           }

//           .nav-link:hover .icon-wrapper {
//             transform: rotate(20deg);
//           }

//           .navbar-divider {
//             border-color: rgba(0, 0, 0, 0.1);
//           }

//           .nav-link.active {
//             background-color: #007bff;
//             color: #fff;
//             box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
//           }
//         `}
//       </style>
//       <nav
//         className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
//         id="navbarVertical"
//       >
//         <div className="container-fluid">
//           <button
//             aria-controls="sidebarCollapse"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//             className="navbar-toggler ms-n2"
//             data-bs-target="#sidebarCollapse"
//             data-bs-toggle="collapse"
//             type="button"
//           >
//             <span className="navbar-toggler-icon" />
//           </button>
//           <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
//             <img alt="" src={logo} style={{ width: "250px", height: "60px" }} />
//           </a>
//           <div className="collapse navbar-collapse" id="sidebarCollapse">
//             <ul className="navbar-nav">
//               {labels.map((label) => {
//                 return (
//                   <li key={label.id}>
//                     <Link to={label.link} className="nav-link custom-link" style={{fontSize:"17px"}}>
//                       <span className="icon-wrapper">{label.icon}</span>
//                       {label.label}
//                     </Link>
//                   </li>
//                 );
//               })}
//             </ul>
//             <hr className="navbar-divider my-5 opacity-20" />
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// }

// export default Sidebar;


//original//

// import React from "react";
// import { Link } from "react-router-dom";
// import { Dropdown } from "react-bootstrap"; // Using react-bootstrap Dropdown component
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
// import { FaTachometerAlt, FaEnvelope, FaPlus, FaListAlt, FaUsers } from "react-icons/fa";
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
// import { Source } from "@mui/icons-material";

// function Sidebar({ labels = [] }) {
//   return (
//     <nav
//       className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg"
//       id="navbarVertical"
//     >
//       <div className="container-fluid">
//         <button
//           aria-controls="sidebarCollapse"
//           aria-expanded="false"
//           aria-label="Toggle navigation"
//           className="navbar-toggler ms-n2"
//           data-bs-target="#sidebarCollapse"
//           data-bs-toggle="collapse"
//           type="button"
//         >
//           <span className="navbar-toggler-icon" />
//         </button>
//         <a className="navbar-brand py-lg-2 mb-lg-5 px-lg-6 me-0" href="#">
//           <img
//             alt=""
//             src={logo}
//             style={{ width: "250px", height: "60px" }}
//           />
//         </a>
//         <div className="collapse navbar-collapse" id="sidebarCollapse">
//           <ul className="navbar-nav">
//             {labels.map((label) => {
//               if (label.dropdown) {
//                 // Dropdown menu
//                 return (
//                   <li key={label.id} className="nav-item">
//                     <Dropdown>
//                       <Dropdown.Toggle variant="link" id={`dropdown-${label.id}`} className="nav-link">
//                         {label.icon} {label.label}
//                       </Dropdown.Toggle>
//                       <Dropdown.Menu>
//                         {label.items.map((item) => (
//                           <Dropdown.Item key={item.id} as={Link} to={item.link}>
//                             {item.icon} {item.label}
//                           </Dropdown.Item>
//                         ))}
//                       </Dropdown.Menu>
//                     </Dropdown>
//                   </li>
//                 );
//               } else {
//                 // Regular link
//                 return (
//                   <li key={label.id} className="nav-item">
//                     <Link to={label.link} className="nav-link" style={{ fontSize: "17px" }}>
//                       <span style={{ marginRight: "10px" }}>{label.icon}</span> {label.label}
//                     </Link>
//                   </li>
//                 );
//               }
//             })}
//           </ul>

//           <hr className="navbar-divider my-5 opacity-20" />
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Sidebar;


//Material Ui///


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemIcon,
//   ListItemText,
//   Collapse,
// } from "@mui/material";
// import { ExpandLess, ExpandMore } from "@mui/icons-material";

// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

// function Sidebar({ labels = [] }) {
//   const [openMenus, setOpenMenus] = useState({});

//   const handleToggle = (id) => {
//     setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
//   };

//   return (
//     <Drawer
//       variant="permanent"
//       anchor="left"
//       sx={{
//         width: 250,
//         "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box" },
//       }}
//     >
//       <div style={{ textAlign: "center", padding: "16px 0" }}>
//         <img
//           src={logo}
//           alt="Logo"
//           style={{ width: "200px", height: "auto" }}
//         />
//       </div>
//       <List>
//         {labels.map((label) => (
//           <React.Fragment key={label.id}>
//             {label.dropdown ? (
//               <>
//                 <ListItem button onClick={() => handleToggle(label.id)}>
//                   <ListItemIcon>{label.icon}</ListItemIcon>
//                   <ListItemText primary={label.label} />
//                   {openMenus[label.id] ? <ExpandLess /> : <ExpandMore />}
//                 </ListItem>
//                 <Collapse in={openMenus[label.id]} timeout="auto" unmountOnExit>
//                   <List component="div" disablePadding>
//                     {label.items.map((item) => (
//                       <ListItem
//                         button
//                         key={item.id}
//                         component={Link}
//                         to={item.link}
//                         sx={{ pl: 4 }}
//                       >
//                         <ListItemIcon>{item.icon}</ListItemIcon>
//                         <ListItemText primary={item.label} />
//                       </ListItem>
//                     ))}
//                   </List>
//                 </Collapse>
//               </>
//             ) : (
//               <ListItem button component={Link} to={label.link}>
//                 <ListItemIcon>{label.icon}</ListItemIcon>
//                 <ListItemText primary={label.label} />
//               </ListItem>
//             )}
//           </React.Fragment>
//         ))}
//       </List>
//     </Drawer>
//   );
// }

// export default Sidebar;


import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";

import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

function Sidebar({ labels = [] }) {
  const [openMenus, setOpenMenus] = useState({});

  const handleToggle = (id) => {
    setOpenMenus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Inline style for ListItemIcon
  const iconStyle = {
    color: "rgba(0, 0, 0, 0.54)",
    flexShrink: 0,
    display: "inline-flex",
    marginRight: "-20px",
  };

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 250,
        "& .MuiDrawer-paper": { width: 250, boxSizing: "border-box" },
      }}
    >
      <div style={{ textAlign: "center", padding: "16px 0" }}>
        <img
          src={logo}
          alt="Logo"
          style={{ width: "200px", height: "auto" }}
        />
      </div>
      <List>
        {labels.map((label) => (
          <React.Fragment key={label.id}>
            {label.dropdown ? (
              <>
                <ListItem button onClick={() => handleToggle(label.id)}>
                  <ListItemIcon style={iconStyle}>{label.icon}</ListItemIcon>
                  <ListItemText primary={label.label} />
                  {openMenus[label.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openMenus[label.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {label.items.map((item) => (
                      <ListItem
                        button
                        key={item.id}
                        component={Link}
                        to={item.link}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon style={iconStyle}>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.label} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            ) : (
              <ListItem button component={Link} to={label.link}>
                <ListItemIcon style={iconStyle}>{label.icon}</ListItemIcon>
                <ListItemText primary={label.label} />
              </ListItem>
            )}
          </React.Fragment>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;





