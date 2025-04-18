import AdminDashboard from "./Components/admin/adminDashboard"
import UserList from "./Components/companyAdmin/UserList"
import CompanyAdminDashboard from "./Components/companyAdmin/CompanyAdminDashboard"
import AddUser from "./Components/companyAdmin/AddUser"
import RegisterEnquiry from "./Components/public/RegisterEnquiry"
import EnquiryList from "./Components/admin/EnquiryList"
import HomePage from "./Components/public/Home"
import Contact from "./Components/public/Contact"
import CompanyList from "./Components/admin/CompanyList"
import AddCompany from "./Components/admin/AddCompany"
import About from "./Components/public/About"
import Login from "./Components/public/Login"
import ProfilePage from "./Components/shared/ProfileCard"
import LeadList from "./Components/salesExecutive/LeadList"
import SalesExecutiveDashboard from  "./Components/salesExecutive/ExecutiveDashboard"
import AddLead from "./Components/salesExecutive/AddLead"
import TimeSheet from "./Components/salesExecutive/TimeSheet"
import LeadSource from "./Components/salesExecutive/RegisterLeadSource"
import LeadSourceList from "./Components/salesExecutive/LeadSourceList"
import TestimonialsComponent from "./Components/public/TestimonialsComponent "
import TimeSheetList from "./Components/salesExecutive/TimeSheetList"
import ForgetPassword from "./Components/public/ForgetPassword"
import ResetPassword from "./Components/public/ResetPassword"
import ViewTimeSheet from "./Components/companyAdmin/ViewTimeSheet"
import GetProcessSteps from "./Components/companyAdmin/GetAdminProcessSteps"
import AdminProcessStep from "./Components/companyAdmin/AdminProcessStep"
import GetAdminProcessSteps from "../src/Components/companyAdmin/GetAdminProcessSteps"
import LeadCategory from "./Components/companyAdmin/LeadCategory"
import LeadCategoryList from "./Components/companyAdmin/LeadCategoryList"
import AddSalesCompany from "./Components/salesExecutive/AddSalesCompany"
import LeadCompanieList from "./Components/salesExecutive/LeadCompanieList"
import { addFollowUpdate } from "./Services/LeadService"
import BulkInsert from "./Components/salesExecutive/bulkExample"
import LeadListCompany from "./Components/companyAdmin/LeadListCompany"
import ChangePassword from "./Components/shared/ChangePassword"
import AddMultipleLeads from "./Components/salesExecutive/AddMutipleLeads"
import AddTimeSheetStep from "./Components/companyAdmin/AddTimeSheetStep"
import CompanyTimeSheetStepList from "./Components/companyAdmin/CompanyTimeSheetStepList"
import LeadRegistration from "./Components/salesExecutive/LeadBulkRegistration"
import ExcelToGrid from "./Components/salesExecutive/LeadBulkRegistration"
import Projects from "./Components/companyAdmin/Projects"
import ProjectList from "./Components/companyAdmin/ProjectList"
import BasicModal from "./Components/salesExecutive/AddfollowUpdate"
import FollowUpHistory from "./Components/salesExecutive/FollowUpHistory"

export const routerConfiguration = {
  PublicRoutes: [
    { path: "/", element: <HomePage /> },
    { path: "home", element: <HomePage /> },
    { path: "about", element: < About/> },
    { path: "contact", element: <Contact /> },
    { path: "enquiry", element: <RegisterEnquiry/> },
    { path: "login", element: < Login/> },
    { path: "testimonial", element:<TestimonialsComponent/>},
    { path: "forgetPassword",element :<ForgetPassword/>},
    { path: "reset-Password",element:<ResetPassword/>},
    

  ],
  AdminRoutes: [
    { path: "/admin", element: <AdminDashboard /> },
    { path: "/admin/dashboard", element: <AdminDashboard /> },
    { path: "/admin/enquirylist", element: <EnquiryList /> },
    { path: "/admin/add-new-company", element: < AddCompany/> },
    { path: "/admin/profile", element: < ProfilePage/> },
    { path: "/admin/companylist", element: <CompanyList /> },
    { path: "/admin/changePassword",element:<ChangePassword/>} 


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
    { path: "/companyAdmin/leadCategoryList",element:<LeadCategoryList/>},
    { path: "/companyAdmin/leadListCompany",element:<LeadListCompany/>},
    { path: "/companyAdmin/changePassword",element:<ChangePassword/>},
    { path: "/companyAdmin/addTimeSheetStep",element:<AddTimeSheetStep/>},
    { path: "/companyAdmin/companyTimeSheetStepList",element:<CompanyTimeSheetStepList/>},
    { path :"/companyAdmin/addProject", element:<Projects/>},
    { path : "/companyAdmin/projectList", element:<ProjectList />}
  ],

  SalesExecutiveRoutes:[
    { path : "/salesExecutive",element:<SalesExecutiveDashboard/>},
    { path : "/salesExecutive/dashboard",element:<SalesExecutiveDashboard/>},
    { path : "/salesExecutive/leadList", element: <LeadList /> },
    { path : "/salesExecutive/leadLists", element: <LeadList /> },
    { path : "/salesExecutive/add-new-lead", element: <AddLead /> },
    { path : "/salesExecutive/addTask",element:<TimeSheet/>},
    { path : "/salesExecutive/profile", element: <ProfilePage/> },
    { path : "/salesExecutive/registerLeadSource", element:<LeadSource/>},
    { path : "/salesExecutive/leadSourceList", element: <LeadSourceList/> },
    { path : "/salesExecutive/taskList",element :<TimeSheetList/>},
    { path : "/salesExecutive/addLeadCompany",element :<AddSalesCompany/>},
    { path : "/salesExecutive/leadCompanyList",element :<LeadCompanieList/>}, 
    { path : "/salesExecutive/bulkInsert",element :<BulkInsert/>},
    { path : "/salesExecutive/changePassword",element:<ChangePassword/>},
    { path : "/salesExecutive/addBulkLeads",element:<AddMultipleLeads/>},
    // { path : "/salesExecutive/ExcelToGrid", element:<ExcelToGrid/>},
    { path : "/salesExecutive/followUphistory/:leadId", element:<FollowUpHistory/>},
   

    // { path:"/salesExecutive/followUpHistory", element:<LeadList />} 
  ]
  ,
  SalesManagerRoutes:[
    { path : "/salesManager",element:<SalesExecutiveDashboard/>},
    { path : "/salesManager/dashboard",element:<SalesExecutiveDashboard/>},
    { path : "/salesManager/leadList", element: <LeadList /> },
    { path : "/salesManager/add-new-lead", element: <AddLead /> },
    { path : "/salesManager/timeSheet",element:<TimeSheet/>},
    { path:  "/salesManager/profile", element: <ProfilePage/>},
    { path : "/salesManager/leadCompanyList",element :<LeadCompanieList/>}, 
    { path : "/salesManager/registerLeadSource", element:<LeadSource/>},
    { path : "/salesManager/addLeadCompany",element :<AddSalesCompany/>},
    { path : "/salesManager/addTask",element:<TimeSheet/>},
    { path : "/salesManager/leadSourceList", element: <LeadSourceList/> },
    { path : "/salesManager/taskList",element :<TimeSheetList/>},
    { path: "/salesManager/changePassword",element:<ChangePassword/>},
    { path : "/salesManager/ExcelToGrid", element:<ExcelToGrid/>},
    { path : "/salesManager/bulkInsert",element :<BulkInsert/>},
    { path : "/salesManager/followUphistory/:leadId", element:<FollowUpHistory/>},
    { path : "/salesManager/leadList/followUphistory/:leadId", element:<FollowUpHistory/>},
    // { path:"/salesManager/followUpHistory", element:<LeadList />},
  ]
}
