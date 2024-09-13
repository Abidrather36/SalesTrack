// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = ({ sidebarLabels = [] }) => {
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
//             src="https://i.ibb.co/hVx7Ch6/Whats-App-Image-2024-09-10-at-15-34-22-df8919c0.jpg"
//           />
//         </a>

//         <div className="collapse navbar-collapse" id="sidebarCollapse">
//           <ul className="navbar-nav">
//             {sidebarLabels.map((label) => (
//               <li key={label.id} className="nav-item">
//                 <Link to={label.link} className="nav-link">
//                   {label.label}
//                 </Link>
//               </li>
//             ))}
//           </ul>

//           <hr className="navbar-divider my-5 opacity-20" />

//           <div className="mt-auto" />
//           <ul className="navbar-nav"></ul>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ sidebarLabels = [] }) => {
  return (
    <nav className="navbar navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 navbar-light bg-white border-bottom border-bottom-lg-0 border-end-lg">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="sidebarCollapse">
          <ul className="navbar-nav">
            {sidebarLabels.map((label, index) => (
              <li key={index} className="nav-item">
                <Link to={label.link} className="nav-link">
                  {label.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
