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
  }
  ,
  {
    id:6,
    label:"Lead Category List",
    link:"/companyAdmin/leadCategoryList",
    icon: <FaListAlt />,
  },
  {
    id:7,
    label:"LeadList",
    link:"/companyAdmin/leadLists",
    icon:<FaListAlt/>
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
    id:7,
    label:"Add Lead Company",
    link:"/salesExecutive/addLeadCompany",
    icon:<FaPlus />
  },
  {
    id: 8,
    label: "Lead Company List",
    link: "/salesExecutive/leadCompanyList",
    icon: <FaUsers />,
  },
  {
    id: 3,
    label: "Add New Lead",
    link: "/salesExecutive/add-new-lead",
    icon: <FaPlus />,
  },
  {
    id: 2,
    label: "Leads List",
    link: "/salesExecutive/leadList",
    icon: <FaUsers />,
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
export const SalesManagersidebarLabels = [
  {
    id: 1,
    label: "Dashboard",
    link: "/salesManager/dashboard",
    icon: <FaTachometerAlt />,
  },
  {
    id: 7,
    label: "Add Lead Company",
    link: "/salesManager/addLeadCompany",
    icon: <FaPlus />,
  },
  {
    id: 8,
    label: "Lead Company List",
    link: "/salesManager/leadCompanyList",
    icon: <FaUsers />,
  },
  {
    id: 3,
    label: "Add New Lead",
    link: "/salesManager/add-new-lead",
    icon: <FaPlus />,
  },
  {
    id: 2,
    label: "Leads List",
    link: "/salesManager/leadList",
    icon: <FaUsers />,
  },
  {
    id: 4,
    label: "Add Time Sheet",
    link: "/salesManager/timeSheet",
    icon: <FaPlus />,
  },
  {
    id: 5,
    label: "Register Lead Source",
    link: "/salesManager/registerLeadSource",
    icon: <FaPlus />,
  },
  {
    id: 6,
    label: "Lead Source List",
    link: "/salesManager/leadSourceList",
    icon: <Source />,
  },
  {
    id: 7,
    label: "Time Sheet List",
    link: "/salesManager/timeSheetList",
    icon: <EventNoteIcon />,
  },
];


// import {
//   FaTachometerAlt,
//   FaEnvelope,
//   FaPlus,
//   FaListAlt,
//   FaUsers,
// } from "react-icons/fa";
// import { Source } from "@mui/icons-material";
// import EventNoteIcon from '@mui/icons-material/EventNote';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye } from '@fortawesome/free-solid-svg-icons';
// export const PortalAdminsidebarLabels = [
//   {
//     id: 1,
//     label: "Dashboard",
//     link: "/admin/dashboard",
//     icon: <FaTachometerAlt />,
//   },
//   {
//     id: 2,
//     label: "Enquiries",
//     link: "/admin/enquirylist",
//     icon: <FaEnvelope />,
//   },
//   {
//     id: 3,
//     label: "Company Management",
//     icon: <FaListAlt />,
//     dropdown: true,
//     items: [
//       {
//         id: 1,
//         label: "Add Company",
//         link: "/admin/add-new-company",
//         icon: <FaPlus />,
//       },
//       {
//         id: 2,
//         label: "Company List",
//         link: "/admin/companylist",
//         icon: <FaListAlt />,
//       },
//     ],
//   },
// ];

// export const CompanyAdminsidebarLabels = [
//   {
//     id: 1,
//     label: "Dashboard",
//     link: "/companyAdmin/dashboard",
//     icon: <FaTachometerAlt />,
//   },
//   {
//     id: 2,
//     label: "Users Management",
//     icon: <FaUsers />,
//     dropdown: true,
//     items: [
//       {
//         id: 3,
//         label: "Users List",
//         link: "/companyAdmin/userList",
//         icon: <FaUsers />,
//       },
//       {
//         id: 4,
//         label: "Add New User",
//         link: "/companyAdmin/add-new-user",
//         icon: <FaPlus />,
//       },
//     ],
//   },
//   {
//     id: 5,
//     label: "Process Management",
//     icon: <FaListAlt />,
//     dropdown: true,
//     items: [
//       {
//         id: 5,
//         label: "Add Process Step",
//         link: "/companyAdmin/addProcessStep",
//         icon: <FaPlus />,
//       },
//       {
//         id: 6,
//         label: "Process Step List",
//         link: "/companyAdmin/getProcessSteps",
//         icon: <FaListAlt />,
//       },
//     ],
//   },
//   {
//     id: 7,
//     label: "Time Management",
//     icon: <FontAwesomeIcon icon={faEye} />,
//     dropdown: true,
//     items: [
//       {
//         id: 7,
//         label: "Time Sheet",
//         link: "/companyAdmin/view-time-sheet",
//         icon: <FontAwesomeIcon icon={faEye} />,
//       },
//       {
//         id: 8,
//         label: "Time Sheet List",
//         link: "/companyAdmin/timeSheetList",
//         icon: <EventNoteIcon />,
//       },
//     ],
//   },
// ];

// export const SalesExectivesidebarLabels = [
//   {
//     id: 1,
//     label: "Dashboard",
//     link: "/salesExecutive/dashboard",
//     icon: <FaTachometerAlt />,
//   },
//   {
//     id: 2,
//     label: "Lead Management",
//     icon: <FaUsers />,
//     dropdown: true,
//     items: [
//       {
//         id: 2,
//         label: "Add Lead Company",
//         link: "/salesExecutive/addLeadCompany",
//         icon: <FaPlus />,
//       },
//       {
//         id: 3,
//         label: "Lead Company List",
//         link: "/salesExecutive/leadCompanyList",
//         icon: <FaUsers />,
//       },
//       {
//         id: 4,
//         label: "Add New Lead",
//         link: "/salesExecutive/add-new-lead",
//         icon: <FaPlus />,
//       },
//       {
//         id: 5,
//         label: "Leads List",
//         link: "/salesExecutive/leadList",
//         icon: <FaUsers />,
//       },
//     ],
//   },
//   {
//     id: 6,
//     label: "Time Sheet",
//     icon: <FaPlus />,
//     dropdown: true,
//     items: [
//       {
//         id: 7,
//         label: "Add Time Sheet",
//         link: "/salesExecutive/timeSheet",
//         icon: <FaPlus />,
//       },
//       {
//         id: 8,
//         label: "Time Sheet List",
//         link: "/salesExecutive/timeSheetList",
//         icon: <EventNoteIcon />,
//       },
//     ],
//   },
// ];

// export const SalesManagersidebarLabels = [
//   {
//     id: 1,
//     label: "Dashboard",
//     link: "/salesManager/dashboard",
//     icon: <FaTachometerAlt />,
//   },
//   {
//     id: 2,
//     label: "Lead Management",
//     icon: <FaUsers />,
//     dropdown: true,
//     items: [
//       {
//         id: 7,
//         label: "Add Lead Company",
//         link: "/salesManager/addLeadCompany",
//         icon: <FaPlus />,
//       },
//       {
//         id: 8,
//         label: "Lead Company List",
//         link: "/salesManager/leadCompanyList",
//         icon: <FaUsers />,
//       },
//       {
//         id: 9,
//         label: "Add New Lead",
//         link: "/salesManager/add-new-lead",
//         icon: <FaPlus />,
//       },
//       {
//         id: 10,
//         label: "Leads List",
//         link: "/salesManager/leadList",
//         icon: <FaUsers />,
//       },
//     ],
//   },
//   {
//     id: 11,
//     label: "Time Sheet",
//     icon: <FaPlus />,
//     dropdown: true,
//     items: [
//       {
//         id: 12,
//         label: "Add Time Sheet",
//         link: "/salesManager/timeSheet",
//         icon: <FaPlus />,
//       },
//       {
//         id: 13,
//         label: "Time Sheet List",
//         link: "/salesManager/timeSheetList",
//         icon: <EventNoteIcon />,
//       },
//     ],
//   },
// ];