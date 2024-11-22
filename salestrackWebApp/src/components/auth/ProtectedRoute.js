import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import myToaster from '../../utils/toaster';

export const UserRole = {
  PortalAdmin: 1,
  CompanyAdmin: 2,
  SalesExecutive: 3,
  SalesManager: 4,
  Lead: 5,
};

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user : null; 
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const user = getUser();

  if (!user || !user.token) {
    myToaster.showErrorToast("You are not logged in. Please login to access this page.");
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.userRole)) {
    myToaster.showErrorToast("You are not logged in. Please login to access this page.");
    return <Navigate to="/home" />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
