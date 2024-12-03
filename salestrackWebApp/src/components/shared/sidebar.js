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


import React from "react";
import { Link } from "react-router-dom";
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

function Sidebar({ labels = [] }) {
  return (
    <>
      <style>
        {`
          .navbar {
            transition: all 0.3s ease-in-out;
          }

          .nav-link {
            font-size: 17px;
            font-weight: 500;
            color: #333;
            display: flex;
            align-items: center;
            text-decoration: none;
            transition: all 0.3s ease-in-out;
            padding: 10px 15px;
            border-radius: 8px;
          }

          .nav-link:hover {
            background-color: #f8f9fa;
            color: #007bff;
            transform: scale(1.05);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .icon-wrapper {
            margin-right: 10px;
            transition: transform 0.3s ease-in-out;
          }

          .nav-link:hover .icon-wrapper {
            transform: rotate(20deg);
          }

          .navbar-divider {
            border-color: rgba(0, 0, 0, 0.1);
          }

          .nav-link.active {
            background-color: #007bff;
            color: #fff;
            box-shadow: 0 4px 12px rgba(0, 123, 255, 0.4);
          }
        `}
      </style>
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
            <img alt="" src={logo} style={{ width: "250px", height: "60px" }} />
          </a>
          <div className="collapse navbar-collapse" id="sidebarCollapse">
            <ul className="navbar-nav">
              {labels.map((label) => {
                return (
                  <li key={label.id}>
                    <Link to={label.link} className="nav-link custom-link" style={{fontSize:"17px"}}>
                      <span className="icon-wrapper">{label.icon}</span>
                      {label.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <hr className="navbar-divider my-5 opacity-20" />
          </div>
        </div>
      </nav>
    </>
  );
}

export default Sidebar;
