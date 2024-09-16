import HomePage from "./components/public/Home"
import About from "./components/public/About";
import Contact from "./components/public/Contact";
import RegisterEnquiry from "./components/public/RegisterEnquiry"
import Login from "./components/public/Login"
import AdminDashboard from "./components/admin/adminDashboard";
import EnquiryList from "./components/admin/EnquiryList";
import AddUserForm from "./components/admin/AddUser";
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
