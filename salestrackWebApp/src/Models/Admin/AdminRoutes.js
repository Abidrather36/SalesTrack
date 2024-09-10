import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../Admin/Component/adminDashboard";

import { Navigate } from "react-router-dom";

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
    </Routes>
  );
}

export default AdminRoutes;
