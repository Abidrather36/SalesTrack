import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/shared/PublicLayout";
import DashboardLayout from "./components/shared/DashboardLayout";
import { routerConfiguration } from "./route-config";
import { PortalAdminsidebarLabels, SalesManagersidebarLabels, CompanyAdminsidebarLabels, SalesExectivesidebarLabels } from "./components/shared/SidebarLabels";
import PrivateRoute from "./components/auth/PrivateRoute";
import { UserRole } from "./Models/Enums/userRole";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ChangePassword from "./components/shared/ChangePassword"; // Import ChangePassword component

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<PublicLayout />}>
          {routerConfiguration.PublicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Admin routes - protected and role-based */}
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <ProtectedRoute allowedRoles={[UserRole.PortalAdmin]}>
                <DashboardLayout labelList={PortalAdminsidebarLabels} />
                
              </ProtectedRoute>
            </PrivateRoute>
          }
        >
          {routerConfiguration.AdminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="changePassword" element={<ChangePassword />} /> {/* Add ChangePassword route */}
        </Route>

        {/* Company Admin routes - protected and role-based */}
        <Route
          path="/companyAdmin"
          element={
            <PrivateRoute>
              <ProtectedRoute allowedRoles={[UserRole.CompanyAdmin]}>
                <DashboardLayout labelList={CompanyAdminsidebarLabels} />
              </ProtectedRoute>
            </PrivateRoute>
          }
        >
          {routerConfiguration.CompanyAdminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="/companyAdmin/changePassword" element={<ChangePassword />} /> {/* Add ChangePassword route */}
        </Route>

        {/* Sales Executive routes - protected and role-based */}
        <Route
          path="/salesExecutive"
          element={
            <PrivateRoute>
              <ProtectedRoute allowedRoles={[UserRole.SalesExecutive]}>
                <DashboardLayout labelList={SalesExectivesidebarLabels} />
              </ProtectedRoute>
            </PrivateRoute>
          }
        >
          {routerConfiguration.SalesExecutiveRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="/salesExecutive/changePassword" element={<ChangePassword />} /> {/* Add ChangePassword route */}
        </Route>

        {/* Sales Manager routes - protected and role-based */}
        <Route
          path="/salesManager"
          element={
            <PrivateRoute>
              <ProtectedRoute allowedRoles={[UserRole.SalesManager]}>
                <DashboardLayout labelList={SalesManagersidebarLabels} />
              </ProtectedRoute>
            </PrivateRoute>
          }
        >
          {routerConfiguration.SalesManagerRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          <Route path="/salesManager/changePassword" element={<ChangePassword />} /> {/* Add ChangePassword route */}
        </Route>
      </Routes>
    </>
  );
};

export default App;
