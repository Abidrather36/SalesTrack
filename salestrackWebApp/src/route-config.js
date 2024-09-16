import HomePage from "./Components/public/Home"
import About from "./Components/public/About";
import Contact from "./Components/public/Contact";
import Login from "./Components/public/Login"
import RegisterEnquiry from "./Components/public/RegisterEnquiry"
import AddUserForm from "./Components/admin/AddUser";
import AdminDashboard from "./Components/admin/adminDashboard"
import EnquiryList from "./Components/admin/EnquiryList"
import ProfilePage from "./Components/shared/ProfileCard";
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
    { path: "/admin/profile", element: <ProfilePage /> },

    
  ],
};
