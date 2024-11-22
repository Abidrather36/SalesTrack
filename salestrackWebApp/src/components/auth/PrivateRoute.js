import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import myToaster from '../../utils/toaster';

const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user ? user : null; 
};

const PrivateRoute = ({ children }) => {
  const user = getUser();

  if (!user || !user.token) {
    myToaster.showErrorToast("You are not logged in. Please login to access this page.");
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
