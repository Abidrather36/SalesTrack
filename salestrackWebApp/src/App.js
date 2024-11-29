import React from "react";
import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/shared/PublicLayout";
import DashboardLayout from "./components/shared/DashboardLayout";
import { routerConfiguration } from "./route-config";
import { PortalAdminsidebarLabels } from "./components/shared/SidebarLabels";
import { CompanyAdminsidebarLabels } from "./components/shared/SidebarLabels";
import { SalesExectivesidebarLabels } from "./components/shared/SidebarLabels";
import PrivateRoute from "./components/auth/PrivateRoute";
import { UserRole } from "./Models/Enums/userRole";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

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
        </Route>

        {/* Sales Executive routes - protected and role-based */}
        <Route
          path="/salesExecutive"
          element={
            <PrivateRoute>
              <ProtectedRoute allowedRoles={[UserRole.SalesExecutive, UserRole.SalesManager]}>
                <DashboardLayout labelList={SalesExectivesidebarLabels} />
              </ProtectedRoute>
            </PrivateRoute>
          }
        >
          {routerConfiguration.SalesExecutiveRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>

        {/* Catch-all route for undefined paths (404 Not Found) */}
      </Routes>
    </>
  );
};

export default App;





// import React from 'react';
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route
// } from 'react-router-dom';
// import './App.css';

// import { ToastContainer } from 'react-toastify';
// import PublicLayout from './components/shared/PublicLayout';
// import DashboardLayout from './components/shared/DashboardLayout';
// import { routerConfiguration } from './route-config';
// import { PortalAdminsidebarLabels, CompanyAdminsidebarLabels, SalesExectivesidebarLabels } from './components/shared/SidebarLabels';
// import 'react-toastify/dist/ReactToastify.css';
// import ProtectedRoutes from './utils/ProtectedRoutes';
// import { UserRole } from './Models/Enums/userRole';

// const App = () => {
//   return (
//     <>
//       <ToastContainer />
//       <Routes>
//         <Route path="/" element={<PublicLayout />}>
//           {routerConfiguration.PublicRoutes.map((route, index) => (
//             <Route key={index} path={route.path} element={route.element} />
//           ))}
//         </Route>

//         {/* Admin Routes - Protected */}
//         <Route
//           path="/admin"
//           element={
//             <ProtectedRoutes allowedRoles={[UserRole.PortalAdmin]}>
//               <DashboardLayout labelList={PortalAdminsidebarLabels} />
//             </ProtectedRoutes>
//           }
//         >
//           {routerConfiguration.AdminRoutes.map((route, index) => (
//             <Route key={index} path={route.path} element={route.element} />
//           ))}
//         </Route>

//         {/* Company Admin Routes - Protected */}
//         <Route
//           path="/companyAdmin"
//           element={
//             <ProtectedRoutes allowedRoles={[UserRole.CompanyAdmin]}>
//               <DashboardLayout labelList={CompanyAdminsidebarLabels} />
//             </ProtectedRoutes>
//           }
//         >
//           {routerConfiguration.CompanyAdminRoutes.map((route, index) => (
//             <Route key={index} path={route.path} element={route.element} />
//           ))}
//         </Route>

//         {/* Sales Executive Routes - Protected */}
//         <Route
//           path="/salesExecutive"
//           element={
//             <ProtectedRoutes allowedRoles={[UserRole.SalesExecutive]}>
//               <DashboardLayout labelList={SalesExectivesidebarLabels} />
//             </ProtectedRoutes>
//           }
//         >
//           {routerConfiguration.SalesExecutiveRoutes.map((route, index) => (
//             <Route key={index} path={route.path} element={route.element} />
//           ))}
//         </Route>
//       </Routes>
//     </>
//   );
// };

// export default App;
