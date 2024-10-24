import {
  FaTachometerAlt,
  FaEnvelope,
  FaPlus,
  FaListAlt,
  FaUsers,
  FaClipboardList,
  FaStream ,
  FaClock,
  FaBullhorn 
} from "react-icons/fa";
import { Source } from "@mui/icons-material";
export const PortalAdminsidebarLabels = [
  {
    id: 1,
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    id: 2,
    label: "Enquiries",
    link: "/admin/enquirylist",
    icon: <FaEnvelope />,
  },
  {
    id: 1,
    label: "Add Company",
    link: "/admin/add-new-company",
    icon: <FaPlus />,
  },
  {
    id: 2,
    label: "Company List",
    link: "/admin/companylist",
    icon: <FaListAlt />,
  },
  {
    id: 5,
    label: "Add Process Step",
    link: "/admin/addProcessStep",
    icon: <FaUsers />,
  },
  {
    id: 6,
    label: "Process Step List",
    link: "/admin/getProcessSteps",
    icon: <FaListAlt />,
  },
];
export const CompanyAdminsidebarLabels = [
  {
    id: 1,
    label: "Dashboard",
    link: "/companyAdmin/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    id: 2,
    label: "Users List",
    link: "/companyAdmin/userList",
    icon: <FaUsers />,
  },
  {
    id: 3,
    label: "Add New User",
    link: "/companyAdmin/add-new-user",
    icon: <FaPlus />,
  },
];

export const SalesExectivesidebarLabels = [
  {
    id: 1,
    label: "Dashboard",
    link: "/salesExecutive/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    id: 2,
    label: "Leads List",
    link: "/salesExecutive/leadList",
    icon: <FaUsers />,
  },
  {
    id: 3,
    label: "Add New Lead",
    link: "/salesExecutive/add-new-lead",
    icon: <FaPlus />,
  },
  {
    id: 4,
    label: "Time Sheet",
    link: "/salesExecutive/timeSheet",
    icon: <FaClock />,
  },
  {
    id:5,
    label:"Register Lead Source",
    link: "/salesExecutive/registerLeadSource",
    icon: <FaBullhorn />
  },
  { 
    id:6,
    label:"Lead Source List",
    link:"/salesExecutive/leadSourceList",
    icon:<Source />,

  }
];
