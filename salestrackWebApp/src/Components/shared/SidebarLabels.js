import {
  FaTachometerAlt,
  FaEnvelope,
  FaPlus,
  FaListAlt,
  FaUsers,
} from "react-icons/fa";
import { Source } from "@mui/icons-material";
import EventNoteIcon from '@mui/icons-material/EventNote';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
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
  {
    id: 5,
    label: "Add Process Step",
    link: "/companyAdmin/addProcessStep",
    icon: <FaUsers />,
  },
  {
    id: 6,
    label: "Process Step List",
    link: "/companyAdmin/getProcessSteps",
    icon: <FaListAlt />,
  },
  {
    id:4,
    label:"Time Sheet",
    link:"/companyAdmin/view-time-sheet",
    icon: <FontAwesomeIcon icon={faEye} />
  },
  {
    id:5,
    label:"Add Lead Category",
    link:"/companyAdmin/add-lead-category",
    icon:<FaPlus />,
  },{
    id:6,
    label:"Lead Category List",
    link:"/companyAdmin/leadCategoryList",
    icon: <FaListAlt />,
  }
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
    label: "Add Time Sheet",
    link: "/salesExecutive/timeSheet",
    icon: <FaPlus />,
  },
  {
    id:5,
    label:"Register Lead Source",
    link: "/salesExecutive/registerLeadSource",
    icon:  <FaPlus />
  },
  { 
    id:6,
    label:"Lead Source List",
    link:"/salesExecutive/leadSourceList",
    icon:<Source />,

  },
  {
    id:7,
    label:"Time Sheet List",
    link:"/salesExecutive/timeSheetList",
    icon:<EventNoteIcon/>
  }
];
