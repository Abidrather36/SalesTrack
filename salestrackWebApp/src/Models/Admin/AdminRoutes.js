import { Route, Routes } from "react-router-dom";
import AdminDashboard from "../../Admin/Component/adminDashboard";

import { Navigate } from "react-router-dom";
import EnquiryList from "../../Admin/Component/EnquiryList";

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
