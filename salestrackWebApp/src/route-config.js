
import AdminDashboard from "./components/admin/adminDashboard"
import UserList from "./components/companyAdmin/UserList"
import CompanyAdminDashboard from "./components/companyAdmin/CompanyAdminDashboard" 
import AddUser from "./components/companyAdmin/AddUser" 
import RegisterEnquiry from "./components/public/RegisterEnquiry"
import EnquiryList from "./components/admin/EnquiryList"
import HomePage from "./components/public/Home"
import Contact from "./components/public/Contact"
import { addCompany } from "./Services/CompanyService"
import CompanyList from "./components/admin/CompanyList"
import AddCompany from "./components/admin/AddCompany"
import About from "./components/public/About" 
import Login from "./components/public/Login"
import ProfilePage from "./components/shared/ProfileCard"
export const routerConfiguration = {
  PublicRoutes: [
    { path: "/", element: <HomePage /> },
    { path: "home", element: <HomePage /> },
    { path: "about", element: < About/> },
    { path: "contact", element: <Contact /> },
    { path: "enquiry", element: <RegisterEnquiry /> },
    { path: "login", element: < Login/> },
  ],
  AdminRoutes: [
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/enquirylist", element: <EnquiryList /> },
    { path: "/admin/add-new-company", element: < AddCompany/> },
    { path: "/admin/profile", element: < ProfilePage/> },
    { path: "/admin/companylist", element: <CompanyList /> },

  ],
  CompanyAdminRoutes: [
    { path: "/companyAdmin", element: <CompanyAdminDashboard /> },
    { path: "/companyAdmin/dashboard", element: <CompanyAdminDashboard /> },
    { path: "/companyAdmin/userList", element: <UserList /> },
    { path: "/companyAdmin/add-new-user", element: <AddUser /> },
    { path: "/companyAdmin/profile", element: <ProfilePage/> },

   
  ],
}
