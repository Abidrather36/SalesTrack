
import HomePage from "./components/public/Home"
import About from "./components/public/About"
import Contact from "./components/public/Contact";
import Login from "./components/public/Login"
import AddCompany from "./components/admin/AddCompany";
import AdminDashboard from "./components/admin/adminDashboard"
import EnquiryList from "./components/admin/EnquiryList";
import UserList from "./components/admin/UserList"
// import ProfilePage from "./Components/shared/ProfileCard";
import AddUser from "./components/companyAdmin/AddUser"



export const routerConfiguration = {
  PublicRoutes: [
    { path: "/", element: <HomePage /> },
    { path: "home", element: <HomePage /> },
    { path: "about", element: <About /> },
    { path: "contact", element: <Contact /> },
    // { path: "enquiry", element: <RegisterEnquiry /> },
    { path: "login", element: <Login /> },
  ],
  AdminRoutes: [
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/enquirylist", element: <EnquiryList /> },
    { path: "/admin/add-new-company", element: <AddCompany /> },
    // { path: "/admin/profile", element: <ProfilePage /> },
    { path: "/admin/users", element: <UserList /> },
  ],
  CompanyAdminRoutes: [
    { path: "/companyAdmin", element: <AdminDashboard /> },
    { path: "/companyAdmin/dashboard", element: <AdminDashboard /> },
    { path: "/companyAdmin/userList", element: <UserList /> },
    { path: "/companyAdmin/add-new-user", element: <AddUser /> },
   
  ],
};
