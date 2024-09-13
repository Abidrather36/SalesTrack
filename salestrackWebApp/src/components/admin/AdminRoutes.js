import { Route, Routes } from "react-router-dom";

import { Navigate } from "react-router-dom";
import AdminDashboard from "./adminDashboard";
import EnquiryList from "./EnquiryList";

function AdminRoutes() {
  return (
    <Routes>
        <Route path="/" element={<Navigate to="dashboard" />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route  path="enquirylist" element={<EnquiryList/>} />

    </Routes>
  );
}

export default AdminRoutes;
