import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import PublicLayout from "./components/shared/PublicLayout";
import DashboardLayout from "./components/shared/DashboardLayout";
import { routerConfiguration } from "./route-config";
import { PortalAdminsidebarLabels } from "./components/shared/SidebarLabels";
import { CompanyAdminsidebarLabels } from "./components/shared/SidebarLabels";
import { SalesExectivesidebarLabels } from "./components/shared/SidebarLabels";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          {routerConfiguration.PublicRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route
          path="/admin"
          element={<DashboardLayout labelList={PortalAdminsidebarLabels} />}
        >
          {routerConfiguration.AdminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route
          path="/companyAdmin"
          element={<DashboardLayout labelList={CompanyAdminsidebarLabels} />}
        >
          {routerConfiguration.CompanyAdminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
        <Route
          path="/salesExecutive"
          element={<DashboardLayout labelList={SalesExectivesidebarLabels} />}
        >
          {routerConfiguration.SalesExecutiveRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
