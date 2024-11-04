import {
  FaTachometerAlt,
  FaEnvelope,
  FaPlus,
  FaListAlt,
  FaUsers,
  FaClipboardList,
  FaStream ,
  FaClock,
  FaBullhorn, 
  FaSafari,
} from "react-icons/fa";
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Source } from "@mui/icons-material";
import {CalendarTodayIcon } from '@mui/icons-material/CalendarToday';
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
  {
    id:4,
    label:"Time Sheet",
    link:"/companyAdmin/view-time-sheet",
    icon: <FontAwesomeIcon icon={faEye} />
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
    icon: <FaBullhorn />
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
