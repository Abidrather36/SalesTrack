import HomePage from "./Components/public/Home";
import About from "./Components/public/About";
import Contact from "./Components/public/Contact";
import RegisterEnquiry from "./Components/public/RegisterEnquiry";
import Login from "./Components/public/Login";
import AdminDashboard from "./Components/admin/AdminDashboard";
import EnquiryList from "./Components/admin/EnquiryList";
import AddUserForm from "./Components/admin/AddUser";
export const routerConfiguration = {
  PublicRoutes: [
    { path: "/", element: <HomePage /> },
    { path: "home", element: <HomePage /> },
    { path: "about", element: <About /> },
    { path: "contact", element: <Contact /> },
    { path: "enquiry", element: <RegisterEnquiry /> },
    { path: "login", element: <Login /> },
  ],
  AdminRoutes: [
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/enquirylist", element: <EnquiryList /> },
    { path: "/admin/add-new-user", element: <AddUserForm /> },
  ],
};
