<<<<<<< HEAD
import HomePage from "./components/public/Home"
import About from "./components/public/About";
import Contact from "./components/public/Contact";
import RegisterEnquiry from "./components/public/RegisterEnquiry"
import Login from "./components/public/Login"
import AdminDashboard from './components/admin/adminDashboard'
import EnquiryList from './components/admin/EnquiryList'
import AddUserForm from './components/admin/AddUser'
import ProfilePage from './components/shared/ProfileCard'

=======
import HomePage from "./Components/public/Home";
import About from "./Components/public/About";
import Contact from "./Components/public/Contact";
import Login from "./Components/public/Login";
import RegisterEnquiry from "./Components/public/RegisterEnquiry";
import AddUserForm from "./Components/admin/AddUser";
import AdminDashboard from "./Components/admin/adminDashboard";
import EnquiryList from "./Components/admin/EnquiryList";
import ProfilePage from "./Components/shared/ProfileCard";
import UserList from "./Components/admin/UserList";
>>>>>>> origin/aamir
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
    { path: "/admin/users", element: <UserList /> },
  ],
};
