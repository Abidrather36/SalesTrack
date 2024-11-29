
// import React from 'react';
// import { FaUser, FaHome } from "react-icons/fa";
// import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
// import { Link } from 'react-router-dom';

// function BreadcrumbComponent({ labels = {} }) {
//   const { module, currentRoute } = labels;

//   // Define public routes where the Home link should appear
//   const publicRoutes = ["/home", "/contact", "/about"];
//   const currentPath = window.location.pathname;

//   return (
//     <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
//       {/* Render Home link only for public pages */}
//       {publicRoutes.includes(currentPath) && (
//         <MDBBreadcrumbItem>
//           <Link to="/home"><FaHome /> Home</Link>
//         </MDBBreadcrumbItem>
//       )}
//       <MDBBreadcrumbItem>
//         <Link to={`/${module}`}><FaUser /> {module}</Link>
//       </MDBBreadcrumbItem>
//       <MDBBreadcrumbItem active>{currentRoute}</MDBBreadcrumbItem>
//     </MDBBreadcrumb>
//   );
// }

// export default BreadcrumbComponent;

// import React from 'react';
// import { FaHome } from "react-icons/fa";
// import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
// import { Link } from 'react-router-dom';

// function BreadcrumbComponent() {
//   // Split the current path into parts
//   const currentPath = window.location.pathname;
//   const pathParts = currentPath.split('/').filter(part => part); // Remove empty strings

//   return (
//     <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
//       {/* Always include the Home breadcrumb */}
//       <MDBBreadcrumbItem>
//         <Link to="/home"><FaHome /> Home</Link>
//       </MDBBreadcrumbItem>

//       {/* Dynamically generate breadcrumbs for all parts */}
//       {pathParts.map((part, index) => {
//         const isLast = index === pathParts.length - 1; // Check if this is the last part
//         const routePath = `/${pathParts.slice(0, index + 1).join('/')}`; // Construct the route path

//         return isLast ? (
//           // Last breadcrumb is active and not clickable
//           <MDBBreadcrumbItem key={index} active>
//             {part.charAt(0).toUpperCase() + part.slice(1)} {/* Capitalize the part */}
//           </MDBBreadcrumbItem>
//         ) : (
//           // Other breadcrumbs are clickable
//           <MDBBreadcrumbItem key={index}>
//             <Link to={routePath}>
//               {part.charAt(0).toUpperCase() + part.slice(1)}
//             </Link>
//           </MDBBreadcrumbItem>
//         );
//       })}
//     </MDBBreadcrumb>
//   );
// }

// export default BreadcrumbComponent;

//Original //
import React from "react";
import { FaHome } from "react-icons/fa";
import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

function BreadcrumbComponent() {
  // Get the current path and split it into parts
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split("/").filter((part) => part); // Remove empty strings

  // Dynamically set the Home breadcrumb label and route
  const homeLabel = pathParts[0]?.charAt(0).toUpperCase() + pathParts[0]?.slice(1) || "Home";
  const homeRoute = `/${pathParts[0] || ""}`; // Construct the route to the first part or fallback to "/home"

  return (
    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
      {/* Dynamically generate the Home breadcrumb */}
      <MDBBreadcrumbItem>
        <Link to={homeRoute}>
          <FaHome /> {homeLabel}
        </Link>
      </MDBBreadcrumbItem>

      {/* Dynamically generate breadcrumbs for all other parts */}
      {pathParts.slice(1).map((part, index) => {
        const isLast = index === pathParts.length - 2; // Check if this is the last part
        const routePath = `/${pathParts.slice(0, index + 2).join("/")}`; // Construct the route path

        return isLast ? (
          // Last breadcrumb is active and not clickable
          <MDBBreadcrumbItem key={index} active>
            {part.charAt(0).toUpperCase() + part.slice(1)}
          </MDBBreadcrumbItem>
        ) : (
          // Other breadcrumbs are clickable
          <MDBBreadcrumbItem key={index}>
            <Link to={routePath}>
              {part.charAt(0).toUpperCase() + part.slice(1)}
            </Link>
          </MDBBreadcrumbItem>
        );
      })}
    </MDBBreadcrumb>
  );
}

export default BreadcrumbComponent;

// import React from "react";
// import { FaHome } from "react-icons/fa";
// import { MDBBreadcrumb, MDBBreadcrumbItem } from "mdb-react-ui-kit";
// import { Link } from "react-router-dom";

// function BreadcrumbComponent({ labels }) {
//   // Get the current path and split it into parts
//   const currentPath = window.location.pathname;
//   const pathParts = currentPath.split("/").filter((part) => part); // Remove empty strings

//   // Dynamically set the Home breadcrumb label and route
//   const homeLabel = labels?.module?.charAt(0).toUpperCase() + labels?.module?.slice(1) || "Home";
//   const homeRoute = `/${labels?.module || ""}`; // Construct the route to the module or fallback to "/home"

//   return (
//     <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
//       {/* Dynamically generate the Home breadcrumb */}
//       <MDBBreadcrumbItem>
//         <Link to={homeRoute}>
//           <FaHome /> {homeLabel}
//         </Link>
//       </MDBBreadcrumbItem>

//       {/* Dynamically generate the "LeadList" breadcrumb */}
//       {labels?.currentRoute && (
//         <MDBBreadcrumbItem>
//           <Link to={`/${labels?.module}/${labels?.currentRoute}`}>
//             {labels?.currentRoute.charAt(0).toUpperCase() + labels?.currentRoute.slice(1)}
//           </Link>
//         </MDBBreadcrumbItem>
//       )}

//       {/* Optionally handle a case where a more complex path is needed */}
//       {pathParts.slice(2).map((part, index) => {
//         const isLast = index === pathParts.length - 3; // Check if this is the last part
//         const routePath = `/${pathParts.slice(0, index + 3).join("/")}`; // Construct the route path

//         return isLast ? (
//           // Last breadcrumb is active and not clickable
//           <MDBBreadcrumbItem key={index} active>
//             {part.charAt(0).toUpperCase() + part.slice(1)}
//           </MDBBreadcrumbItem>
//         ) : (
//           // Other breadcrumbs are clickable
//           <MDBBreadcrumbItem key={index}>
//             <Link to={routePath}>
//               {part.charAt(0).toUpperCase() + part.slice(1)}
//             </Link>
//           </MDBBreadcrumbItem>
//         );
//       })}
//     </MDBBreadcrumb>
//   );
// }

// export default BreadcrumbComponent;




