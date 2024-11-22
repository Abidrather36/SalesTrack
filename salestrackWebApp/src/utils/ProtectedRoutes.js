import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ allowedRoles }) => {
  // Get the current user from context, localStorage, or wherever you store the user's data
  const user = {
    role: 1, // This is just a placeholder. In real use, get this from state/context/localStorage.
  };

  if (!user) {
    // If the user is not logged in
    return <Navigate to="/login" />;
  }

  // If the user is logged in but their role is not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" />; // Redirect to an unauthorized page or some other route
  }

  // If the user is logged in and has a valid role
  return <Outlet />;
};

export default ProtectedRoutes;
