
import HomePage from "./Components/public/Home"
import About from "./Components/public/About"
import Contact from "./Components/public/Contact"
import RegisterEnquiry from "./Components/public/RegisterEnquiry"
import Login from "./Components/public/Login"
import AdminDashboard from "./Components/admin/adminDashboard"
import EnquiryList from "./Components/admin/EnquiryList"
import AddCompany from "./Components/admin/AddCompany"
import ProfilePage from "./Components/shared/ProfileCard"
import UserList from "./Components/companyAdmin/UserList"
import CompanyAdminDashboard from "./Components/companyAdmin/CompanyAdminDashboard"
import AddUser from "./Components/companyAdmin/AddUser"
import CompanyList from "./Components/admin/CompanyList"



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
    { path: "/admin/add-new-company", element: <AddCompany /> },
    { path: "/admin/profile", element: <ProfilePage /> },
    { path: "/admin/companylist", element: <CompanyList /> },

  ],
  CompanyAdminRoutes: [
    { path: "/companyAdmin", element: <CompanyAdminDashboard /> },
    { path: "/companyAdmin/dashboard", element: <CompanyAdminDashboard /> },
    { path: "/companyAdmin/userList", element: <UserList /> },
    { path: "/companyAdmin/add-new-user", element: <AddUser /> },
    { path: "/companyAdmin/profile", element: <ProfilePage /> },

   
  ],
}
