
import React from 'react';
import { FaUser, FaHome } from "react-icons/fa";
import { MDBBreadcrumb, MDBBreadcrumbItem } from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function BreadcrumbComponent({ labels = {} }) {
  const { module, currentRoute } = labels;

  // Define public routes where the Home link should appear
  const publicRoutes = ["/home", "/contact", "/about"];
  const currentPath = window.location.pathname;

  return (
    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
      {/* Render Home link only for public pages */}
      {publicRoutes.includes(currentPath) && (
        <MDBBreadcrumbItem>
          <Link to="/home"><FaHome /> Home</Link>
        </MDBBreadcrumbItem>
      )}
      <MDBBreadcrumbItem>
        <Link to={`/${module}`}><FaUser /> {module}</Link>
      </MDBBreadcrumbItem>
      <MDBBreadcrumbItem active>{currentRoute}</MDBBreadcrumbItem>
    </MDBBreadcrumb>
  );
}

export default BreadcrumbComponent;
