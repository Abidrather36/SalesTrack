import React from 'react';
import {
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from 'mdb-react-ui-kit';
import { Link } from 'react-router-dom';

function BreadcrumbComponent({ labels = {} }) {
  const { module , currentRoute } = labels;

  return (
    <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
      <MDBBreadcrumbItem>
        <Link to="/home">Home</Link>
      </MDBBreadcrumbItem>
      <MDBBreadcrumbItem>
        <Link to={`/${module}`}>{module}</Link>
      </MDBBreadcrumbItem>
      <MDBBreadcrumbItem active>{currentRoute}</MDBBreadcrumbItem>
    </MDBBreadcrumb>
  );
}

export default BreadcrumbComponent;
