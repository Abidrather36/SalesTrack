
import AdminDashboard from "./components/admin/adminDashboard"
import UserList from "./components/companyAdmin/UserList"
import CompanyAdminDashboard from "./components/companyAdmin/CompanyAdminDashboard" 
import AddUser from "./components/companyAdmin/AddUser" 
import RegisterEnquiry from "./components/public/RegisterEnquiry"
import EnquiryList from "./components/admin/EnquiryList"
import HomePage from "./components/public/Home"
import Contact from "./components/public/Contact"
import CompanyList from "./components/admin/CompanyList"
import AddCompany from "./components/admin/AddCompany"
import About from "./components/public/About" 
import Login from "./components/public/Login"
import ProfilePage from "./components/shared/ProfileCard"
import LeadList from "./components/salesExecutive/LeadList"
import SalesExecutiveDashboard from  "./components/salesExecutive/ExecutiveDashboard"
import AddLead from "./components/salesExecutive/AddLead"
import AdminProcessStep from "./components/admin/AdminProcessStep"
import GetProcessSteps from "./components/admin/GetProcessSteps"
import DateTimePickers from "./components/salesExecutive/TodaysFollowUpdate"
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
    { path: "/admin/addProcessStep", element: < AdminProcessStep/> },
    { path: "/admin/getProcessSteps", element:<GetProcessSteps/> }


  ],
  CompanyAdminRoutes: [
    { path: "/companyAdmin", element: <CompanyAdminDashboard /> },
    { path: "/companyAdmin/dashboard", element: <CompanyAdminDashboard /> },
    { path: "/companyAdmin/userList", element: <UserList /> },
    { path: "/companyAdmin/add-new-user", element: <AddUser /> },
    { path: "/companyAdmin/profile", element: <ProfilePage/> },
    { path: "/companyAdmin/getAllProcess-steps", element: <GetProcessSteps /> },

  ],

  SalesExecutiveRoutes:[
    {path:"/salesExecutive",element:<SalesExecutiveDashboard/>},
    {path:"/salesExecutive/dashboard",element:<SalesExecutiveDashboard/>},
    { path: "/salesExecutive/leadList", element: <LeadList /> },
    { path: "/salesExecutive/add-new-lead", element: <AddLead /> },

  ]
}
