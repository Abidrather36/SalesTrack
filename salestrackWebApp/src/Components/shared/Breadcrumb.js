import React, { useEffect, useState } from "react";
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
  const params = new URLSearchParams(window.location.search);
  const hideId = params.get('hideId');
  const [hideIdCrumb, setHideIdCrumb]=  useState(false);
  useEffect(()=>{
    console.log('BRead crumb hide id',hideId)
    if(!['',null,undefined].includes(hideId)){
      setHideIdCrumb(true);
    }
  },[window.location])
  
  
  
  
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
        const isSecondLast = index === pathParts.length - 3; // Check if this is the last part
        const routePath = `/${pathParts.slice(0, index + 2).join("/")}`; // Construct the route path
        console.log(isLast,'IsLast')
        console.log(isSecondLast,'IsSecondLast')
        console.log(routePath,'routepath')
        console.log(part.charAt(0).toUpperCase() + part.slice(1),'label')
        return isLast ? ( [null,undefined,false].includes(hideId) ?
          // Last breadcrumb is active and not clickable
          <MDBBreadcrumbItem key={index} active>
            {part.charAt(0).toUpperCase() + part.slice(1)} 
          </MDBBreadcrumbItem> : <></>
        ) : (
          // Other breadcrumbs are clickable
          <MDBBreadcrumbItem key={index}>
            {([null,undefined,false].includes(hideId) || !isSecondLast)?
              <Link to={routePath}>
                {part.charAt(0).toUpperCase() + part.slice(1)}
              </Link>
              :<>
                {part.charAt(0).toUpperCase() + part.slice(1)}
                </>
            }
          </MDBBreadcrumbItem>
        );
      })}
    </MDBBreadcrumb>
  );
}

export default BreadcrumbComponent;


