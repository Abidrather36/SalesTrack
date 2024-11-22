import React from 'react';
import { Breadcrumbs as MUIBreadcrumbs, Link, Typography } from '@mui/material';  // Updated MUI import
import { useNavigate } from 'react-router-dom';  // Using useNavigate for programmatic navigation

const Breadcrumbs = ({ path }) => {  // Accept `path` as a prop
  const navigate = useNavigate();  // Hook for navigating programmatically

  return (
    <MUIBreadcrumbs aria-label="breadcrumb">
      {path.map((breadcrumb, index) => {
        const isLast = index === path.length - 1;  // Check if this is the last breadcrumb
        return isLast ? (
          <Typography key={breadcrumb.name}>{breadcrumb.name}</Typography>  // Last breadcrumb is text only
        ) : (
          <Link
            key={breadcrumb.name}
            onClick={() => navigate(breadcrumb.route)}  // Use navigate to go to the route
          >
            {breadcrumb.name}
          </Link>
        );
      })}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
