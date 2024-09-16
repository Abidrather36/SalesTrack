import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

import { ToastContainer } from "react-toastify";
import PublicLayout from "./Components/shared/PublicLayout";
import DashboardLayout from "./Components/shared/DashboardLayout";
import { routerConfiguration } from "./route-config";
import { sidebarLabels } from "./Components/shared/SidebarLabels";

const App = () => {
console.log(sidebarLabels)
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
          element={<DashboardLayout labelList={sidebarLabels} />}
        >
          {routerConfiguration.AdminRoutes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Route>
      </Routes>
    </>
  );
};

export default App;
