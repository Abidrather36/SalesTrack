// import { Route, Routes } from "react-router-dom";

// import { Navigate } from "react-router-dom";
// import AdminDashboard from "./adminDashboard";
// import EnquiryList from "./EnquiryList";

// function AdminRoutes() {
//   return (
//     <Routes>
//         <Route path="/admin" element={<AdminDashboard  />} />
//         <Route  path="/admin/enquirylist" element={<EnquiryList/>} />
//     </Routes>
//   );
// }

// export default AdminRoutes;


import { Route, Routes } from "react-router-dom";
import DashboardLayout from "../shared/DashboardLayout";
import EnquiryList from "./EnquiryList";
import AdminDashboard from "./adminDashboard";

function AdminRoutes() {
  const labelsList = [
    { label: "Dashboard", link: "/admin/dashboard" },
    { label: "Enquiries", link: "/admin/enquirylist" },
    { label: "AddUser", link: "/admin/adduser" },
  ];

  return (
    <Routes>
      <Route
        path="/admin"
        element={<DashboardLayout labelList={labelsList} />} // Wrap all admin routes in the layout
      >
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="enquirylist" element={<EnquiryList />} />
      </Route>
    </Routes>
  );
}

export default AdminRoutes;
