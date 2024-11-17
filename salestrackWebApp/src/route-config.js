
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
import TimeSheet from "./components/salesExecutive/TimeSheet"
import LeadSource from "./components/salesExecutive/RegisterLeadSource"
import LeadSourceList from "./components/salesExecutive/LeadSourceList"
import TestimonialsComponent from "./components/public/TestimonialsComponent "
import TimeSheetList from "./components/salesExecutive/TimeSheetList"
import ForgetPassword from "./components/public/ForgetPassword"
import ResetPassword from "./components/public/ResetPassword"
import ViewTimeSheet from "./components/companyAdmin/ViewTimeSheet"
import GetProcessSteps from "./components/companyAdmin/GetAdminProcessSteps"
import AdminProcessStep from "./components/companyAdmin/AdminProcessStep"
import GetAdminProcessSteps from "./components/companyAdmin/GetAdminProcessSteps"
import LeadCategory from "./components/companyAdmin/LeadCategory"
import LeadCategoryList from "./components/companyAdmin/LeadCategoryList"
import AddSalesCompany from "./components/salesExecutive/AddSalesCompany"
import LeadCompanieList from "./components/salesExecutive/LeadCompanieList"
export const routerConfiguration = {
  PublicRoutes: [
    { path: "/", element: <HomePage /> },
    { path: "home", element: <HomePage /> },
    { path: "about", element: < About/> },
    { path: "contact", element: <Contact /> },
    { path: "enquiry", element: <RegisterEnquiry /> },
    { path: "login", element: < Login/> },
    { path: "testimonial", element:<TestimonialsComponent/>},
    { path: "forgetPassword",element :<ForgetPassword/>},
    {path:  "reset-Password",element:<ResetPassword/>}

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
    { path: "/companyAdmin/getAllProcess-steps", element: <GetProcessSteps /> },
    { path: "/companyAdmin/view-time-sheet",element:<ViewTimeSheet/>},
    { path: "/companyAdmin/getProcessSteps" ,element:<GetAdminProcessSteps/>},
    { path: "/companyAdmin/addProcessStep", element: <AdminProcessStep /> },
    { path: "/companyAdmin/add-lead-category",element:<LeadCategory/>},
    { path: "/companyAdmin/leadCategoryList",element:<LeadCategoryList/>}


  ],

  SalesExecutiveRoutes:[
    { path:"/salesExecutive",element:<SalesExecutiveDashboard/>},
    { path:"/salesExecutive/dashboard",element:<SalesExecutiveDashboard/>},
    { path: "/salesExecutive/leadList", element: <LeadList /> },
    { path: "/salesExecutive/add-new-lead", element: <AddLead /> },
    { path :"/salesExecutive/timeSheet",element:<TimeSheet/>},
    { path: "/salesExecutive/profile", element: <ProfilePage/> },
    { path : "/salesExecutive/registerLeadSource", element:<LeadSource/>},
    { path : "/salesExecutive/leadSourceList", element: <LeadSourceList/> },
    { path : "/salesExecutive/timeSheetList",element :<TimeSheetList/>},
    { path : "/salesExecutive/addLeadCompany",element :<AddSalesCompany/>},
    { path : "/salesExecutive/leadCompanyList",element :<LeadCompanieList/>},  
  ]
}
